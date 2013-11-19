var yaml = require('js-yaml')
  , fs = require('fs');

module.exports = {

    saveResourceSet: function(lng, ns, resourceSet, callback) {
        console.log('not implemented');
        callback('not implemented');
    },

    fetchOne: function(lng, ns, callback) {
        var filename = this.functions.applyReplacement(this.options.resGetPath, {lng: lng, ns: ns});

        var self = this;
        fs.readFile(filename, 'utf8', function(err, data) {
            if (err) {
                callback(err);
            } else {
                self.functions.log('loaded file: ' + filename);
                callback(null, yaml.load(data));
            }
        });
    },

    saveMissing: function(lng, ns, key, defaultValue, callback) {
        console.log('not implemented');
        callback('not implemented');
    },

    postChange: function(lng, ns, key, newValue, callback) {
        console.log('not implemented');
        callback('not implemented');
    },

    postRemove: function(lng, ns, key, callback) {
        console.log('not implemented');
        callback('not implemented');
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
