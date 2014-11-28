var test = require('tape')

  , fastFuture = require('./fast-future')()

  , bench = function (length) {
      if (global.setImmediate)
        test('setImmediate', function (t) {
          var count = 0
            , work = function () {
                count++
                if (count < length)
                  global.setImmediate(work)
                else {
                  console.timeEnd('setImmediate')
                  t.end()
                }
              }

          console.time('setImmediate')
          work()
        })

      test('fastFuture', function (t) {
        var count = 0
          , work = function () {
              count++
              if (count < length)
                fastFuture(work)
              else {
                console.timeEnd('fastFuture')
                t.end()
              }
            }

        console.time('fastFuture')
        work()
      })
    }

if (!module.parent)
  bench(process.argv[2] || 1000000)
else
  module.exports = bench