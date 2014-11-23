var upper    = require('upper-case');
var sentence = require('sentence-case');

/**
 * Title case a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  return sentence(string).replace(/^\w| \w/g, upper);
};
