var i18n = require('../index')
  , expect = require('expect.js')
  , sinon = require('sinon')
  , request = require('supertest')
  , express = require('express')
  , filesync = require('../lib/filesync');

describe('i18next.server.spec', function() {

  var opts, app;

  before(function(done) {
    opts = {
      lng: 'en-US',
      fallbackLng: 'dev',
      load: 'all',
      preload: ['en', 'de'],
      supportedLngs: [],
      lowerCaseLng: false,
      ns: 'translation',
      fallbackToDefaultNS: false,
      resGetPath: 'test/locales/__lng__/__ns__.json',
      resSetPath: 'test/locales/__lng__/new.__ns__.json',
      saveMissing: false,
      resStore: false,
      getAsync: false,
      returnObjectTrees: false,
      interpolationPrefix: '__',
      interpolationSuffix: '__',
      postProcess: '',
      debug: false,
      detectLngFromPath: 0
    };

    app = express();

    i18n.backend(filesync);
    i18n.init(opts, function(t) {
      done();
    });

    // Configuration
    app.configure(function() {
        app.use(express.bodyParser());
        app.use(i18n.handle); // have i18n befor app.router
        
        app.use(app.router);
        app.set('view engine', 'jade');
        app.set('views', __dirname + '/jade');
    });

    app.get('/:lng/req/first', function(req, res) {
      setTimeout(function() {
        res.send(req.i18n.t('simple_en-US'));
      }, 100);
    });

    app.get('/:lng/req/second', function(req, res) {
      res.send(req.i18n.t('simple_de'));
    });

    app.get('/:lng/jade/first', function(req, res) {
      setTimeout(function() {
        res.render('test');
      }, 100);
    });

    app.get('/:lng/jade/second', function(req, res) {
      res.render('test');
    });

    i18n.registerAppHelper(app);
  
  });

  describe('handle two requests where simultanous', function() {

    describe('first needs longer than second', function() {

      it('respond in correct translation for req.i18n.t', function(done) {

        var todo = 1
          , errors = ''
          , doOne = function(err) {
          todo--;
          if (err) errors += '\n' + err;
          if (todo < 0) {
            if (errors) {
              done(new Error(errors));
            } else {
              done();
            }
          }
        };

        request(app)
          .get('/en-US/req/first')
          .set('Accept', 'text/javascript')
          .expect('ok_from_en-US')
          .expect(200, doOne);

        request(app)
          .get('/de/req/second')
          .set('Accept', 'text/javascript')
          .expect('ok_from_de')
          .expect(200, doOne);

      });

      it('respond in correct translation for res.render jade', function(done) {

        var todo = 1
          , errors = ''
          , doOne = function(err) {
          todo--;
          if (err) errors += '\n' + err;
          if (todo < 0) {
            if (errors) {
              done(new Error(errors));
            } else {
              done();
            }
          }
        };

        request(app)
          .get('/en-US/jade/first')
          .set('Accept', 'text/javascript')
          .expect('ok_from_en-US')
          .expect(200, doOne);

        request(app)
          .get('/de/jade/second')
          .set('Accept', 'text/javascript')
          .expect('simple_en-US') // key as value doesn't exists!
          .expect(200, doOne);

      });

    });

  });

});