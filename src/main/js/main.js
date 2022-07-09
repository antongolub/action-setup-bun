const core = require('@actions/core')
const exec = require('@actions/exec')
const { HttpClient } = require('@actions/http-client')
const path = require('path')
const semver = require('semver')

const http = new HttpClient('@actions/http-client')
const installSh = path.resolve(__dirname, '../../main/sh/install.sh')
const setup = async (range) => {
  const args = [installSh]
  const version = await resolveVersion(range)

  if (version) args.push(version)

  const {stdout} = await exec.getExecOutput('bash', args)

  return /.*BUN_INSTALL="([^"]+)"/.exec(stdout.trim())[1]
}

const resolveVersion = async (reqVersion) => {
  if (!reqVersion) return null

  const tags = (await http.getJson('https://api.github.com/repos/Jarred-Sumner/bun-releases-for-updater/tags')).result
  const version = tags.find(({name}) => semver.satisfies(name.replace('bun-', ''), reqVersion))

  if (!version) throw new Error(`Version ${reqVersion} not found`)

  return version.name
}

async function main() {
  try {
    const version = core.getInput('version') || core.getInput('bun-version')
    const BUN_INSTALL = await setup(version)

    core.addPath(path.join(BUN_INSTALL, 'bin'))
    core.setOutput('version', version)
    core.info(`Bun version ${version} installed`)
  } catch (e) {
    core.setOutput('error_message', e.message)
    core.setFailed(e.message)
  }
}

main()
