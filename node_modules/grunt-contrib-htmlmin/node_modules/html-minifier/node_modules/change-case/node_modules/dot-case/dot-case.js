var sentence = require('sentence-case');

/**
 * Dot case a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  return sentence(string).replace(/ /g, '.');
};
