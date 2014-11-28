var assert = require('assert')
var d64 = require('../')()

var code
console.log(code = d64.encode(new Buffer([10,11,12,13])))
console.log(d64.decode(code))

var random = require('crypto').randomBytes

for(var i = 1; i < 100; i++) {

var b = random(i)
  var expected, actual
  console.log()
  console.log(expected = b.toString('hex'))
  console.log(code = d64.encode(b))
  console.log(code.length, b.length, (code.length*3)>>2)
  console.log(actual = d64.decode(code).toString('hex'))
  assert.equal(actual, expected)
}
