'use strict';

var unwrap = require('./unwrap');
var INTERNAL = require('./INTERNAL');
var once = require('./once');
var tryCatch = require('./tryCatch');
var getThen = require('./getThen');

// Lazy man's symbols for states
var PENDING = ['PENDING'],
  FULFILLED = ['FULFILLED'],
  REJECTED = ['REJECTED'];
module.exports = Promise;
function Promise(resolver) {
  if (!(this instanceof Promise)) {
    return new Promise(resolver);
  }
  if (typeof resolver !== 'function') {
    throw new TypeError('reslover must be a function');
  }
  this.state = PENDING;
  this.queue = [];
  if (resolver !== INTERNAL) {
    safelyResolveThenable(this, resolver);
  }
}
Promise.prototype.resolve = function (value) {
  var result = tryCatch(getThen, value);
  if (result.status === 'error') {
    return this.reject(result.value);
  }
  var thenable = result.value;

  if (thenable) {
    safelyResolveThenable(this, thenable);
  } else {
    this.state = FULFILLED;
    this.outcome = value;
    var i = -1;
    var len = this.queue.length;
    while (++i < len) {
      this.queue[i].callFulfilled(value);
    }
  }
  return this;
};
Promise.prototype.reject = function (error) {
  this.state = REJECTED;
  this.outcome = error;
  var i = -1;
  var len = this.queue.length;
  while (++i < len) {
    this.queue[i].callRejected(error);
  }
  return this;
};

Promise.prototype['catch'] = function (onRejected) {
  return this.then(null, onRejected);
};
Promise.prototype.then = function (onFulfilled, onRejected) {
  var onFulfilledFunc = typeof onFulfilled === 'function';
  var onRejectedFunc = typeof onRejected === 'function';
  if (!onFulfilledFunc && this.state === FULFILLED || !onRejected && this.state === REJECTED) {
    return this;
  }
  var promise = new Promise(INTERNAL);

  var thenHandler =  {
    promise: promise,
  };
  if (this.state !== REJECTED) {
    if (onFulfilledFunc) {
      thenHandler.callFulfilled = function (value) {
        unwrap(promise, onFulfilled, value);
      };
    } else {
      thenHandler.callFulfilled = function (value) {
        promise.resolve(value);
      };
    }
  }
  if (this.state !== FULFILLED) {
    if (onRejectedFunc) {
      thenHandler.callRejected = function (value) {
        unwrap(promise, onRejected, value);
      };
    } else {
      thenHandler.callRejected = function (value) {
        promise.reject(value);
      };
    }
  }
  if (this.state === FULFILLED) {
    thenHandler.callFulfilled(this.outcome);
  } else if (this.state === REJECTED) {
    thenHandler.callRejected(this.outcome);
  } else {
    this.queue.push(thenHandler);
  }

  return promise;
};
function safelyResolveThenable(self, thenable) {
  // Either fulfill, reject or reject with error
  var onceWrapper = once();
  var onError = onceWrapper(function (value) {
    return self.reject(value);
  });
  var result = tryCatch(function () {
    thenable(
      onceWrapper(function (value) {
        return self.resolve(value);
      }),
      onError
    );
  });
  if (result.status === 'error') {
    onError(result.value);
  }
}