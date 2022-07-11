import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { temporaryDirectory } from 'tempy'
import { restoreCache, saveCache } from '../../main/ts/cache.js'
import { keys } from '../../main/ts/constants.js'

const test = suite('post')
const temp = temporaryDirectory()

test('saveCache()', async () => {
  process.env[`STATE_${keys.CACHE_PATH}`] = temp
  process.env[`STATE_${keys.CACHE_PRIMARY_KEY}`] = 'foo'
  process.env[`STATE_${keys.CACHE_STATE}`] = 'foo'
  await saveCache(temp)

  try {
    process.env[`STATE_${keys.CACHE_STATE}`] = 'bar'
    await saveCache(temp)
  } catch (e) {}

  try {
    // @ts-ignore
    await saveCache()
  } catch (e: any) {
    assert.ok(e.message.includes('bun cache dir not found'))
  }
})

test('restoreCache()', async () => {
  await restoreCache(temp, 'linux', 'x64')
})

test.run()
