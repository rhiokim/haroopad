var test = require('tap').test
var Backbone = require('backbone')
var PouchDB = require('pouchdb')
var BackbonePouch = require('../backbone-pouch.js')

Backbone.sync = BackbonePouch.sync({
  db: PouchDB('_test_db')
})


test('empty attachments', function(t) {
  var Model = Backbone.Model.extend(BackbonePouch.attachments())
  var model = new Model()
  
  t.equal(model.attachments().length, 0, 'attachments should be empty')

  t.end()
})

test('attachments with attachment', function(t) {
  var Model = Backbone.Model.extend(BackbonePouch.attachments())
  var model = new Model({
    _attachments: {
      myfile: {}
    }
  })
  
  t.equal(model.attachments().length, 1, 'attachments should have one entry')
  t.equal(model.attachments()[0], 'myfile', 'attachments should have "myfile" entry')

  t.end()
})

test('attachments filtered by string', function(t) {
  var Model = Backbone.Model.extend(BackbonePouch.attachments())
  var model = new Model({
    _attachments: {
      animage: {
        content_type: 'image/png'
      },
      otherimage: {
        content_type: 'image/jpg'
      },
      otherfile: {
        content_type: 'text/plain'
      }
    }
  })
  
  t.equal(model.attachments().length, 3, 'attachments should have three entries')
  t.equal(model.attachments('image').length, 2, 'attachments should have two image entries')
  t.ok(model.attachments('image').indexOf('animage') > -1, 'attachments should have animage')
  t.ok(model.attachments('image').indexOf('otherimage') > -1, 'attachments should have otherimage')

  t.end()
})

test('attachments filtered by regexp', function(t) {
  var Model = Backbone.Model.extend(BackbonePouch.attachments())
  var model = new Model({
    _attachments: {
      animage: {
        content_type: 'image/png'
      },
      otherimage: {
        content_type: 'image/jpg'
      },
      otherfile: {
        content_type: 'text/plain'
      }
    }
  })
  
  var regexp = /image\/png/

  t.equal(model.attachments().length, 3, 'attachments should have three entries')
  t.equal(model.attachments(regexp).length, 1, 'attachments should have one image entry')
  t.ok(model.attachments(regexp).indexOf('animage') > -1, 'attachments should have animage')

  t.end()
})

test('attachments filtered by function', function(t) {
  var Model = Backbone.Model.extend(BackbonePouch.attachments())
  var model = new Model({
    _attachments: {
      animage: {
        content_type: 'image/png'
      },
      otherimage: {
        content_type: 'image/jpg'
      },
      otherfile: {
        content_type: 'text/plain'
      }
    }
  })
  
  function filter(name, att) {
    return name.match('image') &&
      att.content_type.match('image')
  }

  t.equal(model.attachments().length, 3, 'attachments should have three entries')
  t.equal(model.attachments(filter).length, 2, 'attachments should have two image entries')
  t.ok(model.attachments(filter).indexOf('animage') > -1, 'attachments should have animage')
  t.ok(model.attachments(filter).indexOf('otherimage') > -1, 'attachments should have otherimage')

  t.end()
})

test('standalone attachment', function(t) {
  var Model = Backbone.Model.extend(BackbonePouch.attachments()).extend({
    idAttribute: '_id'
  })
  var model = new Model({
    _attachments: {
      myfile: {
        content_type: 'text/plain',
        data: new Buffer('Hello World!').toString('base64')
      }
    }
  })
  
  model.save({}, {
    success: function(model) {
      t.ok(model.id, 'should have an id')
      t.ok(model.get('_rev'), 'should have a revision')

      model.attachment('myfile', function(err, data) {
        t.ok(!err, 'no error should have been occured')
        t.ok(data, 'data returned')
        t.equal(data.toString(), 'Hello World!')

        t.end()
      })
    }
  })
})

// FIXME
// test('create', function(t) {
//   var Model = Backbone.Model.extend(BackbonePouch.attachments()).extend({
//     idAttribute: '_id'
//   })
//   var model = new Model()
//   
//   model.attach(new Buffer('Hello World!'), 'myfile', 'text/plain', function(err) {
//     t.ok(!err, 'no error should have been occured')
//     t.ok(model.id, 'should have an id')
//     t.ok(!model.isNew(), 'should have been persisted')
//     t.ok(model.get('_rev'), 'should have a revision')
//     t.ok(model.get('_attachments') && model.get('_attachments').myfile, 'should have a myfile attachment')
//
//     t.end()
//   })
// })

// FIXME
// test('update', function(t) {
//   var Model = Backbone.Model.extend(BackbonePouch.attachments()).extend({
//     idAttribute: '_id'
//   })
//   var model = new Model({ _id: 'mydoc' })
//   
//   model.attach(new Buffer('Hello World!'), 'myfile', 'text/plain', function(err) {
//     t.ok(!err, 'no error should have been occured')
//     t.equal(model.id, 'mydoc', 'should have id mydoc')
//     t.ok(!model.isNew(), 'should have been persisted')
//     t.ok(model.get('_rev'), 'should have a revision')
//     t.ok(model.get('_attachments') && model.get('_attachments').myfile, 'should have a myfile attachment')
//
//     t.end()
//   })
// })
