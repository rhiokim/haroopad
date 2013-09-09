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
      fallbackNS: [],
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
      i18n.addRoute('/:lng/route.key1/route.key2', ['de', 'en'], app, 'get', function(req, res) {
        res.end();
      });
      done();
    });

    // Configuration
    app.configure(function() {
        app.use(express.bodyParser());
        app.use(i18n.handle); // have i18n befor app.router
        
        app.use(app.router);
        app.set('view engine', 'jade');
        app.set('views', __dirname);
    });

    app.get('/:lng/test', function(req, res) {
      res.end();
    });

    i18n.registerAppHelper(app)
      .serveClientScript(app)
      .serveDynamicResources(app)
      .serveMissingKeyRoute(app)
      .serveChangeKeyRoute(app);
  
  });

  describe('server functionality', function() {

    describe('GET added routes /:lng/key1/key2', function() {

      it('respond with ok for de', function(done) {

        request(app)
          .get('/de/key1_de/key2_de')
          .set('Accept', 'text/javascript')
          .expect(200, done);

      });

      it('respond with ok for en', function(done) {

        request(app)
          .get('/en/key1_en/key2_en')
          .set('Accept', 'text/javascript')
          .expect(200, done);

      });

      it('respond with nok for ru', function(done) {

        request(app)
          .get('/ru/key1_ru/key2_ru')
          .set('Accept', 'text/javascript')
          .expect(404, done);

      });

    });

    describe('GET /:lng/... should set lng', function() {

      it('respond with ok', function(done) {

        request(app)
          .get('/de-CH/test')
          .set('Accept', 'text/javascript')
          .expect(200, done);

      });

      it('it should set lng', function() {
        expect(i18n.lng()).to.be('de-CH');
      });

    });

    describe('i18next registered routes', function() {

      describe('GET locales/resources.json?lng=&ns=', function() {

        it('respond with json', function(done) {

          request(app)
            .get('/locales/resources.json?lng=en&ns=translation')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);

        });

      });

      describe('GET /i18next/i18next.js', function() {

        it('respond with json', function(done) {

          request(app)
            .get('/i18next/i18next.js')
            .set('Accept', 'text/javascript')
            .expect('Content-Type', /javascript/)
            .expect(200, done);

        });

      });

      describe('POST /locales/add/:lng/:ns', function() {

        it('respond with json "ok"', function(done) {

          request(app)
            .post('/locales/add/de/translation')
            .set({data: { name: 'Manny', species: 'cat' }})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect('"ok"')
            .expect(200, done);

        });

      });

      describe('POST /locales/change/:lng/:ns', function() {

        it('respond with json "ok"', function(done) {

          request(app)
            .post('/locales/change/de/translation')
            .set({data: { name: 'Manny', species: 'cat' }})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect('"ok"')
            .expect(200, done);

        });

      });

    });

  });

});