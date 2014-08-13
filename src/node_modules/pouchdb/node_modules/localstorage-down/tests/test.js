var tape   = require('tape')
  , leveldown = require('../')
  , factory = function (location) {

      return new leveldown(location)  
    }
  , testCommon = require('./testCommon')
  , testBuffer = new Uint8Array('hello'.split('').map(function(c) {
	      return c.charCodeAt(0);
	  }));
  

//testBuffer[0] = '☃'

require('abstract-leveldown/abstract/leveldown-test').args(factory, tape)
require('abstract-leveldown/abstract/open-test').args(factory, tape, testCommon)
require('abstract-leveldown/abstract/del-test').all(factory, tape, testCommon)
require('abstract-leveldown/abstract/put-test').all(factory, tape, testCommon)
require('abstract-leveldown/abstract/get-test').all(factory, tape, testCommon)
require('abstract-leveldown/abstract/put-get-del-test').all(factory, tape, testCommon, testBuffer)
require('abstract-leveldown/abstract/close-test').close(factory, tape, testCommon)
require('abstract-leveldown/abstract/iterator-test').all(factory, tape, testCommon)

require('abstract-leveldown/abstract/chained-batch-test').all(factory, tape, testCommon)
require('abstract-leveldown/abstract/approximate-size-test').setUp(factory, tape, testCommon)
require('abstract-leveldown/abstract/approximate-size-test').args(factory, tape, testCommon)

require('./custom-tests.js').all(leveldown, tape, testCommon)


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

if(!window.Uint8Array){ 
   window.Uint8Array = TypedArray;
   window.Uint32Array = TypedArray;
   window.Int32Array = TypedArray;
}
