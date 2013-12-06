var i18n = require('../index')
  , expect = require('expect.js')
  , sync;

function asyncLoop(iterations, func, callback) {
  var index = 0;
  var done = false;
  var loop = {
    next: function() {
      if (done) {
        return;
      }

      if (index < iterations) {
        index++;
        func(loop);

      } else {
        done = true;
        callback();
      }
    },

    iteration: function() {
      return index - 1;
    },

    'break': function() {
      done = true;
      callback();
    }
  };
  loop.next();
  return loop;
}

function clear(done) {
  sync.fetchOne('en-US', 'ns.test', function(err, data) {

    var keys = [];
    function getKeys(pre, value) {
      for (var k in value) {
        if (pre) {
          keys.push(pre + '.' + k);
        } else {
          keys.push(k);
        }
      }

      for (var key in value) {
        if (typeof(value[key]) === 'object' && value[key].length === undefined) {
          var newPre = key;
          if (pre) {
            newPre = pre + '.' + key;
          }
          getKeys(newPre, value[key]);
        }
      }
    }

    getKeys(null, data);

    asyncLoop(keys.length, function(loop) {
      sync.postRemove('en-US', 'ns.test', keys[loop.iteration()], function(err) {
        loop.next();
      });
    }, done);
  });
}

function initBackend(callback) {

  // use file sync
  sync = require('../lib/filesync');
  callback();

  // use yaml
  // sync = require('../backends/yaml/index');
  // callback();

  // use gettext
  // sync = require('../backends/gettext/index');
  // callback();

  // use mongoDb
  // sync = require('../backends/mongoDb/index');
  // sync.connect(callback);


  // use redis
  // sync = require('../backends/redis/index');
  // sync.connect(callback);


  // use couchDb
  // sync = require('../backends/couchDb/index');
  // sync.connect(callback);
}

describe('i18next.backend.spec', function() {

  before(function(done) {

    var opts = {
      lng: 'en-US',
      preload: [],
      supportedLngs: [],
      lowerCaseLng: false,
      ns: 'ns.test',
      resGetPath: 'test/locales/__lng__/__ns__.json',
      //resGetPath: 'test/locales/__lng__/__ns__.po',
      //resGetPath: 'test/locales/__lng__/__ns__.yml',
      resSetPath: 'test/locales/__lng__/__ns__.json',
      returnObjectTrees: false,
      debug: false
    };

    initBackend(function() {
      i18n.backend(sync);
      i18n.init(opts, function(t) {
        sync = i18n.sync;
        clear(done);
      });
    });
  });

  describe('backend functionality', function() {

    beforeEach(function(done) {
      clear(done);
    });

    describe('fetch one', function() {

      it('it should callback without error', function(done) {

        sync.fetchOne('en-US', 'ns.test', function(err, data) {
          expect(err).to.not.be.ok();
          done();
        });
        
      });

    });

    describe('post missing', function() {

      it('it should callback without error', function(done) {

        sync.saveMissing('en-US', 'ns.test', 'testKey', 'testTrans', function(err) {
          expect(err).to.not.be.ok();
          done();
        });

      });

      it('it should have inserted the new key', function(done) {

        sync.saveMissing('en-US', 'ns.test', 'testKey', 'testTrans', function(err) {
          sync.fetchOne('en-US', 'ns.test', function(err, data) {
            expect(data.testKey).to.eql('testTrans');
            done();
          });
        });

      });

    });

    describe('post change', function() {

      it('it should callback without error', function(done) {

        sync.postChange('en-US', 'ns.test', 'testKey', 'testTransNew', function(err) {
          expect(err).to.not.be.ok();
          done();
        });
        
      });

      it('it should have changed the key', function(done) {

        sync.postChange('en-US', 'ns.test', 'testKey', 'testTransNew', function(err) {
          sync.fetchOne('en-US', 'ns.test', function(err, data) {
            expect(data.testKey).to.eql('testTransNew');
            done();
          });
        });

      });

    });

    describe('post remove', function() {

      it('it should callback without error', function(done) {

        sync.saveMissing('en-US', 'ns.test', 'toRemove', 'testTrans', function(err) {
          sync.postRemove('en-US', 'ns.test', 'toRemove', function(err) {
            expect(err).to.not.be.ok();
            done();
          });
        });
        
      });

      it('it should have removed the key', function(done) {

        sync.saveMissing('en-US', 'ns.test', 'toRemove', 'testTrans', function(err) {
          sync.postRemove('en-US', 'ns.test', 'toRemove', function(err) {
            sync.fetchOne('en-US', 'ns.test', function(err, data) {
              expect(data.testKey).to.not.be.ok();
              done();
            });
          });
        });

      });

    });

    describe('save resource set', function() {

      it('it should callback without error', function(done) {

        sync.saveResourceSet('en-US', 'ns.test', {
          'abc': '123'
        }, function(err) {
          expect(err).to.not.be.ok();
          done();
        });

      });

      it('it should have inserted the new key', function(done) {

        sync.saveResourceSet('en-US', 'ns.test', {
          'abc': '123'
        }, function(err) {
          sync.fetchOne('en-US', 'ns.test', function(err, data) {
            expect(data.abc).to.eql('123');
            done();
          });
        });

      });

    });

  });

});