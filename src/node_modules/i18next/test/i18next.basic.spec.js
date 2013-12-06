var i18n = require('../index')
  , expect = require('expect.js')
  , sinon = require('sinon')
  , filesync = require('../lib/filesync');

describe('i18next.basic.spec', function() {

  var opts;

  beforeEach(function() {
    opts = {
      lng: 'en-US',
      preload: [],
      supportedLngs: [],
      lowerCaseLng: false,
      ns: 'translation',
      resGetPath: 'test/locales/__lng__/__ns__.json',
      resSetPath: 'test/locales/__lng__/new.__ns__.json',
      saveMissing: false,
      resStore: false,
      returnObjectTrees: false,
      debug: false
    };
    
    i18n.backend(filesync);
  });

  describe('basic functionality', function() {

    describe('save missing key', function() {

      beforeEach(function(done) {
        i18n.init(i18n.functions.extend(opts, { saveMissing: true }), function(t) { done(); } );
      });

      it('it shouldn\'t throw an error', function() {
        expect(i18n.t('missingTest')).to.be('missingTest');
      });

      it('it should not throw error on unknown language namespace combination', function() {
        expect(i18n.t('ns.unknown:missingTest')).to.be('ns.unknown:missingTest');
      });

    });

  });

});