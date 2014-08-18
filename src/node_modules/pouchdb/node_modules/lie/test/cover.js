'use strict';
var aplus = require('promises-aplus-tests');
var Promise = require('../lib');
var adapter = {};
var INTERNAL = require('../lib/INTERNAL');
var assert = require('assert');

adapter.deferred = function () {
  var pending = {};
  pending.promise = new Promise(function (resolver, reject) {
    pending.resolve = resolver;
    pending.reject = reject;
  });
  return pending;
};
adapter.resolved = Promise.resolve;
adapter.rejected = Promise.reject;
//noop, just for coverage
INTERNAL();

describe('Lie', function () {
  it('should work without new', function (done) {
    Promise(function (resolve) {
      resolve(true);
    }).then(function () {
      done();
    });
  });
  it('should work resolving a promise new', function (done) {
    new Promise(function (resolve) {
      resolve(new Promise(function (resolve) {
        resolve(true);
      }));
    }).then(function (result) {
      if (result === true) {
        done();
      } else {
        done(true);
      }
    });
  });
  it('should throw if you don\'t pass a function', function (done) {
    try {
      new Promise(true);
    } catch (e) {
      if (e instanceof TypeError) {
        done();
      } else {
        done(e);
      }
    }
  });
  it('should have a working catch method', function (done) {
    new Promise(function () {
      throw new Error('boom');
    }).catch(function () {
      done();
    });
  });
  describe('resolve', function () {
    it('should work with true', function (done) {
      Promise.resolve(true).then(function (value) {
        if (value === true) {
          done();
        } else {
          done(true);
        }
      });
    });
    it('should work with false', function (done) {
      Promise.resolve(false).then(function (value) {
        if (value === false) {
          done();
        } else {
          done(true);
        }
      });
    });
    it('should work with null', function (done) {
      Promise.resolve(null).then(function (value) {
        if (value === null) {
          done();
        } else {
          done(true);
        }
      });
    });
    it('should work with undefined', function (done) {
      Promise.resolve(undefined).then(function (value) {
        if (value === undefined) {
          done();
        } else {
          done(true);
        }
      });
    });
    it('should work with 0', function (done) {
      Promise.resolve(0).then(function (value) {
        value++;
        return Promise.resolve(0);
      }).then(function (value) {
        if (value === 0) {
          done();
        } else {
          done(true);
        }
      });
    });
    it('should work with 1', function (done) {
      Promise.resolve(1).then(function (value) {
        if (value === 1) {
          done();
        } else {
          done(true);
        }
      });
    });
    it('should work with \'\'', function (done) {
      Promise.resolve('').then(function (value) {
        if (value === '') {
          done();
        } else {
          done(true);
        }
      });
    });
    it('should work with \'something\'', function (done) {
      Promise.resolve('something').then(function (value) {
        if (value === 'something') {
          done();
        } else {
          done(true);
        }
      });
    });
  });
  describe('Promise.all', function () {
    //https://github.com/domenic/promises-unwrapping/blob/master/reference-implementation/test/all.js
    it('fulfills if passed an empty array', function (done) {
      var iterable = [];

      Promise.all(iterable).then(function (value) {
        assert(Array.isArray(value));
        assert.deepEqual(value, []);
        done();
      });
    });

    it('fulfills if passed an array of mixed fulfilled promises and values', function (done) {
      var iterable = [0, Promise.resolve(1), 2, Promise.resolve(3)];

      Promise.all(iterable).then(function (value) {
        assert(Array.isArray(value));
        assert.deepEqual(value, [0, 1, 2, 3]);
        done();
      });
    });

    it('rejects if any passed promise is rejected', function (done) {
      var foreverPending = new Promise(function () {});
      var error = new Error('Rejected');
      var rejected = Promise.reject(error);

      var iterable = [foreverPending, rejected];

      Promise.all(iterable).then(
        function (value) {
          assert(false, 'should never get here');
          done();
        },
        function (reason) {
          assert.strictEqual(reason, error);
          done();
        }
      );
    });

    it('resolves foreign thenables', function (done) {
      var normal = Promise.resolve(1);
      var foreign = { then: function (f) { f(2); } };

      var iterable = [normal, foreign];

      Promise.all(iterable).then(function (value) {
        assert.deepEqual(value, [1, 2]);
        done();
      });
    });

    it('fulfills when passed an sparse array, giving `undefined` for the omitted values', function (done) {
      var iterable = [Promise.resolve(0), , , Promise.resolve(1)];

      Promise.all(iterable).then(function (value) {
        assert.deepEqual(value, [0, undefined, undefined, 1]);
        done();
      });
    });

    it('does not modify the input array', function (done) {
      var input = [0, 1];
      var iterable = input;

      Promise.all(iterable).then(function (value) {
        assert.notStrictEqual(input, value);
        done();
      });
    });


    it('should reject with a TypeError if given a non-iterable', function (done) {
      var notIterable = {};

      Promise.all(notIterable).then(
        function () {
          assert(false, 'should never get here');
          done();
        },
        function (reason) {
          assert(reason instanceof TypeError);
          done();
        }
      );
    });
  });
  describe('Promises/A+ Tests', function () {
    aplus.mocha(adapter);
  });
});