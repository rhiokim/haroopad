// run with: node delete.js

// Benchmarks different deletion strategies (for deleting many keys)

var assert = require('assert'),
    bench = require('bench')

var NUM_KEYS = 1e3

exports.compare = {
  'binary delete': function() {
    deleteKeys(binaryDelete)
  },
  'linear delete': function() {
    deleteKeys(linearDelete)
  },
}

bench.runMain()

function deleteKeys(deleteFn) {
  var keys = [], i, key
  for (i = 0; i < NUM_KEYS; i++) {
    keys.push(Math.random().toString(36).slice(2))
  }
  keys.sort()
  for (i = 0; i < NUM_KEYS; i++) {
    key = keys[Math.round(Math.random() * (keys.length - 1))]
    deleteFn(keys, key)
  }
  assert.equal(keys.length, 0)
}

// Reflects the key deletion strategy added in #2078b40cd
function binaryDelete(keys, key) {
  var ix = sortedIndexOf(keys, key)
  if (keys[ix] == key)
    keys.splice(ix, 1)
}

// Reflects the key deletion strategy prior to #2078b40cd
function linearDelete(keys, key) {
  for (var i = 0; i < keys.length; i++) {
    if (keys[i] == key) {
      keys.splice(i, 1)
      break
    }
  }
}

function sortedIndexOf(arr, item) {
  var low = 0, high = arr.length, mid
  while (low < high) {
    mid = (low + high) >>> 1
    arr[mid] < item ? low = mid + 1 : high = mid
  }
  return low
}
