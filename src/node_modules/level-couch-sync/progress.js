var createBar = require('another-progress-bar')

module.exports = function (db, name, tagline) {
  name = name || db.sourceUrl
  tagline = tagline || function (doc) {
    return doc.id + '@' + doc._rev
  }
  var bar = createBar('syncing with ' + name + '...')
  var counter =
  db
  .on('backoff', function (n,d) {
    var disconnected = 'disconnected. retrying in:'
    bar.label(disconnected + d/1000)
    clearInterval(counter)
    counter = setInterval(function () {
      bar.label(disconnected + (d -= 1000) / 1000)
      if(d <= 0)
        clearInterval(counter)
    }, 1000)
  })
  .on('ready', function () {
    clearInterval(counter)
    bar.label('...connecting to '+name+'...')
  })
  .on('max', function (m) {
    bar.label('connected to '+name+'!!!', 500)
  })
  .on('fail', function (err) {
    bar.label('could not connect: ' + err.message, 500)
  })
  .on('progress', function (ratio) {
    bar.progress(Math.floor(ratio*10000)/100, 100)
  })
  .on('retry', function () {
    bar.label('disconnected from '+name+' , attempting to reconnect')
  })
  .on('timeout', function () {
    bar.label('timeout: no data from ' + name)
  })
  .on('data', function (data) {
    var s = tagline(data)
    if(s)
      bar.label(s)
  })

    return bar
}
