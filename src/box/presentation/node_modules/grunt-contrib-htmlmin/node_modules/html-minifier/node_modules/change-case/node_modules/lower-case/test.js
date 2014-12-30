var assert    = require('assert');
var lowerCase = require('./');

describe('lower case', function () {
  it('should lower case a string', function () {
    assert.equal(lowerCase(null), '');
    assert.equal(lowerCase('TEST'), 'test');
    assert.equal(lowerCase('test'), 'test');
  });
});
