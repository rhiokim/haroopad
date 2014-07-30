var util              = require('util')
  , AbstractLevelDOWN = require('abstract-leveldown').AbstractLevelDOWN
  , AbstractIterator  = require('abstract-leveldown').AbstractIterator
  , noop              = function () {}
  , setImmediate      = global.setImmediate || process.nextTick

function ldIterator (db, options) {


  AbstractIterator.call(this, db)
  var emptybuffer = new Buffer(0)

  this._dbsize = this.db.container.length();
  this._reverse = !!options.reverse
  
  // Test for empty buffer in end
  if(options.end instanceof Buffer){
    if(options.end.length = 0)
      this._end = this.db.container.key(this._dbsize - 1)
  }else{  
    this._end = options.end
  }

  this._limit   = options.limit
  this._count   = 0

  if (options.start) {
    // if pos is more than the size of the database then set pos to the end               
    var found = false;
    for (var i = 0; i < this._dbsize; i++) {
      if (this.db.container.key(i) >= options.start) {
          this._pos = i
          //Make sure we step back for mid values e.g 49.5 test
          if(this._reverse){
            if(this.db.container.key(i) > options.start){
              this._pos = i -1          
            }else{
              this._pos = i
            }
          }
        found = true;
        break

      }
    }
    if(!found){
      this._pos = this._reverse ? this._dbsize - 1 : -1   
    }

  } else {
    this._pos = this._reverse ? this._dbsize - 1 : 0
  }
}

util.inherits(ldIterator, AbstractIterator)

ldIterator.prototype._next = function (callback) {
	
  if (this._pos >= this.db.container.length() || this._pos < 0)
    return setImmediate(callback)
  var key   = this.db.container.key(this._pos)
    , value

  if (!!this._end && (this._reverse ? key < this._end : key > this._end))
    return setImmediate(callback)


  if (!!this._limit && this._limit > 0 && this._count++ >= this._limit)
    return setImmediate(callback)

  value = this.db.container.getItem(key) 
  this._pos += this._reverse ? -1 : 1

  setImmediate(callback.bind(null, undefined, key, value))
}

function ld (location) {
  if (!(this instanceof ld)) return new ld(location)
  AbstractLevelDOWN.call(this, location)
  var wstore = require('./localstorage').localStorage;
  this.container = new wstore(location);
}		

util.inherits(ld, AbstractLevelDOWN)

ld.prototype._open = function (options, callback) {
  setImmediate(function () { callback(null, this) }.bind(this))

}

ld.prototype._put = function (key, value, options, callback) {

  var err = checkKeyValue(key, 'key')

  if (err) return callback(err)

  err = checkKeyValue(value, 'value')

  if (err) return callback(err)

  if(typeof value == 'object' && !Buffer.isBuffer(value) && value.buffer == undefined){
        var obj = {};
        obj.storetype = "json";
        obj.data = value; 
        value = JSON.stringify(obj)
  } 

  this.container.setItem(key, value);
  setImmediate(callback)
}

ld.prototype._get = function (key, options, callback) {

  var err = checkKeyValue(key, 'key')

  if (err) return callback(err)
  
  if (!isBuffer(key)){
    key = String(key)
  }
  var value = this.container.getItem(key);

  if (value === undefined) {
    // 'NotFound' error, consistent with LevelDOWN API
    return setImmediate(function () { callback(new Error('NotFound: ')) })
  }

  
  if (options.asBuffer !== false && !Buffer.isBuffer(value)){
    value = new Buffer(String(value))
  }


  if(options.asBuffer === false){
    if(value.indexOf("{\"storetype\":\"json\",\"data\"") > -1){
      var res = JSON.parse(value);
      value = res.data;
    }
  }

  setImmediate(function () {
    callback(null, value)
  })
}

ld.prototype._del = function (key, options, callback) {
  
  var err = checkKeyValue(key, 'key')

  if (err) return callback(err)
  if (!isBuffer(key)) key = String(key)

  this.container.removeItem(key); 
  setImmediate(callback)
}

ld.prototype._batch = function (array, options, callback) {
  var err
    , i = 0
    , key 
    , value
  if (Array.isArray(array)) {
    for (; i < array.length; i++) {
      if (array[i]) {
        key = Buffer.isBuffer(array[i].key) ? array[i].key : String(array[i].key)
        err = checkKeyValue(key, 'key')
        if (err) return setImmediate(callback.bind(null, err))
        if (array[i].type === 'del') {
          this._del(array[i].key, options, noop)
        } else if (array[i].type === 'put') {
          value = Buffer.isBuffer(array[i].value) ? array[i].value : String(array[i].value)
          err = checkKeyValue(value, 'value')
          if (err) return setImmediate(callback.bind(null, err))
          this._put(key, value, options, noop)
        }
      }
    }
  }
  setImmediate(callback)
}

ld.prototype._iterator = function (options) {
  return new ldIterator(this, options)
}

ld.destroy = function (name, callback) {
  try {
    Object.keys(localStorage)
      .forEach(function (key) {
        if (key.substring(0, name.length + 1) == (name + "!")) {
          localStorage.removeItem(key)
        }
      })
    callback()
  } catch (e) {
    // fail gracefully if no localStorage
  }
}


function subarray(start, end) {
  return this.slice(start, end)
}
 
function set_(array, offset) {
  
  if (arguments.length < 2) offset = 0
  
  for (var i = 0, n = array.length; i < n; ++i, ++offset)
    this[offset] = array[i] & 0xFF
}
 
// we need typed arrays
function TypedArray(arg1) {
var result;
  if (typeof arg1 === "number") {
    result = new Array(arg1);
    
    for (var i = 0; i < arg1; ++i)
        result[i] = 0;
  } else
    result = arg1.slice(0)

    result.subarray = subarray
    result.buffer = result
    result.byteLength = result.length
    result.set = set_
   
  
  
  if (typeof arg1 === "object" && arg1.buffer)
    result.buffer = arg1.buffer
   
  return result

}

/*
if(!window.Uint8Array){ 
  window.Uint8Array = TypedArray;
  window.Uint16Array = TypedArray;
  window.Uint32Array = TypedArray;
  window.Int32Array = TypedArray;
}
*/
function isBuffer(buf) {
  return buf instanceof ArrayBuffer
}

function checkKeyValue (obj, type) {
  if (obj === null || obj === undefined)
    return new Error(type + ' cannot be `null` or `undefined`')
  if (obj === null || obj === undefined)
    return new Error(type + ' cannot be `null` or `undefined`')
  
  if(type === 'key'){
    
    if(obj instanceof Boolean){
      return new Error(type + ' cannot be `null` or `undefined`')    
    }
    if(obj === ''){
      return new Error(type + ' cannot be empty')
    }
/*
    if(isBuffer(obj)) {
      
      return new Error(type + 'cannot be an empty Buffer')
    }*/
  }
  if(obj.toString().indexOf("[object ArrayBuffer]") == 0){
      if(obj.byteLength == 0 || obj.byteLength == undefined){
        return new Error(type + ' cannot be an empty Buffer') 
      }  
  } 
  
  /*if(obj.toString().indexOf("[object Uint8Array]") == 0){
      if(obj.byteLength == 0 || obj.byteLength == undefined){
        return new Error(type + ' cannot be an empty ArrayBuffer') 
      }  
  } */
  if (isBuffer(obj)) {
    
    
    if (obj.length === 0)
      return new Error(type + ' cannot be an empty Buffer')
  } else if (String(obj) === '')
    return new Error(type + ' cannot be an empty String')
}



module.exports = ld
