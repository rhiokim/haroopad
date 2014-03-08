'use strict';

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

exports.attachments = {
  'empty': function(test) {
    var Model = backbone.Model.extend(backbone_pouch.attachments());
    var model = new Model();
    test.expect(1);
    test.equal(model.attachments().length, 0, 'attachments should be empty.');
    test.done();
  },
  'with attachment': function(test) {
    var Model = backbone.Model.extend(backbone_pouch.attachments());
    var model = new Model({
      _attachments: {
        myfile: {}
      }
    });
    test.expect(2);
    test.equal(model.attachments().length, 1, 'attachments should have one entry.');
    test.equal(model.attachments()[0], 'myfile', 'attachments should have "myfile" entry.');
    test.done();
  },
  'filtered with string': function(test) {
    var Model = backbone.Model.extend(backbone_pouch.attachments());
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
    });
    test.expect(4);
    test.equal(model.attachments().length, 3, 'attachments should have three entries.');
    test.equal(model.attachments('image').length, 2, 'attachments should have two image entries.');
    test.ok(model.attachments('image').indexOf('animage') > -1, 'attachments should have animage.');
    test.ok(model.attachments('image').indexOf('otherimage') > -1, 'attachments should have otherimage.');
    test.done();
  },
  'filtered with regexp': function(test) {
    var Model = backbone.Model.extend(backbone_pouch.attachments());
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
    });
    test.expect(3);
    var regexp = /image\/png/;
    test.equal(model.attachments().length, 3, 'attachments should have three entries.');
    test.equal(model.attachments(regexp).length, 1, 'attachments should have one image entry.');
    test.ok(model.attachments(regexp).indexOf('animage') > -1, 'attachments should have animage.');
    test.done();
  },
  'filtered with function': function(test) {
    var Model = backbone.Model.extend(backbone_pouch.attachments());
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
    });
    test.expect(4);
    function filter(name, att) {
      return name.match('image') &&
        att.content_type.match('image');
    }
    test.equal(model.attachments().length, 3, 'attachments should have three entries.');
    test.equal(model.attachments(filter).length, 2, 'attachments should have two image entries.');
    test.ok(model.attachments(filter).indexOf('animage') > -1, 'attachments should have animage.');
    test.ok(model.attachments(filter).indexOf('otherimage') > -1, 'attachments should have otherimage.');
    test.done();
  },
};

exports.attachment = {
  setUp: function(done) {
    this.Model = backbone.Model.extend(backbone_pouch.attachments()).extend({
      idAttribute: '_id'
    });
    done();
  },
  standalone: function(test) {
    var model = new this.Model({
      _attachments: {
        myfile: {
          content_type: 'text/plain',
          data: new Buffer('Hello World!').toString('base64')
        }
      }
    });
    test.expect(5);
    model.save({}, {
      success: function(model) {
        test.ok(model.id, 'should have an id.');
        test.ok(model.get('_rev'), 'should have a revision.');
        model.attachment('myfile', function(err, data) {
          test.ok(!err, 'no error should have been occured.');
          test.ok(data, 'data returned.');
          test.equal(data.toString(), 'Hello World!');
          test.done();
        });
      }
    });
  }
};

exports.attach = {
  setUp: function(done) {
    this.Model = backbone.Model.extend(backbone_pouch.attachments()).extend({
      idAttribute: '_id'
    });
    done();
  },
  create: function(test) {
    var model = new this.Model();
    test.expect(5);
    model.attach(new Buffer('Hello World!'), 'myfile', 'text/plain', function(err) {
      test.ok(!err, 'no error should have been occured.');
      test.ok(model.id, 'should have an id.');
      test.ok(!model.isNew(), 'should have been persisted.');
      test.ok(model.get('_rev'), 'should have a revision.');
      test.ok(model.get('_attachments').myfile, 'should have a myfile attachment.');
      test.done();
    });
  },
  update: function(test) {
    var model = new this.Model({ _id: 'mydoc' });
    test.expect(5);
    model.attach(new Buffer('Hello World!'), 'myfile', 'text/plain', function(err) {
      test.ok(!err, 'no error should have been occured.');
      test.equal(model.id, 'mydoc', 'should have id mydoc.');
      test.ok(!model.isNew(), 'should have been persisted.');
      test.ok(model.get('_rev'), 'should have a revision.');
      test.ok(model.get('_attachments').myfile, 'should have a myfile attachment.');
      test.done();
    });
  }
};
