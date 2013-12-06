var mongo = require('mongodb');

module.exports = {

    // __connect:__ connects the underlaying database.
    //
    // `storage.connect(callback)`
    //
    // - __callback:__ `function(err, storage){}`
    connect: function(options, callback) {

        this.isConnected = false;

        if (typeof options === 'function')
            callback = options;
            
        var defaults = {
            host: 'localhost',
            port: 27017,
            dbName: 'i18next',
            resCollectionName: 'resources'
        };

        options = mergeOptions(options, defaults);

        var defaultOpt = {
            auto_reconnect: true,
            ssl: false
        };

        options.options = options.options || {};

        options.options = mergeOptions(options.options, defaultOpt);

        var self = this;

        var server = new mongo.Server(options.host, options.port, options.options);
        new mongo.Db(options.dbName, server, {safe: true}).open(function(err, client) {
            if (err) {
                if (callback) callback(err);
            } else {
                var finish = function() {
                    self.client = client;
                    self.isConnected = true;
                    
                    self.resources = new mongo.Collection(client, options.resCollectionName);

                    if (callback) callback(null, self);
                };

                if (options.username) {
                    client.authenticate(options.username, options.password, finish);
                } else {
                    finish();
                }
            }        
        });
    },

    saveResourceSet: function(lng, ns, resourceSet, cb) {
        var toSave = { resources: resourceSet };
        toSave._id = ns + '_' + lng;
        toSave.lng = lng;
        toSave.namespace = ns;

        this.resources.save(toSave, { safe: true }, cb);
    },

    fetchOne: function(lng, ns, cb) {
        var _id = ns + '_' + lng;

        var self = this;
        this.resources.findOne({ _id: _id }, function(err, obj) {
            if (err) {
                cb(err);
            } else {
                if(!obj) {
                    cb(null, { });
                } else {
                    self.functions.log('loaded from mongoDb: ' + _id);
                    cb(null, obj.resources);
                }
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

        var self = this;
        this.saveResourceSet(lng, ns, this.resStore[lng][ns], function(err) {
            if (err) {
                self.functions.log('error saving missingKey `' + key + '` to mongoDb');
            } else {
                self.functions.log('saved missingKey `' + key + '` with value `' + defaultValue + '` to mongoDb');
            }
            if (typeof callback === 'function') callback(err);
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

            self.saveResourceSet(lng, ns, fetched[lng][ns], function(err) {
                if (err) {
                    self.functions.log('error updating key `' + key + '` to mongoDb');
                } else {
                    self.functions.log('updated key `' + key + '` with value `' + newValue + '` to mongoDb');
                }
                if (typeof callback === 'function') callback(err);
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

            self.saveResourceSet(lng, ns, fetched[lng][ns], function(err) {
                if (err) {
                    self.functions.log('error removing key `' + key + '` to mongoDb');
                } else {
                    self.functions.log('removed key `' + key + '` to mongoDb');
                }
                if (typeof callback === 'function') callback(err);
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
