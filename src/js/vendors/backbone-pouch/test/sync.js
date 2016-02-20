var test = require('tap').test
var Backbone = require('backbone')
var PouchDB = require('pouchdb')
var BackbonePouch = require('../backbone-pouch.js')

Backbone.sync = BackbonePouch.sync({
  db: PouchDB('_test_db')
})

var Model = Backbone.Model.extend({
  idAttribute: '_id'
})

test('create', function(t) {
  var model = new Model()

  model.save({}, {
    success: function(model) {
      t.ok(model.id, 'should have an id')
      t.ok(!model.isNew(), 'should have been persisted')
      t.ok(model.get('_rev'), 'should have a revision')

      t.end()
    }
  })
})

test('update', function(t) {
  var model = new Model({ foo: 'bar' })

  model.save({}, {
    success: function(model) {
      var firstRev = model.get('_rev')

      model.save({ foo: 'foobar' }, {
        success: function(model) {
          t.notEqual(model.get('_rev'), firstRev, 'should have a different revision')
          t.equal(model.get('foo'), 'foobar', 'should have updated foo')

          t.end()
        }
      })
    }
  })
})

test('remove', function(t) {
  var model = new Model({ foo: 'bar' })

  model.on('destroy', function() {
    t.ok(true, 'should have received destroy event')

    t.end()
  })
  model.save({}, {
    success: function(model) {
      model.destroy({
        wait: true
      })
    }
  })
})

test('allDocs', function(t) {
  var Collection = Backbone.Collection.extend({
    model: Model,
    pouch: {
      options: {
        allDocs: {
          include_docs: true
        }
      }
    },
    parse: function(result) {
      return result.rows.map(function(row) {
        return row.doc
      })
    }
  })

  var collection = new Collection()
  var model = new collection.model()

  model.save({ foo: 'allDocs' }, {
    success: function(model) {
      var id = model.id
      var rev = model.get('_rev')

      collection.fetch({
        success: function() {
          t.ok(collection.length > 0, 'There should be at least one doc')
          t.ok(collection.get(id), 'model included')
          t.equal(collection.get(id).get('_rev'), rev, 'model should have correct _rev attribute')
          t.equal(collection.get(id).get('foo'), 'allDocs', 'model should have correct foo attribute')

          t.end()
        }
      })
    }
  })
})

test('query', function(t) {
  var Collection = Backbone.Collection.extend({
    model: Model,
    pouch: {
      fetch: 'query',
      options: {
        query: {
          include_docs: true,
          fun: {
            map: function(doc) {
              emit(doc._id, null)
            }
          }
        }
      }
    },
    parse: function(result) {
      return result.rows.map(function(row) {
        return row.doc
      })
    }
  })

  var collection = new Collection()
  var model = new collection.model()

  model.save({ foo: 'query' }, {
    success: function(model) {
      var id = model.id
      var rev = model.get('_rev')

      collection.fetch({
        success: function() {
          t.ok(collection.length > 0, 'There should be at least one doc')
          t.ok(collection.get(id), 'model included')
          t.equal(collection.get(id).get('_rev'), rev, 'model should have correct _rev attribute')
          t.equal(collection.get(id).get('foo'), 'query', 'model should have correct foo attribute')

          t.end()
        }
      })
    }
  })
})
