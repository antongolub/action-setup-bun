import path from 'path'
import semver from 'semver'
import url, {fileURLToPath} from 'url'
import core from '@actions/core'
import exec from '@actions/exec'
import tc from '@actions/tool-cache'
import { HttpClient }  from '@actions/http-client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const http = new HttpClient('@actions/http-client')
const installSh =     path.resolve(__dirname, '../../main/sh/install.sh')
const getPlatformSh = path.resolve(__dirname, '../../main/sh/get-platform.sh')

export function getBunUri(repo: string, version: string, platform: string) {
  return `https://github.com/${repo}/releases/download/${version}/bun-${platform}.zip`
}

export async function getPlatform() {
  const {stdout} = await exec.getExecOutput('bash', [getPlatformSh])
  return stdout.trim()
}

export async function install(repo: string, version: string, platform: string) {
  if (!repo) throw new Error('Source repo is required')
  if (!version) throw new Error('Bun version is required')
  if (!platform) throw new Error('Target platform is required')

  const bunSource = await getBunSource(repo, version, platform)

  return _install(platform, url.pathToFileURL(bunSource).toString())
}

export async function _install(platform: string, bunUri: string) {
  const {stdout} = await exec.getExecOutput('bash', [installSh, platform, bunUri])

  return (/.*BUN_INSTALL="([^"]+)"/.exec(stdout.trim()) || [])[1] || process.env['BUN_INSTALL'] + ''
}

export async function pickVersion(repo: string, range: string) {
  type Tag = {name: string}
  const url = `https://api.github.com/repos/${repo}/tags?per_page=1000&page=1`
  const tags = (await http.getJson(url)).result as Tag[]
  const version = tags.find(({name}) => semver.satisfies(name.replace('bun-', ''), range))

  if (!version) throw new Error(`Version ${range} not found in ${repo}`)

  return version.name
}

export async function getBunSource(repo: string, version: string, platform: string) {
  const _version = version.replace('bun-', '')
  const file = `bun-${version}-${platform}.zip`
  const cachedBunPath = tc.find('bun', _version, platform)
  if (cachedBunPath) {
    core.info(`bun ${_version} ${platform} found in cache`)
    return path.join(cachedBunPath, file)
  }

  const bunUri = getBunUri(repo, version, platform)
  core.info(`Downloading bun from ${bunUri}`)
  const bunPath = await tc.downloadTool(bunUri)

  await tc.cacheFile(bunPath, file, 'bun', _version, platform)
  core.info(`bun bin cached as ${tc.find('bun', _version, platform)}`)

  return bunPath
}
