import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import cp from 'child_process'

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
const home = temporaryDirectory()

test('install()', async () => {
  process.env.RUNNER_TOOL_CACHE = temp
  process.env.RUNNER_TEMP = temp
  process.env.HOME = home

  assert.match(
    await install(DEFAULT_REPO, 'bun-v0.1.3', process.platform, process.arch),
    /\.bun/,
  )

  assert.equal(
    cp
      .execSync('bun -v', { cwd: `${home}/.bun/bin` })
      .toString()
      .trim(),
    '0.1.3',
  )
})

test('pickVersion()', async () => {
  assert.equal(
    await pickVersion('Jarred-Sumner/bun-releases-for-updater', '1.1.19'),
    'bun-v1.1.19',
  )
  assert.equal(
    await pickVersion('Jarred-Sumner/bun-releases-for-updater', '>=0.1 <1.1.19'),
    'bun-v1.1.18',
  )

  try {
    await pickVersion('Jarred-Sumner/bun-releases-for-updater', '10')
  } catch (e: any) {
    assert.equal(
      e.message,
      'Version 10 not found in Jarred-Sumner/bun-releases-for-updater',
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
      'x64',
    ),
    'https://github.com/Jarred-Sumner/bun-releases-for-updater/releases/download/bun-v0.1.2/bun-darwin-x64.zip',
  )
  assert.equal(
    getBunDistUri(
      'Jarred-Sumner/bun-releases-for-updater',
      'bun-v0.1.3',
      'linux',
      'arm64',
    ),
    'https://github.com/Jarred-Sumner/bun-releases-for-updater/releases/download/bun-v0.1.3/bun-linux-aarch64.zip',
  )
  assert.equal(
    getBunDistUri(
      'Jarred-Sumner/bun-releases-for-updater',
      'bun-v0.1.3',
      'linux',
      'x86_64',
    ),
    'https://github.com/Jarred-Sumner/bun-releases-for-updater/releases/download/bun-v0.1.3/bun-linux-x64.zip',
  )
})

test('getPlatform()', () => {
  assert.equal(getPlatform(), process.platform)
  assert.equal(getPlatform('linux'), 'linux')
  assert.equal(getPlatform('darwin'), 'darwin')

  assert.throws(() => getPlatform('Windows_NT'), 'Unsupported arch: Windows_NT')
})

test('getArch()', () => {
  assert.equal(getArch(), process.arch)
  assert.equal(getArch('arm64'), 'arm64')
  assert.equal(getArch('x64'), 'x64')
  assert.equal(getArch('x86_64'), 'x86_64')
  assert.equal(getArch('aarch64'), 'aarch64')

  assert.throws(() => getArch('x86'), 'Unsupported arch: x86')
})

test.run()
