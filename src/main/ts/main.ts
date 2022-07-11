import * as core from '@actions/core'
import path from 'path'
import { install, pickVersion, getPlatform } from './install.js'
import { restoreCache } from './cache.js'
import { keys, DEFAULT_REPO, DEFAULT_VERSION } from './constants.js'
import { getConfig } from './config.js'

async function main() {
  try {
    const range =           core.getInput('bun-version') || core.getInput('version') || DEFAULT_VERSION
    const repo =            core.getInput('bun-repo') || DEFAULT_REPO
    const platform =        core.getInput('platform') || await getPlatform()
    const cache =           core.getInput('cache')
    const config =          getConfig(core.getInput('bun-config') || core.getInput('config'))
    const version =         await pickVersion(repo, range)
    const bunInstallPath =  await install(repo, version, platform)
    const bunBinPath =      path.join(bunInstallPath, 'bin')
    const bunCachePath =    path.resolve(config?.install?.cache?.dir || path.join(bunInstallPath, 'install/cache'))

    core.saveState(keys.INSTALL_PATH, bunInstallPath)
    core.saveState(keys.CACHE_PATH, bunCachePath)

    cache && await restoreCache(bunCachePath, platform)

    core.exportVariable('BUN_INSTALL', bunInstallPath)
    core.addPath(bunBinPath)
    core.setOutput('bun-version', version)
    core.info(`Bun version ${version} installed from ${repo}`)

  } catch (e: any) {
    core.setOutput('error_message', e.message)
    core.setFailed(e.message)
  }
}

main()

