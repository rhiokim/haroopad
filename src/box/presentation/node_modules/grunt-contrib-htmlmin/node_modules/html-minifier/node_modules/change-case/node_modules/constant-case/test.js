/* global describe, it */
var assert       = require('assert');
var constantCase = require('./');

describe('constant case', function () {
  it('should upper case a single word', function () {
    assert.equal(constantCase('test'), 'TEST');
    assert.equal(constantCase('TEST'), 'TEST');
  });

  it('should constant case regular sentence cased strings', function () {
    assert.equal(constantCase('test string'), 'TEST_STRING');
    assert.equal(constantCase('Test String'), 'TEST_STRING');
  });

  it('should constant case non-alphanumeric separators', function () {
    assert.equal(constantCase('dot.case'), 'DOT_CASE');
    assert.equal(constantCase('path/case'), 'PATH_CASE');
  });

  it('should constant case pascal cased strings', function () {
    assert.equal(constantCase('TestString'), 'TEST_STRING');
  });
});
