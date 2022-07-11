import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import exec from '@actions/exec'
import {
  install,
  pickVersion,
  getBunUri,
  getPlatform,
} from '../../main/ts/install.js'
import { DEFAULT_REPO } from '../../main/ts/constants'
import { temporaryDirectory } from 'tempy'

const test = suite('install')
const temp = temporaryDirectory()

test('install()', async () => {
  process.env.RUNNER_TOOL_CACHE = temp
  process.env.RUNNER_TEMP = temp

  assert.match(
    await install(DEFAULT_REPO, 'bun-v0.1.1', 'darwin-x64', ),
    /\.bun/
  )

  try {
    // @ts-ignore
    await install()
  } catch (e: any) {
    assert.equal(e.message, 'Source repo is required')
  }

  try {
    // @ts-ignore
    await install('foo/repo')
  } catch (e: any) {
    assert.equal(e.message, 'Bun version is required')
  }

  try {
    // @ts-ignore
    await install('foo/repo', '1.0.0')
  } catch (e: any) {
    assert.equal(e.message, 'Target platform is required')
  }
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
})

test('getBunUri()', async () => {
  assert.equal(
    getBunUri(
      'Jarred-Sumner/bun-releases-for-updater',
      'bun-v0.1.2',
      'darwin-x64'
    ),
    'https://github.com/Jarred-Sumner/bun-releases-for-updater/releases/download/bun-v0.1.2/bun-darwin-x64.zip'
  )
})

test('getPlatform()', async () => {
  assert.match(await getPlatform(), /^.+64$/)
})

test.run()
