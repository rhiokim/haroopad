var camel          = require('camel-case');
var upperCaseFirst = require('upper-case-first');

/**
 * Pascal case a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  return upperCaseFirst(camel(string));
};
