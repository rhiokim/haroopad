/*jshint expr:true */
'use strict';

var Pouch = require('Pouchdb');
var Mapreduce = require('../');
Pouch.plugin(Mapreduce);
var chai = require('chai');
var should = chai.should();
require("mocha-as-promised")();
chai.use(require("chai-as-promised"));
var Promise = require('bluebird');
var all = Promise.all;
describe('local', function () {
  var dbs = process.env.TEST_DB;
  if (!dbs) {
    return console.log('No db name specified');
  }
  dbs.split(',').forEach(tests);
});
function tests(dbName) {
  beforeEach(function (done) {
    new Pouch(dbName, function (err, d) {
      done();
    });
  });
  afterEach(function (done) {
    Pouch.destroy(dbName, function () {
      done();
    });
  });
  describe('views', function () {
    it("Test basic view", function () {
      return new Pouch(dbName).then(function (db) {
        
        
        
        return db.bulkDocs({docs: [
          {foo: 'bar'},
          { _id: 'volatile', foo: 'baz' }
        ]}).then(function () {
          return db.get('volatile');
        }).then(function (doc) {
          return db.remove(doc);
        }).then(function () {
          return db.query({
            map: function (doc) {
              emit(doc.foo, doc);
            }
          }, {include_docs: true, reduce: false});
        }).then(function (res) {
          res.rows.should.have.length(1, 'Dont include deleted documents');
          res.total_rows.should.equal(1, 'Include total_rows property.');
          res.rows.forEach(function (x, i) {
            should.exist(x.id);
            should.exist(x.key);
            should.exist(x.value);
            should.exist(x.value._rev);
            should.exist(x.doc);
            should.exist(x.doc._rev);
          });
        });
      });
    });
    if (dbName.slice(0, 4) !== "http") {
      it("with a closure", function () {
        return new Pouch(dbName).then(function (db) {
          
          return db.bulkDocs({docs: [
            {foo: 'bar'},
            { _id: 'volatile', foo: 'baz' }
          ]}).then(function () {
            var queryFun = (function (test) {
              return function (doc, emit) {
                if (doc._id === test) {
                  emit(doc.foo);
                }
              };
            }('volatile'));
            return db.query(queryFun, {reduce: false});
          });
        }).should.become({ 
          total_rows: 1,
          offset: 0,
          rows: [
            {
              id: 'volatile',
              key: 'baz',
              value: undefined
            }
          ]
        });
      });
    }
    it("Test passing just a function", function (done) {
      return new Pouch(dbName).then(function (db) {
        
        
        
        return db.bulkDocs({docs: [
          {foo: 'bar'},
          { _id: 'volatile', foo: 'baz' }
        ]}).then(function () {
          return db.get('volatile');
        }).then(function (doc) {
          return db.remove(doc);
        }).then(function () {
          return db.query(function (doc) {
            emit(doc.foo, doc);
          }, {include_docs: true, reduce: false});
        }).then(function (res) {
          res.rows.should.have.length(1, 'Dont include deleted documents');
          res.rows.forEach(function (x, i) {
            should.exist(x.id);
            should.exist(x.key);
            should.exist(x.value);
            should.exist(x.value._rev);
            should.exist(x.doc);
            should.exist(x.doc._rev);
          });
        });
      });
    });

    it("Test opts.startkey/opts.endkey", function () {
      var queryFun = {
        map: function (doc) {
          emit(doc.key, doc);
        }
      };
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({docs: [
          {key: 'key1'},
          {key: 'key2'},
          {key: 'key3'},
          {key: 'key4'},
          {key: 'key5'}
        ]}).then(function () {
          return db.query(queryFun, {reduce: false, startkey: 'key2'});
        }).then(function (res) {
          res.rows.should.have.length(4, 'Startkey is inclusive');
          return db.query(queryFun, {reduce: false, endkey: 'key3'});
        }).then(function (res) {
          res.rows.should.have.length(3, 'Endkey is inclusive');
          return db.query(queryFun, {
            reduce: false,
            startkey: 'key2',
            endkey: 'key3'
          });
        }).then(function (res) {
          res.rows.should.have.length(2, 'Startkey and endkey together');
          return db.query(queryFun, {
            reduce: false,
            startkey: 'key4',
            endkey: 'key4'
          });
        }).then(function (res) {
          res.rows.should.have.length(1, 'Startkey=endkey');
        });
      });
    });

    it("Test opts.key", function () {
      var queryFun = {
        map: function (doc) {
          emit(doc.key, doc);
        }
      };
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({docs: [
          {key: 'key1'},
          {key: 'key2'},
          {key: 'key3'},
          {key: 'key3'}
        ]}).then(function () {
          return db.query(queryFun, {reduce: false, key: 'key2'});
        }).then(function (res) {
          res.rows.should.have.length(1, 'Doc with key');
          return db.query(queryFun, {reduce: false, key: 'key3'});
        }).then(function (res) {
          res.rows.should.have.length(2, 'Multiple docs with key');
        });
      });
    });

    it("Test basic view collation", function () {

      var values = [];

      // special values sort before all other types
      values.push(null);
      values.push(false);
      values.push(true);

      // then numbers
      values.push(1);
      values.push(2);
      values.push(3.0);
      values.push(4);

      // then text, case sensitive
      // currently chrome uses ascii ordering and so wont handle capitals properly
      values.push("a");
      //values.push("A");
      values.push("aa");
      values.push("b");
      //values.push("B");
      values.push("ba");
      values.push("bb");

      // then arrays. compared element by element until different.
      // Longer arrays sort after their prefixes
      values.push(["a"]);
      values.push(["b"]);
      values.push(["b", "c"]);
      values.push(["b", "c", "a"]);
      values.push(["b", "d"]);
      values.push(["b", "d", "e"]);

      // then object, compares each key value in the list until different.
      // larger objects sort after their subset objects.
      values.push({a: 1});
      values.push({a: 2});
      values.push({b: 1});
      values.push({b: 2});
      values.push({b: 2, a: 1}); // Member order does matter for collation.
      // CouchDB preserves member order
      // but doesn't require that clients will.
      // (this test might fail if used with a js engine
      // that doesn't preserve order)
      values.push({b: 2, c: 2});
      var queryFun = {
        map: function (doc) {
          emit(doc.foo);
        }
      };
      return new Pouch(dbName).then(function (db) {
        
        var docs = values.map(function (x, i) {
          return {_id: (i).toString(), foo: x};
        });
        return db.bulkDocs({docs: docs}).then(function () {
          return db.query(queryFun, {reduce: false});
        }).then(function (res) {
          res.rows.forEach(function (x, i) {
            JSON.stringify(x.key).should.equal(JSON.stringify(values[i]), 'keys collate');
          });
          return db.query(queryFun, {descending: true, reduce: false});
        }).then(function (res) {
          res.rows.forEach(function (x, i) {
            JSON.stringify(x.key).should.equal(JSON.stringify(values[values.length - 1 - i]),
              'keys collate descending');
          });
        });
      });
    });

    it("Test joins", function () {
      var queryFun = {
        map: function (doc) {
          if (doc.doc_id) {
            emit(doc._id, {_id: doc.doc_id});
          }
        }
      };
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({docs: [
          {_id: 'mydoc', foo: 'bar'},
          { doc_id: 'mydoc' }
        ]}).then(function () {
          return db.query(queryFun, {include_docs: true, reduce: false});
        }).then(function (res) {
          should.exist(res.rows[0].doc);
          return res.rows[0].doc._id;
        });
      }).should.become('mydoc', 'mydoc included');
    });

    it("No reduce function", function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.post({foo: 'bar'}).then(function () {
          var queryFun = {
            map: function (doc) {
              emit('key', 'val');
            }
          };
          return db.query(queryFun);
        });
      }).should.be.fulfilled;
    });

    it("Built in _sum reduce function", function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { val: 'bar' },
            { val: 'bar' },
            { val: 'baz' }
          ]
        }).then(function () {
          var queryFun = {
            map: function (doc) {
              emit(doc.val, 1);
            },
            reduce: "_sum"
          };
          return db.query(queryFun, {reduce: true, group_level: 999});
        }).then(function (resp) {
          return resp.rows.map(function (row) {
            return row.value;
          });
        });
      }).should.become([2, 1]);
    });

    it("Built in _count reduce function", function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { val: 'bar' },
            { val: 'bar' },
            { val: 'baz' }
          ]
        }).then(function () {
          var queryFun = {
            map: function (doc) {
              emit(doc.val, doc.val);
            },
            reduce: "_count"
          };
          return db.query(queryFun, {reduce: true, group_level: 999});
        }).then(function (resp) {
          return resp.rows.map(function (row) {
            return row.value;
          });
        });
      }).should.become([2, 1]);
    });

    it("Built in _stats reduce function", function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { val: 'bar' },
            { val: 'bar' },
            { val: 'baz' },
            {
              _id: "_design/test",
              views: {
                thing: {
                  map: "function(doc){emit(doc.val, 1);}",
                  reduce: "_stats"
                }
              }
            }
          ]
        }).then(function () {
          return db.query("test/thing", {reduce: true, group_level: 999});
        }).then(function (res) {
          return res.rows[0].value;
        });
      }).should.become({
        sum: 2,
        count: 2,
        min: 1,
        max: 1,
        sumsqr: 2
      });
    });

    it("Built in _stats reduce function should throw an error with a promise", function (done) {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { val: 'bar' },
            { val: 'bar' },
            { val: 'baz' },
            {
              _id: "_design/test",
              views: {
                thing: {
                  map: "function(doc){emit(doc.val, 'lala');}",
                  reduce: "_stats"
                }
              }
            }
          ]
        }).then(function () {
          return db.query("test/thing", {reduce: true, group_level: 999});
        });
      }).should.be.rejected;
    });

    it("No reduce function, passing just a function", function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.post({foo: 'bar'}).then(function () {
          var queryFun = function (doc) {
            emit('key', 'val');
          };
          return db.query(queryFun);
        });
      }).should.be.fulfilled;
    });


    it('Views should include _conflicts', function () {
      var db2name = 'test2' + Math.random();
      var cleanup = function () {
        return Pouch.destroy(db2name).catch(function () {
          
        });
      };
      var doc1 = {_id: '1', foo: 'bar'};
      var doc2 = {_id: '1', foo: 'baz'};
      var queryFun = function (doc) {
        emit(doc._id, !!doc._conflicts);
      };
      return new Pouch(dbName).then(function (db) {
        return new Pouch(db2name).then(function (remote) {
          var replicate = Promise.promisify(db.replicate.from, db.replicate);
          return db.post(doc1).then(function () {
            return remote.post(doc2); 
          }).then(function () {
            return replicate(remote);
          }).then(function () {
            return db.get(doc1._id, {conflicts: true});
          }).then(function (res) {
            res._conflicts.should.exist;
            return db.query(queryFun);
          }).then(function (res) {
            return cleanup().then(function () {
              res.rows[0].value.should.be.true;
            });
          }, function (err) {
            return cleanup().then(function () {
              throw err;
            });
          });
        });
      });
    });

    it("Test view querying with limit option", function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { foo: 'bar' },
            { foo: 'bar' },
            { foo: 'baz' }
          ]
        }).then(function () {
          return db.query(function (doc) {
            if (doc.foo === 'bar') {
              emit(doc.foo);
            }
          }, { limit: 1 });
        }).then(function (res) {
          res.total_rows.should.equal(2, 'Correctly returns total rows');
          res.rows.should.have.length(1, 'Correctly limits returned rows');
        });
      });
    });
    it("Test view querying with limit option and reduce", function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { foo: 'bar' },
            { foo: 'bar' },
            { foo: 'baz' }
          ]
        }).then(function () {
          return db.query({
            map: function (doc) {
              emit(doc.foo);
            },
            reduce: '_count'
          }, { limit: 1, group: true, reduce: true});
        });
      }).then(function (res) {
        res.rows.should.have.length(1, 'Correctly limits returned rows');
        res.rows[0].key.should.equal('bar');
        res.rows[0].value.should.equal(2);
      });
    });
    it("Test view querying with a skip option and reduce", function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { foo: 'bar' },
            { foo: 'bar' },
            { foo: 'baz' }
          ]
        }).then(function () {
          return db.query({
            map: function (doc) {
              emit(doc.foo);
            },
            reduce: '_count'
          }, {skip: 1, group: true, reduce: true});
        });
      }).then(function (res) {
        res.rows.should.have.length(1, 'Correctly limits returned rows');
        res.rows[0].key.should.equal('baz');
        res.rows[0].value.should.equal(1);
      });
    });

    it("Query non existing view returns error", function () {
      return new Pouch(dbName).then(function (db) {
        
        var doc = {
          _id: '_design/barbar',
          views: {
            scores: {
              map: 'function(doc) { if (doc.score) { emit(null, doc.score); } }'
            }
          }
        };
        return db.post(doc).then(function () {
          return db.query('barbar/dontExist', {key: 'bar'});
        });
      }).should.be.rejected;
    });

    it("Special document member _doc_id_rev should never leak outside", function (done) {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { foo: 'bar' }
          ]
        }).then(function () {
          return db.query(function (doc) {
            if (doc.foo === 'bar') {
              emit(doc.foo);
            }
          }, { include_docs: true });
        }).then(function (res) {
          should.not.exist(res.rows[0].doc._doc_id_rev, '_doc_id_rev is leaking but should not');
        });
      });
    });

    it('If reduce function returns 0, resulting value should not be null', function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { foo: 'bar' }
          ]
        }).then(function () {
          return db.query({
            map: function (doc) {
              emit(doc.foo);
            },
            reduce: function (key, values, rereduce) {
              return 0;
            }
          }).then(function (data) {
            should.exist(data.rows[0].value);
          });
        });
      });
    });

    it('Testing skip with a view', function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            { foo: 'bar' },
            { foo: 'baz' },
            { foo: 'baf' }
          ]
        }).then(function () {
          return db.query(function (doc) {
            emit(doc.foo);
          }, {skip: 1});
        }).then(function (data) {
          data.rows.should.have.length(2);
        });
      });
    });

    it('Map documents on 0/null/undefined/empty string', function (done) {
      var mapFunction = function (doc) {
        emit(doc.num);
      };
      return new Pouch(dbName).then(function (db) {
        
        var docs = [
          {_id: '0', num: 0},
          {_id: '1', num: 1},
          {_id: 'undef' /* num is undefined */},
          {_id: 'null', num: null},
          {_id: 'empty', num: ''},
          {_id: 'nan', num: NaN},
          {_id: 'inf', num: Infinity},
          {_id: 'neginf', num: -Infinity}
        ];
        return db.bulkDocs({docs: docs}).then(function () {
          return db.query(mapFunction, {key: 0});
        }).then(function (data) {
          data.rows.should.have.length(1);
          data.rows[0].id.should.equal('0');

          return db.query(mapFunction, {key: ''});
        }).then(function (data) {
          data.rows.should.have.length(1);
          data.rows[0].id.should.equal('empty');

          return db.query(mapFunction, {key: undefined});
        }).then(function (data) {
          data.rows.should.have.length(8); // everything

          // keys that should all resolve to null
          var emptyKeys = [null, NaN, Infinity, -Infinity];
          var numDone = 0;
          return all(emptyKeys.map(function (emptyKey) {
            return db.query(mapFunction, {key: emptyKey}).then(function (data) {
              data.rows.map(function (row) {
                return row.id;
              }).should.deep.equal(['inf', 'nan', 'neginf', 'null', 'undef']);
            });
          }));
        });
      });
    });

    it('Testing query with keys', function () {
      return new Pouch(dbName).then(function (db) {
        
        var opts = {include_docs: true};
        return db.bulkDocs({
          docs: [
            {_id: 'doc_0', field: 0},
            {_id: 'doc_1', field: 1},
            {_id: 'doc_2', field: 2},
            {_id: 'doc_empty', field: ''},
            {_id: 'doc_null', field: null},
            {_id: 'doc_undefined' /* field undefined */},
            {_id: 'doc_foo', field: 'foo'},
            {
              _id: "_design/test",
              views: {
                mapFunc: {
                  map: "function (doc) {emit(doc.field);}"
                }
              }
            }
          ]
        }).then(function () {
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          data.rows.should.have.length(7, 'returns all docs');
          opts.keys = [];
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          data.rows.should.have.length(0, 'returns 0 docs');

          opts.keys = [0];
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          data.rows.should.have.length(1, 'returns one doc');
          data.rows[0].doc._id.should.equal('doc_0');

          opts.keys = [2, 'foo', 1, 0, null, ''];
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          // check that the returned ordering fits opts.keys
          data.rows.should.have.length(7, 'returns 7 docs in correct order');
          data.rows[0].doc._id.should.equal('doc_2');
          data.rows[1].doc._id.should.equal('doc_foo');
          data.rows[2].doc._id.should.equal('doc_1');
          data.rows[3].doc._id.should.equal('doc_0');
          data.rows[4].doc._id.should.equal('doc_null');
          data.rows[5].doc._id.should.equal('doc_undefined');
          data.rows[6].doc._id.should.equal('doc_empty');

          opts.keys = [3, 1, 4, 2];
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          // nonexistent keys just give us holes in the list
          data.rows.should.have.length(2, 'returns 2 non-empty docs');
          data.rows[0].key.should.equal(1);
          data.rows[0].doc._id.should.equal('doc_1');
          data.rows[1].key.should.equal(2);
          data.rows[1].doc._id.should.equal('doc_2');

          opts.keys = [2, 1, 2, 0, 2, 1];
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          // with duplicates, we return multiple docs
          data.rows.should.have.length(6, 'returns 6 docs with duplicates');
          data.rows[0].doc._id.should.equal('doc_2');
          data.rows[1].doc._id.should.equal('doc_1');
          data.rows[2].doc._id.should.equal('doc_2');
          data.rows[3].doc._id.should.equal('doc_0');
          data.rows[4].doc._id.should.equal('doc_2');
          data.rows[5].doc._id.should.equal('doc_1');

          opts.keys = [2, 1, 2, 3, 2];
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          // duplicates and unknowns at the same time, for maximum crazy
          data.rows.should.have.length(4, 'returns 2 docs with duplicates/unknowns');
          data.rows[0].doc._id.should.equal('doc_2');
          data.rows[1].doc._id.should.equal('doc_1');
          data.rows[2].doc._id.should.equal('doc_2');
          data.rows[3].doc._id.should.equal('doc_2');

          opts.keys = [3];
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          data.rows.should.have.length(0, 'returns 0 doc due to unknown key');

          opts.include_docs = false;
          opts.keys = [3, 2];
          return db.query("test/mapFunc", opts);
        }).then(function (data) {
          data.rows.should.have.length(1, 'returns 1 doc due to unknown key');
          data.rows[0].id.should.equal('doc_2');
          should.not.exist(data.rows[0].doc, 'no doc, since include_docs=false');
        });
      });
    });

    it('Testing query with multiple keys, multiple docs', function () {
      var mapFunction = function (doc) {
        emit(doc.field1);
        emit(doc.field2);
      };
      function ids(row) {
        return row.id;
      }
      var opts = {keys: [0, 1, 2]};
      var spec;
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            {_id: '0', field1: 0},
            {_id: '1a', field1: 1},
            {_id: '1b', field1: 1},
            {_id: '1c', field1: 1},
            {_id: '2+3', field1: 2, field2: 3},
            {_id: '4+5', field1: 4, field2: 5},
            {_id: '3+5', field1: 3, field2: 5},
            {_id: '3+4', field1: 3, field2: 4}
          ]
        }).then(function () {
          spec = ['0', '1a', '1b', '1c', '2+3'];
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);

          opts.keys = [3, 5, 4, 3];
          spec = ['2+3', '3+4', '3+5', '3+5', '4+5', '3+4', '4+5', '2+3', '3+4', '3+5'];
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);
        });
      });
    });
    it('Testing multiple emissions (issue #14)', function () {
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            {_id: 'doc1', foo : 'foo', bar : 'bar'},
            {_id: 'doc2', foo : 'foo', bar : 'bar'}
          ]
        }).then(function () {
          var mapFunction = function (doc) {
            emit(doc.foo);
            emit(doc.foo);
            emit(doc.bar);
            emit(doc.bar, 'multiple values!');
            emit(doc.bar, 'crazy!');
          };
          var opts = {keys: ['foo', 'bar']};

          return db.query(mapFunction, opts);
        });
      }).then(function (data) {
        data.rows.should.have.length(10);

        data.rows[0].key.should.equal('foo');
        data.rows[0].id.should.equal('doc1');
        data.rows[1].key.should.equal('foo');
        data.rows[1].id.should.equal('doc1');

        data.rows[2].key.should.equal('foo');
        data.rows[2].id.should.equal('doc2');
        data.rows[3].key.should.equal('foo');
        data.rows[3].id.should.equal('doc2');

        data.rows[4].key.should.equal('bar');
        data.rows[4].id.should.equal('doc1');
        should.not.exist(data.rows[4].value);
        data.rows[5].key.should.equal('bar');
        data.rows[5].id.should.equal('doc1');
        data.rows[5].value.should.equal('crazy!');
        data.rows[6].key.should.equal('bar');
        data.rows[6].id.should.equal('doc1');
        data.rows[6].value.should.equal('multiple values!');

        data.rows[7].key.should.equal('bar');
        data.rows[7].id.should.equal('doc2');
        should.not.exist(data.rows[7].value);
        data.rows[8].key.should.equal('bar');
        data.rows[8].id.should.equal('doc2');
        data.rows[8].value.should.equal('crazy!');
        data.rows[9].key.should.equal('bar');
        data.rows[9].id.should.equal('doc2');
        data.rows[9].value.should.equal('multiple values!');
      });
    });
    it('Testing empty startkeys and endkeys', function (done) {
      var mapFunction = function (doc) {
        emit(doc.field);
      };
      var opts = {startkey: null, endkey: ''};
      function ids(row) {
        return row.id;
      }
      var spec;
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            {_id: 'doc_empty', field: ''},
            {_id: 'doc_null', field: null},
            {_id: 'doc_undefined' /* field undefined */},
            {_id: 'doc_foo', field: 'foo'}
          ]
        }).then(function () {
          spec = ['doc_null', 'doc_undefined', 'doc_empty'];
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);

          opts = {startkey: '', endkey: 'foo'};
          spec = ['doc_empty', 'doc_foo'];
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);

          opts = {startkey: null, endkey: null};
          spec = ['doc_null', 'doc_undefined'];
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);

          opts.descending = true;
          spec.reverse();
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);
        });
      });
    });
    it('Testing ordering with startkey/endkey/key', function (done) {
      var mapFunction = function (doc) {
        emit(doc.field, null);
      };
      var opts = {startkey: '1', endkey: '4'};
      function ids(row) {
        return row.id;
      }
      var spec;
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            {_id: 'h', field: '4'},
            {_id: 'a', field: '1'},
            {_id: 'e', field: '2'},
            {_id: 'c', field: '1'},
            {_id: 'f', field: '3'},
            {_id: 'g', field: '4'},
            {_id: 'd', field: '2'},
            {_id: 'b', field: '1'}
          ]
        }).then(function () {
          spec = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);

          opts = {key: '1'};
          spec = ['a', 'b', 'c'];
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);

          opts = {key: '2'};
          spec = ['d', 'e'];
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);

          opts.descending = true;
          spec.reverse();
          return db.query(mapFunction, opts);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(spec);
        });
      });
    });
    it('opts.keys should work with complex keys', function (done) {
      new Pouch(dbName, function (err, db) {
        db.bulkDocs({
          docs: [
            {foo: {key2: 'value2'}},
            {foo: {key1: 'value1'}},
            {foo: [0, 0]},
            {foo: ['test', 1]},
            {foo: [0, false]}
          ]
        }, function (err) {
          var mapFunction = function (doc) {
            emit(doc.foo, doc.foo);
          };
          var keys = [
            {key: 'missing'},
            ['test', 1],
            {key1: 'value1'},
            ['missing'],
            [0, 0]
          ];
          var opts = {keys: keys};
          db.query(mapFunction, opts, function (err, data) {
            data.rows.should.have.length(3);
            data.rows[0].value.should.deep.equal(keys[1]);
            data.rows[1].value.should.deep.equal(keys[2]);
            data.rows[2].value.should.deep.equal(keys[4]);
            done();
          });
        });
      });
    });
    it('Testing ordering with dates', function (done) {
      function ids(row) {
        return row.id;
      }
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            {_id: '1969', date: '1969 was when Space Oddity hit'},
            {_id: '1971', date : new Date('1971-12-17T00:00:00.000Z')}, // Hunky Dory was released
            {_id: '1972', date: '1972 was when Ziggy landed on Earth'},
            {_id: '1977', date: new Date('1977-01-14T00:00:00.000Z')}, // Low was released
            {_id: '1985', date: '1985+ is better left unmentioned'}
          ]
        }).then(function () {
          var mapFunction = function (doc) {
            emit(doc.date, null);
          };
          return db.query(mapFunction);
        }).then(function (data) {
          data.rows.map(ids).should.deep.equal(['1969', '1971', '1972', '1977', '1985']);
        });
      });
    });
    it('should error with a callback', function (done) {
      new Pouch(dbName, function (err, db) {
        db.query('fake/thing', function (err) {
          should.exist(err);
          done();
        });
      });
    });
    it('should work with a joined doc', function () {
      function change(row) {
        return [row.key, row.doc._id, row.doc.val];
      }
      return new Pouch(dbName).then(function (db) {
        
        return db.bulkDocs({
          docs: [
            {_id: 'a', join: 'b', color: 'green'},
            {_id: 'b', val: 'c'},
            {_id: 'd', join: 'f', color: 'red'},
            {
              _id: "_design/test",
              views: {
                mapFunc: {
                  map: "function (doc) {if(doc.join){emit(doc.color, {_id:doc.join});}}"
                }
              }
            }
          ]
        }).then(function () {
          return db.query('test/mapFunc', {include_docs: true});
        }).then(function (resp) {
          return change(resp.rows[0]).should.deep.equal(['green', 'b', 'c']);
        });
      });
    });
  });
}
