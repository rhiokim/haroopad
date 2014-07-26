// run with: node insert.js

// Benchmarks different insertion strategies (for inserting many keys)

var assert = require('assert'),
    bench = require('bench')

var NUM_KEYS = 1e3, INSERT_EXISTING_CHANCE = 0.1

exports.compare = {
  'binary insert': function() {
    insertKeys(binaryInsert)
  },
  'push() + sort()': function() {
    insertKeys(pushAndSort)
  },
}

bench.runMain()

function insertKeys(insertFn) {
  var keys = [], keySet = {}, i, key
  for (i = 0; i < NUM_KEYS; i++) {
    // Allow a certain portion of inserts to use keys that already exist (ie, put existing)
    key = Math.random() < INSERT_EXISTING_CHANCE && keys.length ?
      keys[Math.round(Math.random() * (keys.length - 1))] : Math.random().toString(36).slice(2)
    keySet[key] = true
    insertFn(keys, key)
  }
  // Ensure all the keys are there and sorted
  assert.deepEqual(keys, Object.keys(keySet).sort())
}

// Reflects the key insertion strategy added in #2078b40cd
function binaryInsert(keys, key) {
  var ix = sortedIndexOf(keys, key)
  if (keys[ix] != key)
    keys.splice(ix, 0, key)
}

// Reflects the key insertion strategy prior to #2078b40cd
function pushAndSort(keys, key) {
  if (keys.indexOf(key) == -1) {
    keys.push(key)
    keys.sort()
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
