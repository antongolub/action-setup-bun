const core = require('@actions/core')
const exec = require('@actions/exec')
const { HttpClient } = require('@actions/http-client')
const path = require('path')
const semver = require('semver')
const http = new HttpClient('@actions/http-client')

const defaultVersion = '*'
const defaultRepo = 'Jarred-Sumner/bun-releases-for-updater'
const installSh = path.resolve(__dirname, '../../main/sh/install.sh')

const install = async (version, repo) => {
  const {stdout} = await exec.getExecOutput('bash', [installSh, repo, version])

  return /.*BUN_INSTALL="([^"]+)"/.exec(stdout.trim())[1]
}

const pickVersion = async (range, repo) => {
  const url = `https://api.github.com/repos/${repo}/tags`
  const tags = (await http.getJson(url)).result
  const version = tags.find(({name}) => semver.satisfies(name.replace('bun-', ''), range))

  if (!version) throw new Error(`Version ${range} not found`)

  return version.name
}

async function main() {
  try {
    const range = core.getInput('version') || core.getInput('bun-version') || defaultVersion
    const repo = core.getInput('repo') || defaultRepo
    const version = await pickVersion(range, repo)
    const BUN_INSTALL = await install(version, repo)

    core.addPath(path.join(BUN_INSTALL, 'bin'))
    core.setOutput('version', version)
    core.info(`Bun version ${version} installed from ${repo}`)

  } catch (e) {
    core.setOutput('error_message', e.message)
    core.setFailed(e.message)
  }
}

main()
