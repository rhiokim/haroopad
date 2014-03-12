# level-couch-sync

Replicate couchdb data into leveldb in real time with [follow](https://github.com/iriscouch/follow). Must be used
with [sublevel](https://github.com/dominictarr/level-sublevel).


## Usage

The following example illustrates the simplest use case. It will synchronize couchdb data into a leveldb located at `/tmp/level-npm` and store the data as (key, value) = (data.id, JSON.stringify(data.doc)), where data is JSON chunks received from the couch.

``` js
var levelCouchSync = require('level-couch-sync')
var levelup = require('levelup')
var sublevel = require('level-sublevel')

var db = sublevel(levelup('/tmp/level-npm'))
levelCouchSync('http://isaacs.iriscouch.com/registry', db, 'registry-sync')
```

If you provide a map/iterator function you can decide for yourself what kind of data your want to persist. An easy 
way to accomplish this, is to create more sublevels and shove data into them. This example shows how you can store
basic package metadata in a sublevel named `'package'`:

```js
var levelCouchSync = require('level-couch-sync')
var levelup = require('levelup')
var sublevel = require('level-sublevel')

var db = sublevel(levelup('/tmp/level-npm-advanced'))
var packageDb = db.sublevel('package')

levelCouchSync('http://isaacs.iriscouch.com/registry', db, 'registry-sync',
    function (data, emit) {
      var doc = data.doc
      emit(data.id, JSON.stringify({
        name        : doc.name,
        author      : doc.author,
        repository  : doc.repository
      }), packageDb)
    })
```

Each `emit()` call adds a (key, value, sublevel) triplet to a batch operation that is executed once the iterator
returns, which means you can call `emit()` many times during each time the iterator is invoked.

`levelCouchSync()` returns an EventEmitter, which you can attach listeners to. The following example logs package 
versions and progress to stdout. See the events section for more details.

``` js
// ..
var sync = levelCouchSync(url, db, 'registry-sync')

sync.on('data', function (data) {
  console.log(data.id, data.doc.versions && Object.keys(data.doc.versions))
})
sync.on('progress', function (ratio) {
  console.log(Math.floor(ratio*10000)/100 + '%')
})
```

Run the samples in the ``example/`` folder and try it out! It should work on all systems where 
[levelup](https://github.com/rvagg/node-levelup) can be 
compiled. If you want to take a closer look at what the data looks like you can use
[lev](https://github.com/hij1nx/lev), which is an awesome cli tool for viewing any leveldb. All you need is a path 
to it.

## API

The API is very simple and only contain one function.

### require('level-couch-sync')(sourceUrl, db, metaDb[, map])

This function returns an `EventEmitter` instance and has three mandatory arguments and one optional.

* `sourceUrl` is a string pointing out the url to the couch we are getting the updates from
* `db` must be a `level-sublevel` instance and is used to store the data if there is no `map` iterator provided
* `metaDb` must be a `level-sublevel` instance or a string. If it's a string, a sublevel will be created with that name.
`metaDb` handles metadata of the ongoing transfer and keeps track of the `update_seq`, which means that if the process 
crashes, it will automatically continue where it left off
* `map(data, emit)` is an iterator function called for each JSON data received from the couch. The first argument 
`data` is the JSON received from the couch. `emit(key, value, sublevel)` is a function you call each time you want to 
persist some data. It takes the following three arguments:
  * `key` is a string and is the key used to store the value
  * `value` is an object that you are free to build as you please
  * `sublevel` is a `level-sublevel` instance used to store the `key` and the `value`


## Events

level-couch-sync emits various events as the leveldb is syncronized with the couch:

* `sync.emit('data', data)` emitted for each data object received from the couch
* `sync.emit('progress', ratio)` emitted each time data has been written to levelup. The `ratio` is defined as how much data that has been written from the current update sequence. When there is something to be read from the couch then `0 < ratio < 1.0` and when `ratio > 1.0` it means we are syncing live!
* `sync.emit('fail', err)` emitted when there is an error fetching the
`sourceUrl` from couchdb before the request will be tried again using fibonacci
backoff
* `sync.emit('max', maxSeq)` emitted when a request has been made to the source url. `maxSeq` is the value of the `update_seq` property in the JSON response

## progress bar

you can create a progress bar like used in [npmd](github.com/dominictarr/npmd#sync),
just provide a name for the couchdb, and a function that returns a tagline describing
the document that was updated.

``` js
sync.createProgressBar(name, function (data) {
  return toTagline(data)
})
```
by default, `name` is the url of the couchdb instance, and the tagline will be `doc._id+'@'+doc._rev`

# License

MIT

