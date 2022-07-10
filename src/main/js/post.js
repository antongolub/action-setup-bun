const core = require('@actions/core')
const { saveCache } = require('./cache.js')
const { BUN_CACHE_PATH } = require('./constants.js')

async function post() {
  try {
    if (core.getInput('cache')){
      await saveCache(core.getState(BUN_CACHE_PATH))
    }
  } catch (e) {
    core.setOutput('error_message', e.message)
    core.setFailed(e.message)
  }
}

post()
