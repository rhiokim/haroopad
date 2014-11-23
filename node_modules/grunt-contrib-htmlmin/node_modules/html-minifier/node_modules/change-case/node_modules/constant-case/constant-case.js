var snake = require('snake-case');

/**
 * Constant case a string.
 *
 * @param  {String} string
 * @return {String}
 */
module.exports = function (string) {
  return snake(string).toUpperCase();
};
