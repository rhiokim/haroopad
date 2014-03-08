'use strict';

var _ = require('underscore');
var backbone = require('backbone');
var pouch = require('pouchdb');
var backbone_pouch = require('../lib/backbone-pouch.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

backbone.sync = backbone_pouch.sync({
  db: pouch('_test_db')
});

exports.sync = {
  setUp: function(done) {
    this.Model = backbone.Model.extend({
      idAttribute: '_id'
    });
    done();
  },
  create: function(test) {
    var model = new this.Model();
    test.expect(3);
    model.save({}, {
      success: function(model) {
        test.ok(model.id, 'should have an id.');
        test.ok(!model.isNew(), 'should have been persisted.');
        test.ok(model.get('_rev'), 'should have a revision.');
        test.done();
      }
    });
  },
  update: function(test) {
    var model = new this.Model({ foo: 'bar' });
    test.expect(2);
    model.save({}, {
      success: function(model) {
        var firstRev = model.get('_rev');
        model.save({ foo: 'foobar' }, {
          success: function(model) {
            test.notEqual(model.get('_rev'), firstRev, 'should have a different revision.');
            test.equal(model.get('foo'), 'foobar', 'should have updated foo.');
            test.done();
          }
        });
      }
    });
  },
  remove: function(test) {
    var model = new this.Model({ foo: 'bar' });
    test.expect(1);
    model.on('destroy', function() {
      test.ok(true, 'should have received destroy event');
      test.done();
    });
    model.save({}, {
      success: function(model) {
        model.destroy({
          wait: true
        });
      }
    });
  },
  allDocs: function(test) {
    var Collection = backbone.Collection.extend({
      model: this.Model,
      pouch: {
        options: {
          allDocs: {
            include_docs: true
          }
        }
      },
      parse: function(result) {
        return _.pluck(result.rows, 'doc');
      }
    });
    var collection = new Collection();
    var model = new collection.model();
    test.expect(4);
    model.save({ foo: 'allDocs' }, {
      success: function(model) {
        var id = model.id;
        var rev = model.get('_rev');
        collection.fetch({
          success: function() {
            test.ok(collection.length > 0, 'There should be at least one doc');
            test.ok(collection.get(id), 'model included');
            test.equal(collection.get(id).get('_rev'), rev, 'model should have correct _rev attribute');
            test.equal(collection.get(id).get('foo'), 'allDocs', 'model should have correct foo attribute');
            test.done();
          }
        });
      }
    });
  },
  query: function(test) {
    var Collection = backbone.Collection.extend({
      model: this.Model,
      pouch: {
        fetch: 'query',
        options: {
          query: {
            include_docs: true,
            fun: {
              map: function(doc) {
                emit(doc._id, null);
              }
            }
          }
        }
      },
      parse: function(result) {
        return _.pluck(result.rows, 'doc');
      }
    });
    var collection = new Collection();
    var model = new collection.model();
    test.expect(4);
    model.save({ foo: 'query' }, {
      success: function(model) {
        var id = model.id;
        var rev = model.get('_rev');
        collection.fetch({
          success: function() {
            test.ok(collection.length > 0, 'There should be at least one doc');
            test.ok(collection.get(id), 'model included');
            test.equal(collection.get(id).get('_rev'), rev, 'model should have correct _rev attribute');
            test.equal(collection.get(id).get('foo'), 'query', 'model should have correct foo attribute');
            test.done();
          }
        });
      }
    });
  }
};
