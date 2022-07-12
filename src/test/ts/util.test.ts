import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import { parseInput } from '../../main/ts/util.js'

const test = suite('util')

test('parseInput()', async () => {
  assert.equal(parseInput('false'), undefined)
  assert.equal(parseInput(''), undefined)
  assert.equal(parseInput('foo'), 'foo')
})

test.run()
