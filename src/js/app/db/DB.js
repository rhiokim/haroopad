define([], function() {
  var path = require('path');
  var PouchDB = require('pouchdb');

  var dbname = path.join(global.PATHS.db, 'haroopad');
  var db = window.db = new PouchDB(dbname, {
    adapter: 'leveldb',
    auto_compaction: true
  });

  // var changes = db.changes({
  //   include_docs: true,
  //   since: 20,
  //   continuous: true,
  //   complete: function(err, response) {
  //     console.log('change complete')
  //   },
  //   onChange: function(change) {
  //     ee.emit('update.doc', change.doc);
  //     console.log('change set: ', change)
  //   }
  // });

  return db;
});