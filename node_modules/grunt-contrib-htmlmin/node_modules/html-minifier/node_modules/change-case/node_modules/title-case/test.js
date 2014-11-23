/* global describe, it */
var assert    = require('assert');
var titleCase = require('./');

describe('title case', function () {
  it('should title case a single word', function () {
    assert.equal(titleCase('test'), 'Test');
    assert.equal(titleCase('TEST'), 'Test');
  });

  it('should title case regular sentence cased strings', function () {
    assert.equal(titleCase('test string'), 'Test String');
    assert.equal(titleCase('Test String'), 'Test String');
  });

  it('should title case non-alphanumeric separators', function () {
    assert.equal(titleCase('dot.case'), 'Dot Case');
    assert.equal(titleCase('path/case'), 'Path Case');
  });

  it('should title case pascal cased strings', function () {
    assert.equal(titleCase('TestString'), 'Test String');
    assert.equal(titleCase('TestString1_2_3'), 'Test String 1 2 3');
  });
});
