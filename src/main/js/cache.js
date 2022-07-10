const cache = require('@actions/cache')
const core = require('@actions/core')
const glob = require('@actions/glob')
const path = require('path')
const fs = require('fs')
const { CACHE_KEY, CACHE_STATE } = require('./constants.js')

async function restoreCache(cachePath, platform){
  const workspace = process.env.GITHUB_WORKSPACE
  const lfPath = path.join(workspace, 'bun.lockb')
  const lfHash = glob.hashFiles(lfPath)
  const primaryKey = `bun-cache-${platform}-${lfHash}`

  core.debug(`cache key is ${primaryKey}`)
  core.saveState(CACHE_KEY, primaryKey)

  const cacheKey = await cache.restoreCache([cachePath], primaryKey)
  core.setOutput('cache-hit', Boolean(cacheKey))

  if (!cacheKey) {
    core.info(`bun cache is not found`)
    return
  }

  core.saveState(CACHE_STATE, cacheKey)
  core.info(`bun cache restored: ${cacheKey}`)
}

async function saveCache(cachePath){
  const primaryKey = core.getState(CACHE_KEY)
  const state = core.getState(CACHE_STATE)

  if (!fs.existsSync(cachePath)) {
    throw new Error(`bun cache dir not found: ${cachePath}`)
  }

  if (primaryKey === state) {
    core.info(`cache state has not been changed ${primaryKey}, save skipped.`)
    return
  }

  const cacheId = await cache.saveCache([cachePath], primaryKey)
  if (cacheId == -1) {
    return
  }

  core.info(`bun cache saved: ${primaryKey}`)
}

module.exports = {
  restoreCache,
  saveCache
}

