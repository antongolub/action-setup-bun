const core = require('@actions/core')
const path = require('path')
const { install, pickVersion } = require('./install.js')

const defaultVersion = '*'
const defaultRepo = 'Jarred-Sumner/bun-releases-for-updater'

async function main() {
  try {
    const range = core.getInput('bun-version') || core.getInput('version') || defaultVersion
    const repo = core.getInput('bun-repo') || defaultRepo
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
