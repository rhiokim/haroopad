/* global describe, it */
var assert    = require('assert');
var upperCase = require('./');

describe('upper case', function () {
  it('should upper case a string', function () {
    assert.equal(upperCase(null), '');
    assert.equal(upperCase('test'), 'TEST');
    assert.equal(upperCase('TEST'), 'TEST');
  });
});
