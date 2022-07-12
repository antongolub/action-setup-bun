import * as core from '@actions/core'
import { saveCache } from './cache.js'
import { keys } from './constants.js'
import { getInput } from './util.js'

async function post() {
  if (!getInput('cache')) return

  try {
    await saveCache(core.getState(keys.CACHE_PATH))
  } catch (e: any) {
    core.setOutput('error', e.message)
    core.setFailed(e.message)
  }
}

await post()
