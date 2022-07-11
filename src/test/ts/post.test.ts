import { suite } from 'uvu'
import { temporaryDirectory } from 'tempy'
import { keys } from '../../main/ts/constants.js'

const test = suite('post')
const temp = temporaryDirectory()

test('post()', async () => {
  process.env.RUNNER_TOOL_CACHE = temp
  process.env.RUNNER_TEMP = temp
  process.env.INPUT_CACHE = 'true'
  process.env.INPUT_BUN_VERSION = '0.1.2'
  process.env[`STATE_${keys.CACHE_PATH}`] = temp
  process.env[`STATE_${keys.CACHE_PRIMARY_KEY}`] = 'foo'
  process.env[`STATE_${keys.CACHE_STATE}`] = 'bar'

  await import('../../main/ts/post.js')
})

test.run()
