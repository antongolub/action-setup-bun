import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { temporaryDirectory } from 'tempy'
import { getConfig } from '../../main/ts/config'

const test = suite('config')
const temp = temporaryDirectory()

test('getConfig()', () => {
  process.env.GITHUB_WORKSPACE = temp

  assert.equal(getConfig(''), null)
  assert.equal(getConfig('{"foo": "bar"}'), {foo: 'bar'})
  assert.throws(() => getConfig('{'), /Unexpected end of JSON input/)

  delete process.env.GITHUB_WORKSPACE
})

test.run()
