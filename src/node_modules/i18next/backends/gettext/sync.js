var converter = require('i18next-conv');

module.exports = {

    saveResourceSet: function(lng, ns, resourceSet, callback) {
        console.log('not implemented');
        callback('not implemented');
    },

    fetchOne: function(lng, ns, callback) {
        var source = this.functions.applyReplacement(this.options.resGetPath, {lng: lng, ns: ns});

        var self = this;
        converter.addTextDomain(lng, source, function(err, data) {
            // console.log(data);
            if (err) {
                callback(err);
                return;
            } 

            converter.parseJSON(lng, data, function(err, json) {
                if (err) {
                    callback(err);
                } else {
                    self.functions.log('loaded file: ' + source);
                    callback(null, json);
                }
            });
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
