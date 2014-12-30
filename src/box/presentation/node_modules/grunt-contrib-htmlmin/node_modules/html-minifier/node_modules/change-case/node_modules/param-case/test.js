/* global describe, it */
var assert    = require('assert');
var paramCase = require('./');

describe('param case', function () {
  it('should param case a single word', function () {
    assert.equal(paramCase('test'), 'test');
    assert.equal(paramCase('TEST'), 'test');
  });

  it('should param case regular sentence cased strings', function () {
    assert.equal(paramCase('test string'), 'test-string');
    assert.equal(paramCase('Test String'), 'test-string');
  });

  it('should param case non-alphanumeric separators', function () {
    assert.equal(paramCase('dot.case'), 'dot-case');
    assert.equal(paramCase('path/case'), 'path-case');
  });

  it('should param case param cased strings', function () {
    assert.equal(paramCase('TestString'), 'test-string');
    assert.equal(paramCase('testString1_2_3'), 'test-string-1-2-3');
  });
});
