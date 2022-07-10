const {suite} = require('uvu')
const assert = require('uvu/assert')
const exec = require('@actions/exec')
const {install, pickVersion, getBunUri, getPlatform} = require('../../main/js/install.js')

const test = suite('install')
const getExecOutput = exec.getExecOutput

test('install()', async () => {
  exec.getExecOutput = () => Promise.resolve({stdout: 'BUN_INSTALL="1.0.0"', stderr: ''})
  assert.equal(await install('darwin-x64', 'bun-uri'), '1.0.0')
  exec.getExecOutput = getExecOutput

  try {
    await install()
  } catch(e) {
    assert.equal(e.message, 'Target platform is required')
  }

  try {
    await install('darwin-x64')
  } catch(e) {
    assert.equal(e.message, 'Bun URI is required')
  }
})

test('pickVersion()', async () => {
  assert.equal(await pickVersion('Jarred-Sumner/bun-releases-for-updater', '0.1.2'), 'bun-v0.1.2')
  assert.equal(await pickVersion('Jarred-Sumner/bun-releases-for-updater', '>=0.1 <0.1.2'), 'bun-v0.1.1')

  try {
    await pickVersion('Jarred-Sumner/bun-releases-for-updater', '10')
  } catch(e) {
    assert.equal(e.message, 'Version 10 not found in Jarred-Sumner/bun-releases-for-updater')
  }
})

test('getBunUri()', async () => {
  assert.equal(
    getBunUri( 'Jarred-Sumner/bun-releases-for-updater', 'bun-v0.1.2','darwin-x64'),
    'https://github.com/Jarred-Sumner/bun-releases-for-updater/releases/download/bun-v0.1.2/bun-darwin-x64.zip'
  )
})

test('getPlatform()', async () => {
  assert.match(
    await getPlatform(),
    /^.+64$/
  )
})

test.run()
