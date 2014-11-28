var fastFuture = require('./fast-future')()

fastFuture(function () {
  console.log('this is being run in the future')
})