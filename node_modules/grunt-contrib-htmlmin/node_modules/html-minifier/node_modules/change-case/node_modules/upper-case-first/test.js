/* global describe, it */
var assert    = require('assert');
var lowerCase = require('./');

describe('upper case first', function () {
  it('should upper case the first character a string', function () {
    assert.equal(lowerCase(null), '');
    assert.equal(lowerCase('test'), 'Test');
    assert.equal(lowerCase('TEST'), 'TEST');
  });
});
