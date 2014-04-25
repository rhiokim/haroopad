'use strict';

module.exports = once;

/* Wrap an arbitrary number of functions and allow only one of them to be
   executed and only once */
function once() {
  var called = 0;
  return function wrapper(wrappedFunction) {
    return function () {
      if (called++) {
        return;
      }
      wrappedFunction.apply(this, arguments);
    };
  };
}