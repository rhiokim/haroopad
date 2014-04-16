'use strict';
var INTERNAL = require('./INTERNAL');
var Promise = require('./promise');
var reject = require('./reject');
var resolve = require('./resolve');

module.exports = function all(iterable) {
  if (Object.prototype.toString.call(iterable) !== '[object Array]') {
    return reject(new TypeError('must be an array'));
  }
  var len = iterable.length;
  if (!len) {
    return resolve([]);
  }
  var values = [];
  var resolved = 0;
  var i = -1;
  var promise = new Promise(INTERNAL);
  function allResolver(value, i) {
    resolve(value).then(function (outValue) {
      values[i] = outValue;
      if (++resolved === len) {
        promise.resolve(values);
      }
    }, function (error) {
      promise.reject(error);
    });
  }
  
  while (++i < len) {
    allResolver(iterable[i], i);
  }
  return promise;
};