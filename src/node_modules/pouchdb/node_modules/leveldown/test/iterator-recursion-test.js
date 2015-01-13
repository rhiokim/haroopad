const test          = require('tap').test
    , testCommon    = require('abstract-leveldown/testCommon')
    , leveldown     = require('../')
    , child_process = require('child_process') 

var db
  , sourceData = (function () {
      var d = []
        , i = 0
        , k
      for (; i <  100000; i++) {
        k = (i < 10 ? '0' : '') + i
        d.push({
            type  : 'put'
          , key   : k
          , value : Math.random()
        })
      }
      return d
    }())

test('setUp common', testCommon.setUp)

test('setUp db', function (t) {
  db = leveldown(testCommon.location())
  db.open(function () {
    db.batch(sourceData, t.end.bind(t))
  })
})

test('try to create an iterator with a blown stack', function (t) {
  // Reducing the stack size down from the default 984 for the child node
  // process makes it easier to trigger the bug condition. But making it too low
  // causes the child process to die for other reasons.
  var opts  = { execArgv: ["-stack-size=128"] }
  ,   child = child_process.fork('stack-blower.js', ["run"], opts)
  
  child.on('message', function (m) {
      t.ok(true, m)
      child.disconnect()
      
      t.end()
    })
    .on('exit', function (code, sig) {
      t.ok(false, "Child exited with code=" + code + " sig=" + sig)

      t.end()
    })
})

test('iterate over a large iterator with a large watermark', function (t) {
  var iterator = db.iterator({
        highWaterMark: 10000000
    })
    , count = 0
    , read = function () {
        iterator.next(function () {
          count++

          if (!arguments.length)
            t.end()
          else
            read()
        })
      }

  read()
})

test('tearDown', function (t) {
  db.close(testCommon.tearDown.bind(null, t))
})