/* global describe, it */
var assert      = require('assert');
var isLowerCase = require('./');

describe('is lower case', function () {
  it('should check if the string is lower case', function () {
    assert.equal(isLowerCase('test'), true);
    assert.equal(isLowerCase('TEST'), false);
    assert.equal(isLowerCase('Test'), false);
  });
});
