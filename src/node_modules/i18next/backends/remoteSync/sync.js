var request = require('request');

module.exports = {

    saveResourceSet: function(lng, ns, resourceSet, cb) {
        console.log('not implemented');
        callback('not implemented');
    },

    fetchOne: function(lng, ns, cb) {
        var url = applyReplacement(this.options.resGetPath, {lng: lng, ns: ns});

        request(url, function(err, res, body) {
            if (err) {
                cb(err);
            } else {
                cb(null, JSON.parse(body));
            }
        });
    },

    saveMissing: function(lng, ns, key, defaultValue, callback) {
        // add key to resStore
        var keys = key.split(this.options.keyseparator);
        var x = 0;
        var value = this.resStore[lng][ns];
        while (keys[x]) {
            if (x === keys.length - 1) {
                value = value[keys[x]] = defaultValue;
            } else {
                value = value[keys[x]] = value[keys[x]] || {};
            }
            x++;
        }

        var url = applyReplacement(this.options.resSetPath, {lng: lng, ns: ns})
          , body = { };

        body[key] = defaultValue;

        request.post({url: url, body: body, json: true}, function(err, res, body) {
            if (err) console.log(err);
        });
    },

    postChange: function(lng, ns, key, newValue, callback) {
        var self = this;
        this.load([lng], {ns: {namespaces: [ns]}}, function(err, fetched) {
            // change key in resStore
            var keys = key.split(self.options.keyseparator);
            var x = 0;
            var value = fetched[lng][ns];
            while (keys[x]) {
                if (x === keys.length - 1) {
                    value = value[keys[x]] = newValue;
                } else {
                    value = value[keys[x]] = value[keys[x]] || {};
                }
                x++;
            }

            var url = self.functions.applyReplacement(self.options.resChangePath, {lng: lng, ns: ns})
              , body = { };

            body[key] = newValue;

            request.post({url: url, body: body, json: true}, function(err, res, body) {
                if (err) console.log(err);
            });
        });
    },

    postRemove: function(lng, ns, key, callback) {
        var self = this;
        this.load([lng], {ns: {namespaces: [ns]}}, function(err, fetched) {
            // change key in resStore
            var keys = key.split(self.options.keyseparator);
            var x = 0;
            var value = fetched[lng][ns];
            while (keys[x]) {
                if (x === keys.length - 1) {
                    delete value[keys[x]];
                } else {
                    value = value[keys[x]] = value[keys[x]] || {};
                }
                x++;
            }

            var url = self.functions.applyReplacement(self.options.resRemovePath, {lng: lng, ns: ns})
              , body = { };

            body[key] = 'delete';

            request.post({url: url, body: body, json: true}, function(err, res, body) {
                if (err) console.log(err);
            }); 
        });
    }

};

// helper
var mergeOptions = function(options, defaultOptions) {
    if (!options || typeof options === 'function') {
        return defaultOptions;
    }
    
    var merged = {};
    for (var attrname in defaultOptions) { merged[attrname] = defaultOptions[attrname]; }
    for (attrname in options) { if (options[attrname]) merged[attrname] = options[attrname]; }
    return merged;  
};
