/* global describe, it */
var assert     = require('assert');
var pascalCase = require('./');

describe('pascal case', function () {
  it('should pascal case a single word', function () {
    assert.equal(pascalCase('test'), 'Test');
    assert.equal(pascalCase('TEST'), 'Test');
  });

  it('should pascal case regular sentence cased strings', function () {
    assert.equal(pascalCase('test string'), 'TestString');
    assert.equal(pascalCase('Test String'), 'TestString');
  });

  it('should pascal case non-alphanumeric separators', function () {
    assert.equal(pascalCase('dot.case'), 'DotCase');
    assert.equal(pascalCase('path/case'), 'PathCase');
  });

  it('should pascal case pascal cased strings', function () {
    assert.equal(pascalCase('TestString'), 'TestString');
  });
});
