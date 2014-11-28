var test = require('tape')
  , fastFuture = require('./fast-future')()

require('./benchmark')(10000)

test('extra process.nextTick and then fastFuture', function (t) {
  var count = 0
    , work = function () {
        count++
        if (count < 10000)
          fastFuture(work)
        else
          t.end()

      }

  process.nextTick(work)

})