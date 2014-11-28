var test       = require('tape')
  , testCommon = require('abstract-leveldown/testCommon')
  , MemDOWN    = require('./')
  //, AbstractIterator = require('./').AbstractIterator
  , testBuffer = require('./testdata_b64')

/*** compatibility with basic LevelDOWN API ***/

// meh require('abstract-leveldown/abstract/leveldown-test').args(MemDOWN, test, testCommon)

require('abstract-leveldown/abstract/open-test').args(MemDOWN, test, testCommon)
require('abstract-leveldown/abstract/open-test').open(MemDOWN, test, testCommon)

require('abstract-leveldown/abstract/del-test').all(MemDOWN, test, testCommon)

require('abstract-leveldown/abstract/get-test').all(MemDOWN, test, testCommon)

require('abstract-leveldown/abstract/put-test').all(MemDOWN, test, testCommon)

require('abstract-leveldown/abstract/put-get-del-test').all(MemDOWN, test, testCommon, testBuffer)

require('abstract-leveldown/abstract/batch-test').all(MemDOWN, test, testCommon)
require('abstract-leveldown/abstract/chained-batch-test').all(MemDOWN, test, testCommon)

require('abstract-leveldown/abstract/close-test').close(MemDOWN, test, testCommon)

require('abstract-leveldown/abstract/iterator-test').all(MemDOWN, test, testCommon)

require('abstract-leveldown/abstract/ranges-test').all(MemDOWN, test, testCommon)


//
// TODO: destroy() test copied from localstorage-down
// https://github.com/pouchdb/pouchdb/blob/master/lib/adapters/leveldb.js#L1019
// move this test to abstract-leveldown
// 

test('test .destroy', function (t) {
  var db = new MemDOWN('destroy-test')
  var db2 = new MemDOWN('other-db')
  db2.put('key2', 'value2', function (err) {
    t.notOk(err, 'no error')
    db.put('key', 'value', function (err) {
      t.notOk(err, 'no error')
      db.get('key', {asBuffer: false}, function (err, value) {
        t.notOk(err, 'no error')
        t.equal(value, 'value', 'should have value')
        db.close(function (err) {
          t.notOk(err, 'no error')
          db2.close(function (err) {
            t.notOk(err, 'no error')
            MemDOWN.destroy('destroy-test', function (err) {
              t.notOk(err, 'no error')
              var db3 = new MemDOWN('destroy-test')
              var db4 = new MemDOWN('other-db')
              db3.get('key', function (err, value) {
                t.ok(err, 'key is not there')
                db4.get('key2', {asBuffer: false}, function (err, value) {
                  t.notOk(err, 'no error')
                  t.equal(value, 'value2', 'should have value2')
                  t.end()
                })
              })
            })
          })
        })
      })
    })
  })
})

test('unsorted entry, sorted iterator', function (t) {
  var db = new MemDOWN('foo')
    , noop = function () {}
  db.open(noop)
  db.put('f', 'F', noop)
  db.put('a', 'A', noop)
  db.put('c', 'C', noop)
  db.put('e', 'E', noop)
  db.batch([
      { type: 'put', key: 'd', value: 'D' }
    , { type: 'put', key: 'b', value: 'B' }
    , { type: 'put', key: 'g', value: 'G' }
  ], noop)
  testCommon.collectEntries(db.iterator({ keyAsBuffer: false, valueAsBuffer: false }), function (err, data) {
    t.notOk(err, 'no error')
    t.equal(data.length, 7, 'correct number of entries')
    var expected = [
        { key: 'a', value: 'A' }
      , { key: 'b', value: 'B' }
      , { key: 'c', value: 'C' }
      , { key: 'd', value: 'D' }
      , { key: 'e', value: 'E' }
      , { key: 'f', value: 'F' }
      , { key: 'g', value: 'G' }
    ]
    t.deepEqual(data, expected)
    t.end()
  })
})

test('reading while putting', function (t) {
  var db = new MemDOWN('foo2')
    , noop = function () {}
    , iterator
  db.open(noop)
  db.put('f', 'F', noop)
  db.put('c', 'C', noop)
  db.put('e', 'E', noop)
  iterator = db.iterator({ keyAsBuffer: false, valueAsBuffer: false })
  iterator.next(function (err, key, value) {
    t.equal(key, 'c')
    t.equal(value, 'C')
    db.put('a', 'A', noop)
    iterator.next(function (err, key, value) {
      t.equal(key, 'e')
      t.equal(value, 'E')
      t.end()
    })
  })
})


test('reading while deleting', function (t) {
  var db = new MemDOWN('foo3')
    , noop = function () {}
    , iterator
  db.open(noop)
  db.put('f', 'F', noop)
  db.put('a', 'A', noop)
  db.put('c', 'C', noop)
  db.put('e', 'E', noop)
  iterator = db.iterator({ keyAsBuffer: false, valueAsBuffer: false })
  iterator.next(function (err, key, value) {
    t.equal(key, 'a')
    t.equal(value, 'A')
    db.del('a', noop)
    iterator.next(function (err, key, value) {
      t.equal(key, 'c')
      t.equal(value, 'C')
      t.end()
    })
  })
})

test('reverse ranges', function(t) {
  var db = new MemDOWN('foo4')
    , noop = function () {}
    , iterator
  db.open(noop)
  db.put('a', 'A', noop)
  db.put('c', 'C', noop)
  iterator = db.iterator({ keyAsBuffer: false, valueAsBuffer: false, start:'b', reverse:true })
  iterator.next(function (err, key, value) {
    t.equal(key, 'a')
    t.equal(value, 'A')
    t.end()
  })
})

test('no location', function(t) {
  var db = new MemDOWN()
    , noerr = function (err) {
      t.error(err, 'opens crrectly')
    }
    , noop = function () {}
    , iterator
  db.open(noerr)
  db.put('a', 'A', noop)
  db.put('c', 'C', noop)
  iterator = db.iterator({ keyAsBuffer: false, valueAsBuffer: false, start:'b', reverse:true })
  iterator.next(function (err, key, value) {
    t.equal(key, 'a')
    t.equal(value, 'A')
    t.end()
  })
})

test('delete while iterating', function(t) {
  var db = new MemDOWN()
    , noerr = function (err) {
      t.error(err, 'opens crrectly')
    }
    , noop = function () {}
    , iterator
  db.open(noerr)
  db.put('a', 'A', noop)
  db.put('b', 'B', noop)
  db.put('c', 'C', noop)
  iterator = db.iterator({ keyAsBuffer: false, valueAsBuffer: false, start:'a' })
  iterator.next(function (err, key, value) {
    t.equal(key, 'a')
    t.equal(value, 'A')
    db.del('b', function (err) {
      t.notOk(err, 'no error')
      iterator.next(function (err, key, value) {
        t.notOk(err, 'no error');
        t.equals(key, 'b')
        t.equal(value, 'B')
        t.end()
      });
    })
  })
})