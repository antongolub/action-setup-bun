import * as cache from '@actions/cache'
import * as core from '@actions/core'
import * as glob from '@actions/glob'
import path from 'path'
import fs from 'fs'
import { keys, LOCKFILE_NAME } from './constants.js'

export async function restoreCache(
  cachePath: string,
  platform: string,
  arch: string
) {
  const cwd = process.env.GITHUB_WORKSPACE || process.cwd()
  const lfPath = path.join(cwd, LOCKFILE_NAME)
  const lfHash = await glob.hashFiles(lfPath)
  const primaryKey = `bun-cache-${platform}-${arch}-${lfHash}`

  core.debug(`cache key is ${primaryKey}`)
  core.saveState(keys.CACHE_PRIMARY_KEY, primaryKey)

  const cacheKey = await cache.restoreCache([cachePath], primaryKey)
  core.setOutput('cache-hit', Boolean(cacheKey))

  if (!cacheKey) {
    core.info(`bun cache is not found`)
    return
  }

  core.saveState(keys.CACHE_STATE, cacheKey)
  core.info(`bun cache restored: ${cacheKey}`)
}

export async function saveCache(cachePath: string) {
  const primaryKey = core.getState(keys.CACHE_PRIMARY_KEY)
  const state = core.getState(keys.CACHE_STATE)

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
