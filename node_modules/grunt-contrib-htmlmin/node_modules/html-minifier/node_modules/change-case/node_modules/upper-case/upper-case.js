var upperCase = String.prototype.toUpperCase;

/**
 * Upper case a string.
 *
 * @param  {String} str
 * @return {String}
 */
module.exports = function (str) {
  return str == null ? '' : upperCase.call(str);
};
