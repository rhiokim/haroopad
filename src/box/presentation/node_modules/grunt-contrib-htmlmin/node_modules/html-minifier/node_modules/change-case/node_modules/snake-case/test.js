/* global describe, it */
var assert    = require('assert');
var snakeCase = require('./');

describe('snake case', function () {
  it('should snake case a single word', function () {
    assert.equal(snakeCase('test'), 'test');
    assert.equal(snakeCase('TEST'), 'test');
  });

  it('should snake case regular sentence cased strings', function () {
    assert.equal(snakeCase('test string'), 'test_string');
    assert.equal(snakeCase('Test String'), 'test_string');
  });

  it('should snake case non-alphanumeric separators', function () {
    assert.equal(snakeCase('dot.case'), 'dot_case');
    assert.equal(snakeCase('path/case'), 'path_case');
  });

  it('should snake case snake cased strings', function () {
    assert.equal(snakeCase('TestString'), 'test_string');
    assert.equal(snakeCase('TestString1_2_3'), 'test_string_1_2_3');
  });
});
