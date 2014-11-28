var inherits          = require('inherits')
  , AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
  , AbstractIterator  = require('abstract-leveldown').AbstractIterator
  , ltgt              = require('ltgt')
  , setImmediate      = global.setImmediate || process.nextTick
  , createRBT = require('functional-red-black-tree')
  , globalStore       = {}

function toKey (key) {
  return typeof key == 'string' ? '$' + key : JSON.stringify(key)
}

function gt(value) {
  return value > this._end
}

function gte(value) {
  return value >= this._end
}

function lt(value) {
  return value < this._end
}

function lte(value) {
  return value <= this._end
}


function MemIterator (db, options) {
  AbstractIterator.call(this, db)
  this._limit   = options.limit

  if (this._limit === -1)
    this._limit = Infinity

  var tree = db._store[db._location];

  this.keyAsBuffer = options.keyAsBuffer !== false
  this.valueAsBuffer = options.valueAsBuffer !== false
  this._reverse   = options.reverse
  this._options = options
  this._done = 0
  
  if (!this._reverse) {
    this._incr = 'next';
    this._start = ltgt.lowerBound(options);
    this._end = ltgt.upperBound(options)
    
    if (typeof this._start === 'undefined')
      this._tree = tree.begin;
    else if (ltgt.lowerBoundInclusive(options))
      this._tree = tree.ge(this._start);
    else
      this._tree = tree.gt(this._start);
    
    if (this._end) {
      if (ltgt.upperBoundInclusive(options))
        this._test = lte
      else
        this._test = lt
    }
  
  } else {
    this._incr = 'prev';
    this._start = ltgt.upperBound(options)
    this._end = ltgt.lowerBound(options)
  
    if (typeof this._start === 'undefined')
      this._tree = tree.end;
    else if (ltgt.upperBoundInclusive(options))
      this._tree = tree.le(this._start)
    else
      this._tree = tree.lt(this._start)
  
    if (this._end) {
      if (ltgt.lowerBoundInclusive(options))
        this._test = gte
      else
        this._test = gt
    }

  }

}

inherits(MemIterator, AbstractIterator)

MemIterator.prototype._next = function (callback) {
  var key
    , value

  if (this._done++ >= this._limit)
    return setImmediate(callback)

  if (!this._tree.valid)
    return setImmediate(callback)

  key = this._tree.key
  value = this._tree.value

  if (!this._test(key))
    return setImmediate(callback)

  if (this.keyAsBuffer)
    key = new Buffer(key)

  if (this.valueAsBuffer)
    value = new Buffer(value)

  this._tree[this._incr]()

  setImmediate(function callNext() {
    callback(null, key, value)
  })
}

MemIterator.prototype._test = function () {return true}

function MemDOWN (location) {
  if (!(this instanceof MemDOWN))
    return new MemDOWN(location)

  AbstractLevelDOWN.call(this, typeof location == 'string' ? location : '')

  this._location = this.location ? toKey(this.location) : '_tree'
  this._store = this.location ? globalStore: this
  this._store[this._location] = this._store[this._location] || createRBT()
}

inherits(MemDOWN, AbstractLevelDOWN)

MemDOWN.prototype._open = function (options, callback) {
  var self = this
  setImmediate(function callNext() { callback(null, self) })
}

MemDOWN.prototype._put = function (key, value, options, callback) {
  this._store[this._location] = this._store[this._location].remove(key).insert(key, value)
  setImmediate(callback)
}

MemDOWN.prototype._get = function (key, options, callback) {
  var value = this._store[this._location].get(key)

  if (value === undefined) {
    // 'NotFound' error, consistent with LevelDOWN API
    var err = new Error('NotFound')
    return setImmediate(function callNext() { callback(err) })
  }

  if (options.asBuffer !== false && !this._isBuffer(value))
    value = new Buffer(String(value))
  
  setImmediate(function callNext () {
    callback(null, value)
  })

}

MemDOWN.prototype._del = function (key, options, callback) {
  this._store[this._location] = this._store[this._location].remove(key)
  setImmediate(callback)
}

MemDOWN.prototype._batch = function (array, options, callback) {
  var err
    , i = -1
    , key
    , value
    , len = array.length
    , tree = this._store[this._location]

  while (++i < len) {
    if (!array[i])
      continue;
    
    key = this._isBuffer(array[i].key) ? array[i].key : String(array[i].key)
    err = this._checkKey(key, 'key')
    if (err)
      return setImmediate(function errorCall() { callback(err) })
    
    tree = tree.remove(array[i].key)
    // we always remove as insert doesn't replace

    if (array[i].type === 'put') {

      value = this._isBuffer(array[i].value) ? array[i].value : String(array[i].value)
      err = this._checkKey(value, 'value')

      if (err)
        return setImmediate(function errorCall() { callback(err) })

      tree = tree.insert(key, value)
    }
  
  }
  
  this._store[this._location] = tree;

  setImmediate(callback)
}

MemDOWN.prototype._iterator = function (options) {
  return new MemIterator(this, options)
}

MemDOWN.prototype._isBuffer = function (obj) {
  return Buffer.isBuffer(obj)
}

MemDOWN.destroy = function (name, callback) {
  var key = toKey(name)

  if (key in globalStore)
    delete globalStore[key]

  setImmediate(callback)
}

module.exports = MemDOWN
