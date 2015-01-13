/*jshint expr:true */
'use strict';

var chai = require('chai');
chai.use(require("chai-as-promised"));
var deepEqual = require('deep-equal');
var inherits = require('inherits');

var vuvuzela = require('../');

//
// more variables you might want
//
var should = chai.should(); // var should = chai.should();

function testUsingObject(obj) {
  var asString = vuvuzela.stringify(obj);
  var asJsonString = JSON.stringify(obj);

  var v2vObject = vuvuzela.parse(asString);
  var j2vObject = vuvuzela.parse(asJsonString);
  var v2jObject = JSON.parse(asString);

  // if the object doesn't equal itself
  // after JSON conversion, don't test the obj itself
  if (deepEqual(obj, JSON.parse(JSON.stringify(obj)))) {
    obj.should.deep.equal(v2vObject);
  }
  v2vObject.should.deep.equal(j2vObject);
  j2vObject.should.deep.equal(v2jObject);
}

function testUsingStringForDeeplyNested(str) {
  // can't actually use JSON.parse/JSON.stringify here,
  // because it fails! :P

  var parsed = vuvuzela.parse(str);
  var stringified = vuvuzela.stringify(parsed);
  vuvuzela.parse(stringified);

  // can't compare objects; we get a max call stack error. :)
  str.should.equal(stringified);
}

function tests() {

  describe('basic tests', function () {

    var basicObjects = require('./basic');

    basicObjects.forEach(function (obj) {
      it('test: ' + JSON.stringify(obj), function () {
        testUsingObject(obj);
      });
    });
  });

  describe('whitespace tests', function () {
    it('test spaces ', function () {
      vuvuzela.parse('{"foo"\t:\t:   "bar"}').should.deep.equal({"foo": "bar"});
    });
    it('test tabs ', function () {
      vuvuzela.parse('{"foo"\t:\t:"bar"}').should.deep.equal({"foo": "bar"});
    });
    it('test newlines ', function () {
      vuvuzela.parse('{"foo"\n\n:\n:"bar"}').should.deep.equal({"foo": "bar"});
    });
    it('test newlines + tabs', function () {
      vuvuzela.parse('{\t"foo"\n\n\t:\n\n\t"bar"}').should.deep.equal({"foo": "bar"});
    });
  });

  describe('hasOwnProperty tests', function () {
    it('test hasOwnProperty', function () {
      function Foo() {
      }
      Foo.prototype.bar = 'baz';

      function SubFoo() {
      }

      inherits(SubFoo, Foo);

      var o = new SubFoo();
      o.prop = 'exists';

      var converted = vuvuzela.parse(vuvuzela.stringify(o));
      converted.should.deep.equal({prop: 'exists'});
    });
  });

  describe('invalid json test', function () {
    it('throws error if invalid json', function () {
      try {
        vuvuzela.parse('badjson');
        should.not.exist({}, 'expected to fail');
      } catch (err) {
        should.exist(err);
      }
    });
  });

  describe('advanced tests', function () {

    var advancedObjects = require('./advanced');

    Object.keys(advancedObjects).forEach(function (key) {
      var obj = advancedObjects[key];
      it('test: ' + key, function () {
        testUsingObject(obj);
      });
    });
  });

  describe('deeply nested tests', function () {

    var deeplyNested = require('./deeply-nested');

    deeplyNested.forEach(function (str, i) {
      it('test: ' + i, function () {
        console.log('string is: ' + i);
        testUsingStringForDeeplyNested(str);
      });
    });
  });
}

tests();
