importScripts('../../idbstore.js');

var objStore;
var initialized = false;

onmessage = function (evt) {
  var cmd = evt.data.cmd,
      data = evt.data.data;

  switch (cmd) {
    case 'init':
      objStore = new IDBStore({
        storeName: 'worker-objectstore',
        keyPath: 'id',
        autoIncrement: true,
        onStoreReady: function () {
          initialized = true;
          objStore.getAll(function (data) {
            // tell the main thread that we're ready to go:
            postMessage({
              msg: 'ready',
              data: data
            });
          });
        }
      });
      break;
    case 'add':
      if (!initialized) {
        throw new Error('IDBStore in worker not yet initialized');
      }
      objStore.put(data, sendDump);
      break;
    case 'clear':
      if (!initialized) {
        throw new Error('IDBStore in worker not yet initialized');
      }
      objStore.clear(sendDump);
      break;
    default:
      throw new Error('Unable to process message: ' + JSON.stringify(evt.data));
  }
};

// send a dump of database contents to the main thread
function sendDump () {
  objStore.getAll(function (data) {
    postMessage({
      msg: 'dump',
      data: data
    });
  });
}
