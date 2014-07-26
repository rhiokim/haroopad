require(['../../idbstore.js'], function (IDBStore) {

  var objStore;

  var nodeCache = {};

  var storeWorker;

  function init () {

    // load worker:
    storeWorker = new Worker('worker.js');

    // listen to the worker's messages:
    storeWorker.addEventListener('message', function (evt) {
      switch (evt.data.msg) {
        case 'ready':
          listItems(evt.data.data);
          break;
        case 'dump':
          listItems(evt.data.data);
          break;
      }
    });

    // dump error objects from the worker:
    storeWorker.addEventListener('error', function (err) {
      console.log('Error from worker:', err.message);
      console.log(err);
    });

    // tell the worker to init the IDBStore
    storeWorker.postMessage({ cmd: 'init' });

    // create references for some nodes we have to work with
    ['submit', 'results-container'].forEach(function (id) {
      nodeCache[id] = document.getElementById(id);
    });

    // and listen to the form's submit button.
    nodeCache.submit.addEventListener('click', enterData);
  }

  function enterData () {
    // read data from inputs
    var propName, value, hasData,
      data = {},
      count = 4;

    while (--count) {
      propName = document.getElementById('prop_' + count).value.trim();
      if (propName.length) {
        hasData = true;
        value = document.getElementById('value_' + count).value.trim();
        // Don't do this at home. This is just a very dirty hack to 'guess' what
        // type of data you just entered. If you do stuff like this in production
        // code, UNICORNS WILL DIE. You have been warned.
        data[propName] = ['{', '['].indexOf(value.substring(0, 1)) !== -1 ? eval('(' + value + ')') : parseInt(value, 10) || value;
      }
    }
    if (!hasData) {
      return;
    }

    storeWorker.postMessage({ cmd: 'add', data: data });
  }

  function clear () {
    storeWorker.postMessage({ cmd: 'clear' });
  }

  // function to render data from store
  function listItems (data) {
    var header, tpl,
      props = ['id'],
      content = '';

    data.forEach(function (item) {
      for (var prop in item) {
        if (props.indexOf(prop) < 0) {
          props.push(prop);
        }
      }
    });

    header = '<tr><th>' + props.join('</th><th>') + '</th></tr>';
    tpl = '<tr><td>{' + props.join('}</td><td>{') + '}</td></tr>';

    data.forEach(function (item) {
      content += tpl.replace(/\{([^\}]+)\}/g, function (_, key) {
        return item[key] || '';
      });
    });

    nodeCache['results-container'].innerHTML = '<table>' + header + content + '</table>';
  }

  // export some functions to the outside to
  // make the onclick="" attributes work.
  window.app = {
    clear: clear
  };

  // go!
  init();

});