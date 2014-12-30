/* global describe, it */
var util         = require('util');
var expect       = require('chai').expect;
var sentenceCase = require('./');

/**
 * Automatically generate test suite from the array of rules.
 *
 * @type {Array}
 */
var TESTS = [
  // Single words.
  ['test', 'test'],
  ['TEST', 'test'],

  // Camel case.
  ['testString', 'test string'],
  ['testString123', 'test string 123'],

  // Non-alphanumeric separators.
  ['dot.case', 'dot case'],
  ['path/case', 'path case'],
  ['snake_case', 'snake case'],

  // Punctuation.
  ['"quotes"', 'quotes'],

  // Space between number parts.
  ['version 0.45.0', 'version 0 45 0'],
  ['version 0..78..9', 'version 0 78 9'],
  ['version 4_99/4', 'version 4 99 4'],

  // Odd input.
  [null, ''],
  [undefined, ''],
  [10, '10'],
  [{ toString: function () { return 'test'; } }, 'test'],

  // Whitespace.
  ['  test  ', 'test'],

  // Non-ascii characters.
  ['español', 'español'],
  ['Beyoncé Knowles', 'beyoncé knowles'],
  ['Iñtërnâtiônàlizætiøn', 'iñtërnâtiônàlizætiøn'],

  // Number string input.
  ['something2014other', 'something 2014 other']
];

describe('sentence case', function () {
  TESTS.forEach(function (test) {
    var before = test[0];
    var after  = test[1];

    it(util.inspect(before) + ' -> ' + util.inspect(after), function () {
      expect(sentenceCase(before)).to.equal(after);
    });
  });
});
