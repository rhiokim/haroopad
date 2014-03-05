!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.mapReduce=e():"undefined"!=typeof global?global.mapReduce=e():"undefined"!=typeof self&&(self.mapReduce=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

module.exports = function (func, emit, sum, log, isArray, toJSON) {
  /*jshint evil: true */
  return eval("'use strict'; (" + func + ");");
};

},{}],2:[function(require,module,exports){
var process=require("__browserify_process"),global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};'use strict';

var pouchCollate = require('pouchdb-collate');
var Promise = typeof global.Promise === 'function' ? global.Promise : require('lie');
var collate = pouchCollate.collate;
var evalFunc = require('./evalfunc');
var log = (typeof console !== 'undefined') ?
  Function.prototype.bind.call(console.log, console) : function() {};
var processKey = function (key) {
  // Stringify keys since we want them as map keys (see #35)
  return JSON.stringify(pouchCollate.normalizeKey(key));
};
// This is the first implementation of a basic plugin, we register the
// plugin object with pouch and it is mixin'd to each database created
// (regardless of adapter), adapters can override plugins by providing
// their own implementation. functions on the plugin object that start
// with _ are reserved function that are called by pouchdb for special
// notifications.

// If we wanted to store incremental views we can do it here by listening
// to the changes feed (keeping track of our last update_seq between page loads)
// and storing the result of the map function (possibly using the upcoming
// extracted adapter functions)

function MapReduceError(name, msg, code) {
  this.name = name;
  this.message = msg;
  this.status =  code;
}
MapReduceError.prototype = new Error();

function createKeysLookup(keys) {
  // creates a lookup map for the given keys, so that doing
  // query() with keys doesn't become an O(n * m) operation
  // lookup values are typically integer indexes, but may
  // map to a list of integers, since keys can be duplicated
  var lookup = {};

  for (var i = 0, len = keys.length; i < len; i++) {
    var key = processKey(keys[i]);
    var val = lookup[key];
    if (typeof val === 'undefined') {
      lookup[key] = i;
    } else if (typeof val === 'number') {
      lookup[key] = [val, i];
    } else { // array
      val.push(i);
    }
  }

  return lookup;
}

function sortByIdAndValue(a, b) {
  // sort by id, then value
  var idCompare = collate(a.id, b.id);
  return idCompare !== 0 ? idCompare : collate(a.value, b.value);
}
function addAtIndex(idx, result, prelimResults) {
  var val = prelimResults[idx];
  if (typeof val === 'undefined') {
    prelimResults[idx] = result;
  } else if (!Array.isArray(val)) {
    // same key for multiple docs, need to preserve document order, so create array
    prelimResults[idx] = [val, result];
  } else { // existing array
    val.push(result);
  }
}

function sum(values) {
  return values.reduce(function (a, b) {
    return a + b;
  }, 0);
}

var builtInReduce = {
  "_sum": function (keys, values) {
    return sum(values);
  },

  "_count": function (keys, values, rereduce) {
    return values.length;
  },

  "_stats": function (keys, values) {
    return {
      'sum': sum(values),
      'min': Math.min.apply(null, values),
      'max': Math.max.apply(null, values),
      'count': values.length,
      'sumsqr': (function () {
        var _sumsqr = 0;
        for (var idx in values) {
          if (typeof values[idx] === 'number') {
            _sumsqr += values[idx] * values[idx];
          } else {
            return new MapReduceError(
              'builtin _stats function requires map values to be numbers',
              'invalid_value',
              500
            );
          }
        }
        return _sumsqr;
      })()
    };
  }
};

function addHttpParam(paramName, opts, params, asJson) {
  // add an http param from opts to params, optionally json-encoded
  var val = opts[paramName];
  if (typeof val !== 'undefined') {
    if (asJson) {
      val = encodeURIComponent(JSON.stringify(val));
    }
    params.push(paramName + '=' + val);
  }
}

function MapReduce(db) {
  if (!(this instanceof MapReduce)) {
    return new MapReduce(db);
  }

  function mapUsingKeys(inputResults, keys, keysLookup) {
    // create a new results array from the given array,
    // ensuring that the following conditions are respected:
    // 1. docs are ordered by key, then doc id
    // 2. docs can appear >1 time in the list, if their key is specified >1 time
    // 3. keys can be unknown, in which case there's just a hole in the returned array

    var prelimResults = new Array(keys.length);

    inputResults.forEach(function (result) {
      var idx = keysLookup[processKey(result.key)];
      if (typeof idx === 'number') {
        addAtIndex(idx, result, prelimResults);
      } else { // array of indices
        idx.forEach(function (subIdx) {
          addAtIndex(subIdx, result, prelimResults);
        });
      }
    });

    // flatten the array, remove nulls, sort by doc ids
    var outputResults = [];
    prelimResults.forEach(function (result) {
      if (Array.isArray(result)) {
        outputResults = outputResults.concat(result.sort(sortByIdAndValue));
      } else { // single result
        outputResults.push(result);
      }
    });

    return outputResults;
  }

  function viewQuery(fun, options) {
    var origMap;
    if (!options.skip) {
      options.skip = 0;
    }

    if (!fun.reduce) {
      options.reduce = false;
    }

    var results = [];
    var current;
    var num_started = 0;
    var completed = false;
    var keysLookup;

    function emit(key, val) {
      var viewRow = {
        id: current.doc._id,
        key: key,
        value: val
      };

      if (typeof options.startkey !== 'undefined' && collate(key, options.startkey) < 0) {
        return;
      }
      if (typeof options.endkey !== 'undefined' && collate(key, options.endkey) > 0) {
        return;
      }
      if (typeof options.key !== 'undefined' && collate(key, options.key) !== 0) {
        return;
      }
      if (typeof options.keys !== 'undefined') {
        keysLookup = keysLookup || createKeysLookup(options.keys);
        if (typeof keysLookup[processKey(key)] === 'undefined') {
          return;
        }
      }

      num_started++;
      if (options.include_docs) {
        //in this special case, join on _id (issue #106)
        if (val && typeof val === 'object' && val._id) {
          db.get(val._id,
            function (_, joined_doc) {
              if (joined_doc) {
                viewRow.doc = joined_doc;
              }
              results.push(viewRow);
              checkComplete();
            });
          return;
        } else {
          viewRow.doc = current.doc;
        }
      }
      results.push(viewRow);
    }
    if (typeof fun.map === "function" && fun.map.length === 2) {
      //save a reference to it
      origMap = fun.map;
      fun.map = function (doc) {
        //call it with the emit as the second argument
        return origMap(doc, emit);
      };
    } else {
      // ugly way to make sure references to 'emit' in map/reduce bind to the
      // above emit
      fun.map = evalFunc(fun.map.toString(), emit, sum, log, Array.isArray, JSON.parse);
    }
    if (fun.reduce) {
      if (builtInReduce[fun.reduce]) {
        fun.reduce = builtInReduce[fun.reduce];
      } else {
        fun.reduce = evalFunc(fun.reduce.toString(), emit, sum, log, Array.isArray, JSON.parse);
      }
    }

    //only proceed once all documents are mapped and joined
    function checkComplete() {
      var error;
      if (completed && results.length === num_started) {

        if (typeof options.keys !== 'undefined' && results.length) {
          // user supplied a keys param, sort by keys
          results = mapUsingKeys(results, options.keys, keysLookup);
        } else { // normal sorting
          results.sort(function (a, b) {
            // sort by key, then id
            var keyCollate = collate(a.key, b.key);
            return keyCollate !== 0 ? keyCollate : collate(a.id, b.id);
          });
        }
        if (options.descending) {
          results.reverse();
        }
        if (options.reduce === false) {
          return options.complete(null, {
            total_rows: results.length,
            offset: options.skip,
            rows: ('limit' in options) ? results.slice(options.skip, options.limit + options.skip) :
              (options.skip > 0) ? results.slice(options.skip) : results
          });
        }

        var groups = [];
        results.forEach(function (e) {
          var last = groups[groups.length - 1];
          if (last && collate(last.key[0][0], e.key) === 0) {
            last.key.push([e.key, e.id]);
            last.value.push(e.value);
            return;
          }
          groups.push({key: [
            [e.key, e.id]
          ], value: [e.value]});
        });
        groups.forEach(function (e) {
          e.value = fun.reduce.call(null, e.key, e.value);
          if (e.value.sumsqr && e.value.sumsqr instanceof MapReduceError) {
            error = e.value;
            return;
          }
          e.key = e.key[0][0];
        });
        if (error) {
          options.complete(error);
          return;
        }
        options.complete(null, {
          total_rows: groups.length,
          offset: options.skip,
          rows: ('limit' in options) ? groups.slice(options.skip, options.limit + options.skip) :
            (options.skip > 0) ? groups.slice(options.skip) : groups
        });
      }
    }

    db.changes({
      conflicts: true,
      include_docs: true,
      onChange: function (doc) {
        if (!('deleted' in doc) && doc.id[0] !== "_") {
          current = {doc: doc.doc};
          fun.map.call(null, doc.doc);
        }
      },
      complete: function () {
        completed = true;
        checkComplete();
      }
    });
  }

  function httpQuery(fun, opts) {
    var callback = opts.complete;

    // List of parameters to add to the PUT request
    var params = [];
    var body;
    var method = 'GET';

    // If opts.reduce exists and is defined, then add it to the list
    // of parameters.
    // If reduce=false then the results are that of only the map function
    // not the final result of map and reduce.
    addHttpParam('reduce', opts, params);
    addHttpParam('include_docs', opts, params);
    addHttpParam('limit', opts, params);
    addHttpParam('descending', opts, params);
    addHttpParam('group', opts, params);
    addHttpParam('group_level', opts, params);
    addHttpParam('skip', opts, params);
    addHttpParam('startkey', opts, params, true);
    addHttpParam('endkey', opts, params, true);
    addHttpParam('key', opts, params, true);

    // If keys are supplied, issue a POST request to circumvent GET query string limits
    // see http://wiki.apache.org/couchdb/HTTP_view_API#Querying_Options
    if (typeof opts.keys !== 'undefined') {
      method = 'POST';
      if (typeof fun === 'string') {
        body = JSON.stringify({keys: opts.keys});
      } else { // fun is {map : mapfun}, so append to this
        fun.keys = opts.keys;
      }
    }

    // Format the list of parameters into a valid URI query string
    params = params.join('&');
    params = params === '' ? '' : '?' + params;

    // We are referencing a query defined in the design doc
    if (typeof fun === 'string') {
      var parts = fun.split('/');
      db.request({
        method: method,
        url: '_design/' + parts[0] + '/_view/' + parts[1] + params,
        body: body
      }, callback);
      return;
    }

    // We are using a temporary view, terrible for performance but good for testing
    var queryObject = JSON.parse(JSON.stringify(fun, function (key, val) {
      if (typeof val === 'function') {
        return val + ''; // implicitly `toString` it
      }
      return val;
    }));

    db.request({
      method: 'POST',
      url: '_temp_view' + params,
      body: queryObject
    }, callback);
  }

  this.query = function (fun, opts, callback) {
    if (typeof opts === 'function') {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    if (callback) {
      opts.complete = callback;
    }
    var tempCB = opts.complete;
    var realCB;
    if (opts.complete) {
      realCB = function (err, resp) {
        process.nextTick(function () {
          tempCB(err, resp);
        });
      };
    } 
    var promise = new Promise(function (resolve, reject) {
      opts.complete = function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      };

      if (db.type() === 'http') {
        if (typeof fun === 'function') {
          return httpQuery({map: fun}, opts);
        }
        return httpQuery(fun, opts);
      }

      if (typeof fun === 'object') {
        return viewQuery(fun, opts);
      }

      if (typeof fun === 'function') {
        return viewQuery({map: fun}, opts);
      }

      var parts = fun.split('/');
      db.get('_design/' + parts[0], function (err, doc) {
        if (err) {
          opts.complete(err);
          return;
        }

        if (!doc.views[parts[1]]) {
          opts.complete({ name: 'not_found', message: 'missing_named_view' });
          return;
        }
        viewQuery({
          map: doc.views[parts[1]].map,
          reduce: doc.views[parts[1]].reduce
        }, opts);
      });
    });
    if (realCB) {
      promise.then(function (resp) {
        realCB(null, resp);
      }, realCB);
    }
    return promise;
  };
}

// Deletion is a noop since we dont store the results of the view
MapReduce._delete = function () {
};
module.exports = MapReduce;

},{"./evalfunc":1,"__browserify_process":3,"lie":4,"pouchdb-collate":14}],3:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],4:[function(require,module,exports){
'use strict';

var immediate = require('immediate');
var isDefineProp = false;
// prevents deoptimization
(function(){
    try {
        Object.defineProperty({}, 'test', {value:true});
        isDefineProp = true;
    }catch(e){}
}());
function defineNonEnum(obj, name, value){
    if(isDefineProp){
         Object.defineProperty(obj, name, {
            value: value,
            configurable: true,
            writable: true
        });
    }else{
        obj[name] = value;
    }
}
function Promise(resolver) {

     if (!(this instanceof Promise)) {
        return new Promise(resolver);
    }

    defineNonEnum(this, 'successQueue', []);
    defineNonEnum(this, 'failureQueue', []);
    defineNonEnum(this, 'resolved', false);

  
    if(typeof resolver === 'function'){
        this.resolvePassed(resolver);
    }
}
defineNonEnum(Promise.prototype, 'resolvePassed', function(resolver){
    try{
        resolver(this.fulfillUnwrap.bind(this),this.reject.bind(this));
    }catch(e){
        this.reject(e);
    }
});
defineNonEnum(Promise.prototype, 'reject', function(reason){
    this.resolve(false,reason);
});
defineNonEnum(Promise.prototype, 'fulfill', function(value){
    this.resolve(true,value);
});
defineNonEnum(Promise.prototype, 'fulfillUnwrap', function(value){
    unwrap(this.fulfill.bind(this), this.reject.bind(this), value);
});
Promise.prototype.then = function(onFulfilled, onRejected) {
    if(this.resolved){
        return this.resolved(onFulfilled, onRejected);
    } else {
        return this.pending(onFulfilled, onRejected);
    }
};
(function(){
    try {
        Promise.prototype.catch = function(onRejected) {
            return this.then(null, onRejected);
        };
    } catch(e){}
}());
defineNonEnum(Promise.prototype, 'pending', function(onFulfilled, onRejected){
    var self = this;
    return new Promise(function(success,failure){
        if(typeof onFulfilled === 'function'){
            self.successQueue.push({
                resolve: success,
                reject: failure,
                callback:onFulfilled
            });
        }else{
            self.successQueue.push({
                next: success,
                callback:false
            });
        }

        if(typeof onRejected === 'function'){
            self.failureQueue.push({
                resolve: success,
                reject: failure,
                callback:onRejected
            });
        }else{
            self.failureQueue.push({
                next: failure,
                callback:false
            });
        }
    });
});
defineNonEnum(Promise.prototype, 'resolve', function (success, value){

    if(this.resolved){
        return;
    }

    this.resolved = createResolved(this, value, success?0:1);

    var queue = success ? this.successQueue : this.failureQueue;
    var len = queue.length;
    var i = -1;
    while(++i < len) {

        if (queue[i].callback) {
            immediate(execute,queue[i].callback, value, queue[i].resolve, queue[i].reject);
        }else {
            queue[i].next(value);
        }
    }
});

function unwrap(fulfill, reject, value){
    if(value && typeof value.then==='function'){
        value.then(fulfill,reject);
    }else{
        fulfill(value);
    }
}

function createResolved(scope, value, whichArg) {
    function resolved() {
        var callback = arguments[whichArg];
        if (typeof callback !== 'function') {
            return scope;
        }else{
            return new Promise(function(resolve,reject){
                immediate(execute,callback,value,resolve,reject);
            });
        }
    }
    return resolved;
}

function execute(callback, value, resolve, reject) {
    try {
        unwrap(resolve,reject,callback(value));
    } catch (error) {
        reject(error);
    }
}



module.exports = Promise;

},{"immediate":7}],5:[function(require,module,exports){
"use strict";
exports.test = function () {
    return false;
};
},{}],6:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};module.exports = typeof global === "object" && global ? global : this;
},{}],7:[function(require,module,exports){
"use strict";
var types = [
    require("./nextTick"),
    require("./mutation"),
    require("./realSetImmediate"),
    require("./postMessage"),
    require("./messageChannel"),
    require("./stateChange"),
    require("./timeout")
];
var handlerQueue = [];
function drainQueue() {
    var i = 0,
        task,
        innerQueue = handlerQueue;
	handlerQueue = [];
	/*jslint boss: true */
	while (task = innerQueue[i++]) {
		task();
	}
}
var nextTick;
var i = -1;
var len = types.length;
while(++i<len){
    if(types[i].test()){
        nextTick = types[i].install(drainQueue);
        break;
    }
}
var retFunc = function (task) {
    var len, args;
    var nTask = task;
    if (arguments.length > 1 && typeof task === "function") {
        args = Array.prototype.slice.call(arguments, 1);
        nTask = function(){
            task.apply(undefined,args);
        }
    }
    if ((len = handlerQueue.push(nTask)) === 1) {
        nextTick(drainQueue);
    }
    return len;
};
retFunc.clear = function (n) {
    if (n <= handlerQueue.length) {
        handlerQueue[n - 1] = function () {};
    }
    return this;
};
module.exports = retFunc;

},{"./messageChannel":8,"./mutation":9,"./nextTick":5,"./postMessage":10,"./realSetImmediate":11,"./stateChange":12,"./timeout":13}],8:[function(require,module,exports){
"use strict";
var globe = require("./global");
exports.test = function () {
    return !!globe.MessageChannel;
};

exports.install = function (func) {
    var channel = new globe.MessageChannel();
    channel.port1.onmessage = func;
    return function () {
        channel.port2.postMessage(0);
    };
};
},{"./global":6}],9:[function(require,module,exports){
"use strict";
//based off rsvp
//https://github.com/tildeio/rsvp.js/blob/master/lib/rsvp/async.js
var globe = require("./global");

var MutationObserver = globe.MutationObserver || globe.WebKitMutationObserver;

exports.test = function () {
    return MutationObserver;
};

exports.install = function (handle) {
    var observer = new MutationObserver(handle);
    var element = globe.document.createElement("div");
    observer.observe(element, { attributes: true });

    // Chrome Memory Leak: https://bugs.webkit.org/show_bug.cgi?id=93661
    globe.addEventListener("unload", function () {
        observer.disconnect();
        observer = null;
    }, false);
    return function () {
        element.setAttribute("drainQueue", "drainQueue");
    };
};
},{"./global":6}],10:[function(require,module,exports){
"use strict";
var globe = require("./global");
exports.test = function () {
    // The test against `importScripts` prevents this implementation from being installed inside a web worker,
    // where `global.postMessage` means something completely different and can"t be used for this purpose.

    if (!globe.postMessage || globe.importScripts) {
        return false;
    }

    var postMessageIsAsynchronous = true;
    var oldOnMessage = globe.onmessage;
    globe.onmessage = function () {
        postMessageIsAsynchronous = false;
    };
    globe.postMessage("", "*");
    globe.onmessage = oldOnMessage;

    return postMessageIsAsynchronous;
};

exports.install = function (func) {
    var codeWord = "com.calvinmetcalf.setImmediate" + Math.random();
    function globalMessage(event) {
        if (event.source === globe && event.data === codeWord) {
            func();
        }
    }
    if (globe.addEventListener) {
        globe.addEventListener("message", globalMessage, false);
    } else {
        globe.attachEvent("onmessage", globalMessage);
    }
    return function () {
        globe.postMessage(codeWord, "*");
    };
};
},{"./global":6}],11:[function(require,module,exports){
"use strict";
var globe = require("./global");
exports.test = function () {
    return  globe.setImmediate;
};

exports.install = function (handle) {
    return globe.setTimeout.bind(globe, handle, 0);
};

},{"./global":6}],12:[function(require,module,exports){
"use strict";
var globe = require("./global");
exports.test = function () {
    return "document" in globe && "onreadystatechange" in globe.document.createElement("script");
};

exports.install = function (handle) {
    return function () {

        // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
        // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
        var scriptEl = globe.document.createElement("script");
        scriptEl.onreadystatechange = function () {
            handle();

            scriptEl.onreadystatechange = null;
            scriptEl.parentNode.removeChild(scriptEl);
            scriptEl = null;
        };
        globe.document.documentElement.appendChild(scriptEl);

        return handle;
    };
};
},{"./global":6}],13:[function(require,module,exports){
"use strict";
exports.test = function () {
    return true;
};

exports.install = function (t) {
    return function () {
        setTimeout(t, 0);
    };
};
},{}],14:[function(require,module,exports){
'use strict';

exports.collate = function (a, b) {
  a = exports.normalizeKey(a);
  b = exports.normalizeKey(b);
  var ai = collationIndex(a);
  var bi = collationIndex(b);
  if ((ai - bi) !== 0) {
    return ai - bi;
  }
  if (a === null) {
    return 0;
  }
  if (typeof a === 'number') {
    return a - b;
  }
  if (typeof a === 'boolean') {
    return a === b ? 0 : (a < b ? -1 : 1);
  }
  if (typeof a === 'string') {
    return stringCollate(a, b);
  }
  if (Array.isArray(a)) {
    return arrayCollate(a, b);
  }
  if (typeof a === 'object') {
    return objectCollate(a, b);
  }
}

// couch considers null/NaN/Infinity/-Infinity === undefined,
// for the purposes of mapreduce indexes. also, dates get stringified.
exports.normalizeKey = function (key) {
  if (typeof key === 'undefined') {
    return null;
  } else if (typeof key === 'number') {
    if (key === Infinity || key === -Infinity || isNaN(key)) {
      return null;
    }
  } else if (key instanceof Date) {
    return key.toJSON();
  }
  return key;
}

function arrayCollate(a, b) {
  var len = Math.min(a.length, b.length);
  for (var i = 0; i < len; i++) {
    var sort = exports.collate(a[i], b[i]);
    if (sort !== 0) {
      return sort;
    }
  }
  return (a.length === b.length) ? 0 :
    (a.length > b.length) ? 1 : -1;
}
function stringCollate(a, b) {
  // See: https://github.com/daleharvey/pouchdb/issues/40
  // This is incompatible with the CouchDB implementation, but its the
  // best we can do for now
  return (a === b) ? 0 : ((a > b) ? 1 : -1);
}
function objectCollate(a, b) {
  var ak = Object.keys(a), bk = Object.keys(b);
  var len = Math.min(ak.length, bk.length);
  for (var i = 0; i < len; i++) {
    // First sort the keys
    var sort = exports.collate(ak[i], bk[i]);
    if (sort !== 0) {
      return sort;
    }
    // if the keys are equal sort the values
    sort = exports.collate(a[ak[i]], b[bk[i]]);
    if (sort !== 0) {
      return sort;
    }

  }
  return (ak.length === bk.length) ? 0 :
    (ak.length > bk.length) ? 1 : -1;
}
// The collation is defined by erlangs ordered terms
// the atoms null, true, false come first, then numbers, strings,
// arrays, then objects
// null/undefined/NaN/Infinity/-Infinity are all considered null
function collationIndex(x) {
  var id = ['boolean', 'number', 'string', 'object'];
  if (id.indexOf(typeof x) !== -1) {
    if (x === null) {
      return 1;
    }
    return id.indexOf(typeof x) + 2;
  }
  if (Array.isArray(x)) {
    return 4.5;
  }
}

},{}]},{},[2])
(2)
});
;