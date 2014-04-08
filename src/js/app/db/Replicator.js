define([
    'db/DB'
  ], function(DB) {
      var remoteDB = "http://haroopad:2w9EgmD;'hH`nyyA3qS(9`nFs@localhost:5984/haroopad";
      var syncTime = 15 * 60 * 1000;
      var syncInterval;

      function local2remote() {
        DB.replicate.to(remoteDB, {
          onChange: function() {},
          complete: function() {
            // console.log('toServer complete');
          }
        });
      }

      function remote2local() {
        DB.replicate.from(remoteDB, {
          onChange: function() {},
          complete: function() {
            // console.log('fromServer complete');
            ee.emit('sync.from.server');
          }
        });
      }

      function sync() {
        // console.log('sync start');
        local2remote();
        remote2local();
      }

      syncInterval = setInterval(sync, syncTime);

      return {
        toServer: local2remote,
        fromServer: remote2local,
        sync: function() {
          clearInterval(syncInterval);
          sync();
          syncInterval = setInterval(sync, syncTime);
        }
      }
  });