const {suite} = require('uvu')
const assert = require('uvu/assert')
const exec = require('@actions/exec')
const {install, pickVersion} = require('../../main/js/install')

const test = suite('install')

exec.getExecOutput = () => Promise.resolve({stdout: 'BUN_INSTALL="1.0.0"', stderr: ''})

test('install()', async () => {
  assert.equal(await install('1.0.0', 'repo'), '1.0.0')
})

test('pickVersion()', async () => {
  assert.equal(await pickVersion('0.1.2', 'Jarred-Sumner/bun-releases-for-updater'), 'bun-v0.1.2')
  assert.equal(await pickVersion('>=0.1 <0.1.2', 'Jarred-Sumner/bun-releases-for-updater'), 'bun-v0.1.1')

  try {
    await pickVersion('10', 'Jarred-Sumner/bun-releases-for-updater')
  } catch(e) {
    assert.equal(e.message, 'Version 10 not found in Jarred-Sumner/bun-releases-for-updater')
  }
})

test.run()
