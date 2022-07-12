import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import {
  install,
  pickVersion,
  getBunDistUri,
  getPlatform,
  getArch,
} from '../../main/ts/install.js'
import { DEFAULT_REPO } from '../../main/ts/constants'
import { temporaryDirectory } from 'tempy'

const test = suite('install')
const temp = temporaryDirectory()

test('install()', async () => {
  process.env.RUNNER_TOOL_CACHE = temp
  process.env.RUNNER_TEMP = temp

  assert.match(
    await install(DEFAULT_REPO, 'bun-v0.1.1', 'darwin', 'x64'),
    /\.bun/
  )
})

test('pickVersion()', async () => {
  assert.equal(
    await pickVersion('Jarred-Sumner/bun-releases-for-updater', '0.1.2'),
    'bun-v0.1.2'
  )
  assert.equal(
    await pickVersion('Jarred-Sumner/bun-releases-for-updater', '>=0.1 <0.1.2'),
    'bun-v0.1.1'
  )

  try {
    await pickVersion('Jarred-Sumner/bun-releases-for-updater', '10')
  } catch (e: any) {
    assert.equal(
      e.message,
      'Version 10 not found in Jarred-Sumner/bun-releases-for-updater'
    )
  }

  try {
    await pickVersion('Jarred-Sumner/bun-releases-for-updater', '-10.a.2')
  } catch (e: any) {
    assert.equal(e.message, 'Invalid version range: -10.a.2')
  }
})

test('getBunDistUri()', async () => {
  assert.equal(
    getBunDistUri(
      'Jarred-Sumner/bun-releases-for-updater',
      'bun-v0.1.2',
      'darwin',
      'x64'
    ),
    'https://github.com/Jarred-Sumner/bun-releases-for-updater/releases/download/bun-v0.1.2/bun-darwin-x64.zip'
  )
})

test('getPlatform()', async () => {
  assert.equal(await getPlatform(), process.platform)
})

test('getArch()', async () => {
  assert.equal(await getArch(), process.arch)
})

test.run()
