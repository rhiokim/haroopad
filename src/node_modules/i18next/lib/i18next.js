(function() {

    var i18n = require('./i18nextWrapper')
      , i18nWT = require('./i18nextWTWrapper')
      , fs = require('fs')
      , filesync = require('./filesync')
      , Cookies = require('cookies');

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = i18n;
    }

    var resStore
      , backend
      , orgInit = i18n.init
      , registeredAppHelpers;

    i18n.init = function(options, cb) {
        if (typeof options === 'function') {
            cb = options;
            options = {};
        }

        options = options || {};
        options.resSetPath = options.resSetPath || 'locales/__lng__/__ns__.json';
        options.sendMissing = options.saveMissing || false;
        options.detectLngFromPath = options.detectLngFromPath === undefined ? false : options.detectLngFromPath;
        options.forceDetectLngFromPath = options.forceDetectLngFromPath !== true ? false : options.forceDetectLngFromPath;
        options.detectLngFromHeaders = options.detectLngFromHeaders !== false ? true : options.detectLngFromHeaders;
        options.supportedLngs = options.supportedLngs || [];
        options.ignoreRoutes = options.ignoreRoutes || [];
        options.cookieName = options.cookieName || 'i18next';  
        resStore = options.resStore ? options.resStore : {};
        
        // obsolete
        // if (options.useSync) console.log('options.useSync is obsolete use i18next.backend(...) instead.');

        var o = i18n.functions.extend(i18n.options, options);
        
        if (!backend) backend = filesync;

        if (!i18n.sync.fetchOne) i18n.functions.extend(i18n.sync, backend);

        if ((!i18n.sync.resStore || options.resStore) && typeof i18n.sync.configure === 'function') {
            i18n.sync.configure(resStore, o, i18n.functions);
        }

        orgInit(options, cb);
    };

    i18n.backend = function(sync) {
        // reset sync
        if (i18n.sync.fetchOne) delete i18n.sync.fetchOne;
        if (i18n.sync.resStore) delete i18n.sync.resStore;
        resStore = {};

        backend = sync;
    };

    i18n.handle = function(req, res, next) {
        var ignore = i18n.options.ignoreRoutes;
        for (var i = 0, len = ignore.length; i < len; i++) {
            if (req.path.indexOf(ignore[i]) > -1) {
                return next();
            }
        }
        
        var languages = i18n.functions.toLanguages(i18n.detectLanguage(req, res));
        var locale = languages[0];
         
        // set locale & i18n in req
        req.locale = req.lng = req.language = locale;

        // assert t function returns always translation 
        // in given lng inside this request
        var t = function(key, options) {
            options = options || {};
            options.lng = options.lng || req.lng || i18n.lng();
            return i18n.t(key, options);
        };

        var i18nDummy = {
            t: t,
            translate: t,
            lng: function() { return locale; },
            locale: function() { return locale; },
            language: function() { return locale; }
        };

        // assert for req
        req.i18n = i18nDummy;
        req.t = req.t || t;

        // assert for res -> template
        if (registeredAppHelpers) {
            if (res.locals) {
                res.locals.t = t;
                res.locals.i18n = i18n;
            }
        }

        i18n.setLng(locale, function() {
            if (i18n.options.useCookie) i18n.persistCookie(req, res, locale);
            next();
        });
    };

    i18n.registerAppHelper = function(app) {
        registeredAppHelpers = true;


        if(app.dynamicHelpers) {
            app.dynamicHelpers({
                t: function(req, res) {
                    return req.t;
                },
                i18n: function(req, res) {
                    return req.i18n;
                }
            });
            // app.helpers({
            //     t: i18n.t,
            //     i18n: {
            //         t: i18n.t,
            //         translate: i18n.t,
            //         lng: i18n.lng,
            //         locale: i18n.lng,
            //         language: i18n.lng
            //     }
            // });
        }

        return i18n;
    };

    i18n.serveClientScript = function(app, options) {
        options = options || {};
        var maxAge = options.maxAge || 60 * 60 * 24 * 30;

        app.get('/i18next/i18next.js', function(req, res) {
            var filename = (process.env.NODE_ENV !== 'production' || process.env.DEBUG) ? __dirname + '/dep/i18next-' + i18n.clientVersion + '.js' : __dirname + '/dep/i18next-' + i18n.clientVersion + '.min.js';

            if (process.env.NODE_ENV === 'production' || options.cache) {
                res.header('Cache-Control', 'public max-age=' + maxAge);
                res.header('Expires', (new Date(new Date().getTime() + maxAge * 1000)).toUTCString());
            }

            res.sendfile(filename);
        });

        return i18n;
    };

    i18n.serveWebTranslate = function(app, options) {
        i18nWT.serve(app, options);

        return i18n;
    };

    i18n.serveDynamicResources = function(app, options) {
        options = options || {};
        var maxAge = options.maxAge || 60 * 60 * 24 * 30;

        app.get('/locales/resources.json', function(req, res) {

            var resources = {};

            res.contentType('json');
            if (process.env.NODE_ENV === 'production' || options.cache) {
                res.header('Cache-Control', 'public max-age=' + maxAge);
                res.header('Expires', (new Date(new Date().getTime() + maxAge * 1000)).toUTCString());
            }

            var languages = req.query.lng ? req.query.lng.split(' ') : []
              , opts = { ns: { namespaces: req.query.ns ? req.query.ns.split(' ') : [] } };

            i18n.sync.load(languages, opts, function() {

                languages.forEach(function(lng) {
                    if (!resources[lng]) resources[lng] = {};

                    opts.ns.namespaces.forEach(function(ns) {
                        if (!resources[lng][ns]) resources[lng][ns] = resStore[lng][ns] || {};
                    });
                });

                res.send(resources);
            });
        });

        return i18n;
    };

    i18n.serveMissingKeyRoute = function(app, authenticated) {
        app.post('/locales/add/:lng/:ns', function(req, res) {
            if (authenticated && !authenticated(req, res)) {
                res.end();
                return;
            }

            var lng = req.params.lng;
            var ns = req.params.ns;
     
            for (var m in req.body) {
                i18n.sync.postMissing(lng, ns, m, req.body[m]);
            }

            res.json('ok');
        });

        return i18n;
    };

    i18n.serveChangeKeyRoute = function(app, authenticated) {
        app.post('/locales/change/:lng/:ns', function(req, res) {
            if (authenticated && !authenticated(req, res)) {
                res.end();
                return;
            }

            var lng = req.params.lng;
            var ns = req.params.ns;
   
            for (var m in req.body) {
                i18n.sync.postChange(lng, ns, m, req.body[m]);
            }

            res.json('ok');
        });

        return i18n;
    };

    i18n.serveRemoveKeyRoute = function(app, authenticated) {
        app.post('/locales/remove/:lng/:ns', function(req, res) {
            if (authenticated && !authenticated(req, res)) {
                res.end();
                return;
            }

            var lng = req.params.lng;
            var ns = req.params.ns;
   
            for (var m in req.body) {
                i18n.sync.postRemove(lng, ns, m, req.body[m]);
            }

            res.json('ok');
        });

        return i18n;
    };

    i18n.persistCookie = function(req, res, locale) {
        var cookies = new Cookies(req, res);
        var expirationDate = new Date();
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);

        cookies.set(i18n.options.cookieName, locale, { expires: expirationDate, httpOnly : false });
    };

    i18n.addRoute = function(route, lngs, app, verb, fc) {
        if (typeof verb === 'function') {
            fc = verb;
            verb = 'get';
        }

        for (var i = 0, li = lngs.length; i < li; i++) {
            var parts = route.split('/');
            var locRoute = [];
            for (var y = 0, ly = parts.length; y < ly; y++) {
                var part = parts[y];
                if (part.indexOf(':') === 0 || part === '') {
                    locRoute.push(part);
                } else {
                    locRoute.push(i18n.t(part, { lng: lngs[i] }));
                }
            }

            app[verb || 'get'](locRoute.join('/'), fc);
        }
    };

})();
