/* global describe, it */
var assert   = require('assert');
var pathCase = require('./');

describe('path case', function () {
  it('should path case a single word', function () {
    assert.equal(pathCase('test'), 'test');
    assert.equal(pathCase('TEST'), 'test');
  });

  it('should path case regular sentence cased strings', function () {
    assert.equal(pathCase('test string'), 'test/string');
    assert.equal(pathCase('Test String'), 'test/string');
  });

  it('should path case non-alphanumeric separators', function () {
    assert.equal(pathCase('path.case'), 'path/case');
    assert.equal(pathCase('path/case'), 'path/case');
  });

  it('should path case path cased strings', function () {
    assert.equal(pathCase('TestString'), 'test/string');
    assert.equal(pathCase('TestString1_2_3'), 'test/string/1/2/3');
  });
});
