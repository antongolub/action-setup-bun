import * as core from '@actions/core'
import { saveCache } from './cache.js'
import { keys } from './constants.js'

async function post() {
  try {
    if (core.getInput('cache')) {
      await saveCache(core.getState(keys.CACHE_PATH))
    }
  } catch (e: any) {
    core.setOutput('error_message', e.message)
    core.setFailed(e.message)
  }
}

await post()
