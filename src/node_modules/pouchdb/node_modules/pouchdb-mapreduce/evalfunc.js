'use strict';

module.exports = function (func, emit, sum, log, isArray, toJSON) {
  /*jshint evil: true */
  return eval("'use strict'; (" + func + ");");
};
