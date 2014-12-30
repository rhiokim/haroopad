/**
 * Uppercase the first character of a string.
 *
 * @param  {String} str
 * @return {String}
 */
module.exports = function (str) {
  if (str == null) {
    return '';
  }

  str = String(str);

  return str.charAt(0).toUpperCase() + str.substr(1);
};
