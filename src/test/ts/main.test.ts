import { suite } from 'uvu'
import { temporaryDirectory } from 'tempy'

const test = suite('main')
const temp = temporaryDirectory()

test('main()', async () => {
  process.env.RUNNER_TOOL_CACHE = temp
  process.env.RUNNER_TEMP = temp
  process.env['INPUT_BUN-VERSION'] = '0.1.2'
  process.env['INPUT_BUN-CONFIG'] = '{"install": {"production": true}}'
  process.env.INPUT_CACHE = 'true'
  process.env['INPUT_CACHE-BIN'] = 'true'

  await import('../../main/ts/main.js')
})

test.run()
