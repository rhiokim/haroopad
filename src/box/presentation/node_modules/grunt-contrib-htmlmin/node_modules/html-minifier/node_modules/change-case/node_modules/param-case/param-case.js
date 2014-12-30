var sentence = require('sentence-case');

/**
 * Param case a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  return sentence(string).replace(/ /g, '-');
};
