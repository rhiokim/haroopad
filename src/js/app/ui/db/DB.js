define([], function() {
  var path = require('path');
  var PouchDB = require('pouchdb');

  var remoteCouch = "http://haroopad:2w9EgmD;'hH`nyyA3qS(9`nFs@localhost:5984/haroopad";
  var dbname = path.join(global.PATHS.db, 'haroopad');
  var db = new PouchDB(dbname, {
    adapter: 'leveldb',
    auto_compaction: true
  });

  window.db = db;

  return db;
});