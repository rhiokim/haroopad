(function() {

    // when updating dep/i18next.xx.js update version here
    var i18nVersion = '1.6.3';

    var i18n = require('./dep/i18next-' + i18nVersion)
      , url = require('url')
      , Cookies = require('cookies')
      , wrapper = {};

    wrapper.version = require('../package.json').version;
    wrapper.clientVersion = i18nVersion;

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = wrapper;
    }

    // detection subfunctions
    function detectLanguageFromPath(req, res, options) {
        var locale, locales = [];
        var parts = req.originalUrl.split('/');
        if (parts.length > options.detectLngFromPath) {
            var part = parts[options.detectLngFromPath + 1];
            var lookUp = wrapper.pluralExtensions.rules[part.split('-')[0]];
            if (lookUp) locale = part;
        }
        if (locale) locales.push({lng: cleanLngString(locale, options), q: 1});
        return locales;
    }

    function detectLanguageFromQuerystring(req, res, options) {
        var locale, locales = [];
        if (req.query) {
            locale = req.query[options.detectLngQS];
        } else {
            var querystring = url.parse(req.url, true);
            locale = querystring.query[options.detectLngQS];
        }
        if (locale) locales.push({lng: cleanLngString(locale, options), q: 1});
        return locales;
    }

    function detectLanguageFromCookie(req, res, options) {
        var locale, locales = [];
        if (req.cookies) {
            locale = req.cookies[options.cookieName];
        } else {
            var cookies = new Cookies(req, res);
            locale = cookies.get(options.cookieName);
        }
        if (locale) locales.push({lng: cleanLngString(locale, options), q: 1});
        return locales;
    }

    var detectLanguageFromHeader = function(req, res, options) {
        var headers = req.headers;
        var locales = [];

        if (!headers) {
            return locales;
        }

        var acceptLanguage = headers['accept-language'];

        if (acceptLanguage) {
            var lngs = [], i;

            // associate language tags by their 'q' value (between 1 and 0)
            acceptLanguage.split(',').forEach(function(l) {
                var parts = l.split(';'); // 'en-GB;q=0.8' -> ['en-GB', 'q=0.8']

                // get the language tag qvalue: 'q=0.8' -> 0.8
                var qvalue = 1; // default qvalue
                
                for (i = 0; i < parts.length; i++) {
                    var part = parts[i].split('=');
                    if (part[0] === 'q' && !isNaN(part[1])) {
                        qvalue = Number(part[1]);
                        break;
                    }
                }

                // add the tag and primary subtag to the qvalue associations
                lngs.push({lng: cleanLngString(parts[0], options), q: qvalue});
            });

            lngs.sort(function(a,b) {
                return b.q - a.q;
            });

            for (i = 0; i < lngs.length; i++) {
                locales.push(lngs[i]);
            }
        } 

        return locales;
    };

    function checkAgainstSupportedLng(locales, supportedLngs) {
        if (!supportedLngs.length && locales.length) {
            return [locales[0]];
        } else {
            for (var i = 0, len = locales.length; i < len; i++) {
                var locale = locales[i];
                if (supportedLngs.indexOf(locale.lng) > -1) {
                    return [locale];
                }
                if (locale.lng.indexOf('-') > -1) {
                    var unspecific = locale.lng.split('-')[0];
                    if (supportedLngs.indexOf(unspecific) > -1) {
                        locale.lng = unspecific;
                        return [locale];
                    }
                }
            }
        }
        return [];
    }

    function cleanLngString(lng, options) {
        if (typeof lng === 'string' && lng.indexOf('-') > -1) {
            var parts = lng.split('-');
    
            lng = options.lowerCaseLng ? 
                parts[0].toLowerCase() +  '-' + parts[1].toLowerCase() :
                parts[0].toLowerCase() +  '-' + parts[1].toUpperCase();
        }
        return lng;
    }

    // overriding detect language function
    var detectLanguage = function(req, res) {
        var locales = []
          , opts = wrapper.options;

        if (typeof req === 'object') {

            // from path
            if (opts.detectLngFromPath !== false) {
                locales = detectLanguageFromPath(req, res, opts);
                locales = checkAgainstSupportedLng(locales, opts.supportedLngs);

                if (!locales.length && opts.forceDetectLngFromPath) {
                    locales = [{lng: opts.fallbackLng, q: 1}];
                }
            }

            // from querystring
            if (!locales.length) { 
                locales = detectLanguageFromQuerystring(req, res, opts);
                locales = checkAgainstSupportedLng(locales, opts.supportedLngs);
            }
            
            // from cookie
            if (!locales.length && opts.useCookie) {
                locales = detectLanguageFromCookie(req, res, opts);
                locales = checkAgainstSupportedLng(locales, opts.supportedLngs);
            }
            
            // from headers
            if (!locales.length && opts.detectLngFromHeaders) {
                locales = detectLanguageFromHeader(req, res, opts);
                locales = checkAgainstSupportedLng(locales, opts.supportedLngs);
            }
        }

        if (!locales.length) locales.push({lng: opts.fallbackLng || 'en', q: 1});

        return locales[0].lng;
    };

    // overriding for the functions in i18next.js
    var f = {

        extend: function(target, source) {
            if (!source || typeof source === 'function') {
                return target;
            }
            
            for (var attr in source) { target[attr] = source[attr]; }
            return target;
        },

        each: function( object, callback, args ) {
            var name, i = 0,
                length = object.length,
                isObj = length === undefined || typeof object === "function";

            if (args) {
                if (isObj) {
                    for (name in object) {
                        if (callback.apply(object[name], args) === false) {
                            break;
                        }
                    }
                } else {
                    for ( ; i < length; ) {
                        if (callback.apply(object[i++], args) === false) {
                            break;
                        }
                    }
                }

            // A special, fast, case for the most common use of each
            } else {
                if (isObj) {
                    for (name in object) {
                        if (callback.call(object[name], name, object[name]) === false) {
                            break;
                        }
                    }
                } else {
                    for ( ; i < length; ) {
                        if (callback.call(object[i], i, object[i++]) === false) {
                            break;
                        }
                    }
                }
            }

            return object;
        },

        ajax: function() { return null; },

        detectLanguage: detectLanguage,
        detectLanguageFromPath: detectLanguageFromPath,
        detectLanguageFromQuerystring: detectLanguageFromQuerystring,
        detectLanguageFromCookie: detectLanguageFromCookie,
        detectLanguageFromHeader: detectLanguageFromHeader,
        checkAgainstSupportedLng: checkAgainstSupportedLng,

        cookie: {
            create: function() {},           
            read: function() {},           
            remove: function() {} 
        }
    };


    f.extend(i18n.functions, f);

    // override unused sync stuff
    i18n.functions.extend(i18n.sync, {

        configure: function(rstore, options, functions) {
            this.resStore = rstore || {};
            this.functions = functions;
            this.options = options;

            this._fetch = this.fetch;
            this._fetchOne = this.fetchOne;
        },

        load: function(lngs, options, cb) {
            var self = this
              , missingLngs = [];

            for (var i = 0, len = lngs.length; i < len; i++) {
                if (!this.resStore[lngs[i]]) missingLngs.push(lngs[i]);
            }

            if (missingLngs.length > 0) {
                this.fetch(missingLngs, options, function(err, fetched) {
                    if (err) i18n.functions.log(err);

                    self.functions.extend(self.resStore, fetched);
                    cb(err, self.resStore);
                });
            } else {
                cb(null, self.resStore);
            }
        },

        fetch: function(lngs, options, cb) {
            var self = this
              , ns = options.ns
              , store = {};

            var todo = ns.namespaces.length * lngs.length
              , errors;

            // load each file individual
            f.each(ns.namespaces, function(nsIndex, nsValue) {
                f.each(lngs, function(lngIndex, lngValue) {
                    self.fetchOne(lngValue, nsValue, function(err, data) { 
                        if (err) {
                            errors = errors || [];
                            errors.push(err);
                        }

                        store[lngValue] = store[lngValue] || {};
                        
                        if (err) {
                            store[lngValue][nsValue] = {};
                        } else {
                            store[lngValue][nsValue] = data;
                        }

                        todo--; // wait for all done befor callback
                        if (todo === 0) {
                            cb(errors, store);
                        }
                    });
                });
            });
        },

        postMissing: function(lng, ns, key, defaultValue) {
            var self = this
              , lngs = [];

            if (this.options.sendMissingTo === 'fallback' && this.options.fallbackLng !== false) {
                lngs.push(this.options.fallbackLng);
            } else if (this.options.sendMissingTo === 'current' || (this.options.sendMissingTo === 'fallback' && this.options.fallbackLng !== false)) {
                lngs.push(lng);
            } else if (this.options.sendMissingTo === 'all') {
                lngs = i18n.functions.toLanguages(lng);
            }

            f.each(lngs, function(i, l) {
                if (!self.resStore[l] || !self.resStore[l][ns]) {
                    self.functions.log('error saving missingKey `' + key + '` cause namespace `' + ns + '` was not loaded for language `' + l + '`.' );
                } else {
                    self.saveMissing(l, ns, key, defaultValue);
                }
            });

        },

        _loadLocal: function(lngs, cb) {
            cb('not supported');
        },

        _storeLocal: function(store) {
            return;
        }
    });

    f.extend(wrapper, i18n);
    wrapper.detectLanguage = f.detectLanguage;

})();