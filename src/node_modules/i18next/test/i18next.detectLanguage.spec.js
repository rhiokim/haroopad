var i18n = require('../index')
  , expect = require('expect.js')
  , sinon = require('sinon')
  , request = require('supertest')
  , express = require('express');

describe('i18next.detectLanguage.spec', function() {

  var opts, app;

  before(function(done) {
    opts = {
      lng: 'en-US',
      preload: ['en', 'de'],
      supportedLngs: [],
      lowerCaseLng: false,
      ns: 'translation',
      resGetPath: 'test/locales/__lng__/__ns__.json',
      resSetPath: 'test/locales/__lng__/new.__ns__.json',
      saveMissing: false,
      resStore: false,
      detectLngFromPath: 0,
      debug: false
    };

    app = express();

    i18n.init(opts, function(t) {
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
      res.send(req.locale);
    });

    app.get('/getLng', function(req, res) {
      res.send(req.locale);
    });

    i18n.registerAppHelper(app)
      .serveClientScript(app)
      .serveDynamicResources(app);
  
  });

  describe('detect language functionality', function() {

    describe('without supported languages set', function() {

      describe('by route', function() {
        it('it should return set language', function(done) {
          request(app)
            .get('/de-CH/test')
            .expect('de-CH')
            .expect(200, done);
        });
      });

      describe('by querystring', function() {
        it('it should return set language', function(done) {
          request(app)
            .get('/getLng?setLng=de-CH')
            .expect('de-CH')
            .expect(200, done);
        });
      });

      describe('by cookie', function() {
        it('it should return set language', function(done) {
          request(app)
            .get('/getLng')
            .set('cookie', 'i18next=de-CH')
            .expect('de-CH')
            .expect(200, done);
        });
      });

      describe('by header (accept-language)', function() {
        it('it should return set language', function(done) {
          request(app)
            .get('/getLng')
            .set('Accept-Language','de-ch;q=0.8')
            .expect('de-CH')
            .expect(200, done);
        });
      });

    });

    describe('with supported languages set', function() {

      describe('to have the specific language set', function() {

        beforeEach(function(done) {
          i18n.init(i18n.functions.extend(opts, {
            supportedLngs: ['de-CH', 'en-US']
          }), function(t) { done(); } );
        });

        describe('by route', function() {
          it('it should return set language', function(done) {
            request(app)
              .get('/de-CH/test')
              .expect('de-CH')
              .expect(200, done);
          });
        });

        describe('by querystring', function() {
          it('it should return set language', function(done) {
            request(app)
              .get('/getLng?setLng=de-CH')
              .expect('de-CH')
              .expect(200, done);
          });
        });

        describe('by cookie', function() {
          it('it should return set language', function(done) {
            request(app)
              .get('/getLng')
              .set('cookie', 'i18next=de-CH')
              .expect('de-CH')
              .expect(200, done);
          });
        });

        describe('by header (accept-language)', function() {
          it('it should return set language', function(done) {
            request(app)
              .get('/getLng')
              .set('Accept-Language','de-ch;q=0.8')
              .expect('de-CH')
              .expect(200, done);
          });
        });

      });

      describe('to have the unspecific language set', function() {

        beforeEach(function(done) {
          i18n.init(i18n.functions.extend(opts, {
            supportedLngs: ['de', 'en']
          }), function(t) { done(); } );
        });

        describe('by route', function() {
          it('it should return unspecific language', function(done) {
            request(app)
              .get('/de-CH/test')
              .expect('de')
              .expect(200, done);
          });
        });

        describe('by querystring', function() {
          it('it should return unspecific language', function(done) {
            request(app)
              .get('/getLng?setLng=de-CH')
              .expect('de')
              .expect(200, done);
          });
        });

        describe('by cookie', function() {
          it('it should return unspecific language', function(done) {
            request(app)
              .get('/getLng')
              .set('cookie', 'i18next=de-CH')
              .expect('de')
              .expect(200, done);
          });
        });

        describe('by header (accept-language)', function() {
          it('it should return unspecific language', function(done) {
            request(app)
              .get('/getLng')
              .set('Accept-Language','de-ch;q=0.8')
              .expect('de')
              .expect(200, done);
          });
        });

      });

      describe('to have the language not set', function() {

        beforeEach(function(done) {
          i18n.init(i18n.functions.extend(opts, {
            supportedLngs: ['en', 'it']
          }), function(t) { done(); } );
        });

        describe('by route', function() {
          it('it should return fallback language', function(done) {
            request(app)
              .get('/de-CH/test')
              .expect('dev')
              .expect(200, done);
          });
        });

        describe('by querystring', function() {
          it('it should return fallback language', function(done) {
            request(app)
              .get('/getLng?setLng=de-CH')
              .expect('dev')
              .expect(200, done);
          });
        });

        describe('by cookie', function() {
          it('it should return fallback language', function(done) {
            request(app)
              .get('/getLng')
              .set('cookie', 'i18next=de-CH')
              .expect('dev')
              .expect(200, done);
          });
        });

        describe('by header (accept-language)', function() {
          it('it should return fallback language', function(done) {
            request(app)
              .get('/getLng')
              .set('Accept-Language','de-ch;q=0.8')
              .expect('dev')
              .expect(200, done);
          });
        });

      });

    });

    describe('edge cases with header (accept-language)', function() {

      describe('having de-CH with higher prio than en but' +
              ' only de and en in supported languages', function() {

        beforeEach(function(done) {
          i18n.init(i18n.functions.extend(opts, {
            supportedLngs: ['de', 'en']
          }), function(t) { done(); } );
        });

        it('it should return de', function(done) {
          request(app)
            .get('/getLng')
            .set('Accept-Language','de-ch;q=0.8,en;q=0.7')
            .expect('de')
            .expect(200, done);
        });

      });

    });

  });

});

    // describe('i18next registered routes', function() {

    //   describe('GET locales/resources.json?lng=&ns=', function() {

    //     it('respond with json', function(done) {

    //       request(app)
    //         .get('/locales/resources.json?lng=en&ns=translation')
    //         .set('Accept', 'application/json')
    //         .expect('Content-Type', /json/)
    //         .expect(200, done);

    //     });

    //   });

      // describe('GET /i18next/i18next.js', function() {

      //   it('respond with json', function(done) {

      //     request(app)
      //       .get('/i18next/i18next.js')
      //       .set('Accept', 'text/javascript')
      //       .expect('Content-Type', /javascript/)
      //       .expect(200, done);

      //   });

      // });

      // describe('POST /locales/add/:lng/:ns', function() {

      //   it('respond with json "ok"', function(done) {

      //     request(app)
      //       .post('/locales/add/de/translation')
      //       .set({data: { name: 'Manny', species: 'cat' }})
      //       .set('Accept', 'application/json')
      //       .expect('Content-Type', /json/)
      //       .expect('"ok"')
      //       .expect(200, done);

      //   });

      // });

      // describe('POST /locales/change/:lng/:ns', function() {

      //   it('respond with json "ok"', function(done) {

      //     request(app)
      //       .post('/locales/change/de/translation')
      //       .set({data: { name: 'Manny', species: 'cat' }})
      //       .set('Accept', 'application/json')
      //       .expect('Content-Type', /json/)
      //       .expect('"ok"')
      //       .expect(200, done);

      //   });

      // });

    //});

