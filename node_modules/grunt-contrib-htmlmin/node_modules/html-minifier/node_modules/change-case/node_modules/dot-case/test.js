/* global describe, it */
var assert    = require('assert');
var dotCase = require('./');

describe('dot case', function () {
  it('should dot case a single word', function () {
    assert.equal(dotCase('test'), 'test');
    assert.equal(dotCase('TEST'), 'test');
  });

  it('should dot case regular sentence cased strings', function () {
    assert.equal(dotCase('test string'), 'test.string');
    assert.equal(dotCase('Test String'), 'test.string');
  });

  it('should dot case non-alphanumeric separators', function () {
    assert.equal(dotCase('dot.case'), 'dot.case');
    assert.equal(dotCase('path/case'), 'path.case');
  });

  it('should dot case dot cased strings', function () {
    assert.equal(dotCase('TestString'), 'test.string');
    assert.equal(dotCase('TestString1_2_3'), 'test.string.1.2.3');
  });
});
