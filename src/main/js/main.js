const core = require('@actions/core')
const path = require('path')
const { install, pickVersion, getPlatform } = require('./install.js')
const { restoreCache } = require('./cache.js')
const {INSTALL_PATH, CACHE_PATH} = require('./constants.js')
const { getConfig } = require('./config.js')

const defaultVersion = '*'
const defaultRepo = 'Jarred-Sumner/bun-releases-for-updater'

async function main() {
  try {
    const range =           core.getInput('bun-version') || core.getInput('version') || defaultVersion
    const repo =            core.getInput('bun-repo') || defaultRepo
    const platform =        core.getInput('platform') || await getPlatform()
    const cache =           core.getInput('cache')
    const config =          getConfig(core.getInput('config'))
    const version =         await pickVersion(repo, range)
    const bunInstallPath =  await install(repo, version, platform)
    const bunBinPath =      path.join(bunInstallPath, 'bin')
    const bunCachePath =    path.resolve(config?.install?.cache?.dir || path.join(bunInstallPath, 'install/cache'))

    core.saveState(INSTALL_PATH, bunInstallPath)
    core.saveState(CACHE_PATH, bunCachePath)

    cache && await restoreCache(bunCachePath, platform)

    core.exportVariable('BUN_INSTALL', bunInstallPath)
    core.addPath(bunBinPath)
    core.setOutput('bun-version', version)
    core.info(`Bun version ${version} installed from ${repo}`)

  } catch (e) {
    core.setOutput('error_message', e.message)
    core.setFailed(e.message)
  }
}

main()

