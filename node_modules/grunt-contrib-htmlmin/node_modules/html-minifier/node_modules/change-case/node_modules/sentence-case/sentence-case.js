var NON_WORD_REGEXP       = require('./vendor/non-word-regexp.js');
var CAMEL_CASE_REGEXP     = require('./vendor/camel-case-regexp.js');
var TRAILING_DIGIT_REGEXP = require('./vendor/trailing-digit-regexp.js');

/**
 * Sentence case a string.
 *
 * @param  {String} str
 * @return {String}
 */
module.exports = function (str) {
  if (str == null) {
    return '';
  }

  return String(str)
    // Enables camel case support.
    .replace(CAMEL_CASE_REGEXP, '$1 $2')
    // Add a space after any digits.
    .replace(TRAILING_DIGIT_REGEXP, '$1 $2')
    // Remove all non-word characters and replace with a single space.
    .replace(NON_WORD_REGEXP, ' ')
    // Trim whitespace around the string.
    .replace(/^ | $/g, '')
    // Finally lower case the entire string.
    .toLowerCase();
};
