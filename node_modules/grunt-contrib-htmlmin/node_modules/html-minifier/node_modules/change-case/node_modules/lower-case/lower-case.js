var toLower = String.prototype.toLowerCase;

/**
 * Lowercase a string.
 *
 * @param  {String} str
 * @return {String}
 */
module.exports = function (str) {
  return str == null ? '' : toLower.call(str);
};
