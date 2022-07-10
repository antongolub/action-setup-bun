const exec =          require('@actions/exec')
const { HttpClient } = require('@actions/http-client')
const path =          require('path')
const semver =        require('semver')
const url =           require('url')
const tc =            require('@actions/tool-cache')
const core =          require('@actions/core')
const http =          new HttpClient('@actions/http-client')
const installSh =     path.resolve(__dirname, '../../main/sh/install.sh')
const getPlatformSh = path.resolve(__dirname, '../../main/sh/get-platform.sh')

function getBunUri(repo, version, platform) {
  return `https://github.com/${repo}/releases/download/${version}/bun-${platform}.zip`
}

async function getPlatform() {
  const {stdout} = await exec.getExecOutput('bash', [getPlatformSh])
  return stdout.trim()
}

async function install(repo, version, platform) {
  if (!repo) throw new Error('Source repo is required')
  if (!version) throw new Error('Bun version is required')
  if (!platform) throw new Error('Target platform is required')

  const bunSource = await getBunSource(repo, version, platform)

  return _install(platform, url.pathToFileURL(bunSource))
}

async function _install(platform, bunUri) {
  const {stdout} = await exec.getExecOutput('bash', [installSh, platform, bunUri])

  return /.*BUN_INSTALL="([^"]+)"/.exec(stdout.trim())[1]
}

async function pickVersion(repo, range) {
  const url = `https://api.github.com/repos/${repo}/tags?per_page=1000&page=1`
  const tags = (await http.getJson(url)).result
  const version = tags.find(({name}) => semver.satisfies(name.replace('bun-', ''), range))

  if (!version) throw new Error(`Version ${range} not found in ${repo}`)

  return version.name
}

async function getBunSource(repo, version, platform) {
  const _version = version.replace('bun-', '')
  const cachedBunPath = tc.find('bun', _version, platform)
  if (cachedBunPath) {
    core.info(`bun ${_version} ${platform} found in cache'`)
    return cachedBunPath
  }

  const bunUri = getBunUri(repo, version, platform)
  core.info(`Downloading bun from ${bunUri}`)
  const bunPath = await tc.downloadTool(bunUri)

  await tc.cacheFile(bunPath, `bun-${version}-${platform}`, 'bun', _version, platform)
  core.info(`bun bin cached as ${tc.find('bun', _version, platform)}`)

  return bunPath
}

module.exports = {
  install,
  pickVersion,
  getBunUri,
  getPlatform,
}
