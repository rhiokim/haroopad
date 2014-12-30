/**
 * Swap the case of a string. Manually iterate over every character and check
 * instead of replacing certain characters for better unicode support.
 *
 * @param  {String} str
 * @return {String}
 */
module.exports = function (str) {
  if (str == null) {
    return '';
  }

  var result = '';

  for (var i = 0; i < str.length; i++) {
    var c = str[i];
    var u = c.toUpperCase();

    result += u === c ? c.toLowerCase() : u;
  }

  return result;
};
