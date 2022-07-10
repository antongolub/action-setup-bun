const core = require('@actions/core')
const tc = require('@actions/tool-cache')
const path = require('path')
const url = require('url')
const { install, pickVersion, getBunUri, getPlatform } = require('./install.js')
const { restoreCache } = require('./cache.js')
const {BUN_INSTALL_PATH, BUN_CACHE_PATH} = require("./constants");

const defaultVersion = '*'
const defaultRepo = 'Jarred-Sumner/bun-releases-for-updater'

async function main() {
  try {
    const range =           core.getInput('bun-version') || core.getInput('version') || defaultVersion
    const repo =            core.getInput('bun-repo') || defaultRepo
    const platform =        core.getInput('platform') || await getPlatform()
    const cache =           core.getInput('cache')
    const version =         await pickVersion(repo, range)
    const bunSource =       await getBunSource(repo, version, platform)
    const bunInstallPath =  await install(platform, url.pathToFileURL(bunSource))
    const bunBinPath =      path.join(bunInstallPath, 'bin')
    const bunCachePath =    path.join(bunInstallPath, 'install/cache')

    core.saveState(BUN_INSTALL_PATH, bunInstallPath)
    core.saveState(BUN_CACHE_PATH, bunCachePath)

    cache && await restoreCache(bunCachePath, platform)

    core.addPath(bunBinPath)
    core.setOutput('bun-version', version)
    core.info(`Bun version ${version} installed from ${repo}`)

  } catch (e) {
    core.setOutput('error_message', e.message)
    core.setFailed(e.message)
  }
}

async function getBunSource(repo, version, platform) {
  const cachedBunPath = tc.find('bun', version, platform)
  if (cachedBunPath) {
    core.info('Found bun in cache')
    return cachedBunPath
  }

  const bunUri = getBunUri(repo, version, platform)
  core.info(`Downloading bun from ${bunUri}`)
  const bunPath = await tc.downloadTool(bunUri)

  await tc.cacheFile(bunPath, `bun-${version}-${platform}`, 'bun', version, platform)
  return bunPath
}

main()
