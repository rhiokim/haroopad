/*
 * backbone-pouch
 * http://jo.github.io/backbone-pouch/
 *
 * Copyright (c) 2013 Johannes J. Schmidt
 * Licensed under the MIT license.
 */

(function(root) {
  'use strict';
  
  var BackbonePouch;
  if (typeof exports === 'object') {
    BackbonePouch = exports;
  } else {
    BackbonePouch = root.BackbonePouch = {};
  }

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require === 'function')) {
    _ = require('underscore');
  }

  var methodMap = {
    'create': 'post',
    'update': 'put',
    'patch':  'put',
    'delete': 'remove'
  };

  BackbonePouch.defaults = {
    fetch: 'allDocs',
    listen: false,
    options: {
      post: {},
      put: {},
      get: {},
      remove: {},
      allDocs: {},
      query: {},
      spatial: {},
      changes: {
        continuous: true
      }
    }
  };

  // inspired from https://github.com/Raynos/xtend
  function extend() {
    var target = {};

    for (var i = 0; i < arguments.length; i++) {
      var source = arguments[i];

      if (typeof source !== 'object') {
        continue;
      }

      for (var name in source) {
        if (source[name] && target[name] && typeof source[name] === 'object' && typeof target[name] === 'object' && name !== 'db') {
          target[name] = extend(target[name] || {}, source[name]);
        } else {
          target[name] = source[name];
        }
      }
    }

    return target;
  }

  // backbone-pouch sync adapter
  BackbonePouch.sync = function(defaults) {
    defaults = defaults || {};
    defaults = extend(BackbonePouch.defaults, defaults);

    var adapter = function(method, model, options) {
      options = options || {};
      options = extend(defaults, model && model.pouch || {}, options);

      // This is to get the options (especially options.db)
      // by calling model.sync() without arguments.
      if (typeof method !== 'string') {
        return options;
      }

      // ensure we have a pouch db adapter
      if (!options.db) {
        throw new Error('A "db" property must be specified');
      }

      function callback(err, response) {
        if (err) {
          return options.error && options.error(err);
        }
        if (method === 'create' || method === 'update' || method === 'patch') {
          response = {
            _id: response.id,
            _rev: response.rev
          };
        }
        if (method === 'delete') {
          response = {};
        }
        if (method === 'read') {
          if (options.listen) {
            // TODO:
            // * implement for model
            // * allow overwriding of since.
            options.db.info(function(err, info) {
              // get changes since info.update_seq
              options.db.changes(_.extend({}, options.options.changes, {
                since: info.update_seq,
                onChange: function(change) {
                  var todo = model.get(change.id);

                  if (change.deleted) {
                    if (todo) {
                      todo.destroy();
                    }
                  } else {
                    if (todo) {
                      todo.set(change.doc);
                    } else {
                      model.add(change.doc);
                    }
                  }

                  // call original onChange if present
                  if (typeof options.options.changes.onChange === 'function') {
                    options.options.changes.onChange(change);
                  }
                }
              }));
            });
          }
        }
        return options.success && options.success(response);
      }

      model.trigger('request', model, options.db, options);

      if (method === 'read') {
        // get single model
        if (model.id) {
          return options.db.get(model.id, options.options.get, callback);
        }
        // query view or spatial index
        if (options.fetch === 'query' || options.fetch === 'spatial') {
          if (!options.options[options.fetch].fun) {
            throw new Error('A "' + options.fetch + '.fun" object must be specified');
          }
          return options.db[options.fetch](options.options[options.fetch].fun, options.options[options.fetch], callback);
        }
        // allDocs or spatial query
        options.db[options.fetch](options.options[options.fetch], callback);
      } else {
        options.db[methodMap[method]](model.toJSON(), options.options[methodMap[method]], callback);
      }

      return options;
    };

    adapter.defaults = defaults;

    return adapter;
  };

  BackbonePouch.attachments = function(defaults) {
    defaults = defaults || {};

    function getPouch(model) {
      if (model.pouch && model.pouch.db) {
        return model.pouch.db;
      }
      if (model.collection && model.collection.pouch && model.collection.pouch.db) {
        return model.collection.pouch.db;
      }
      
      if (defaults.db) {
        return defaults.db;
      }
      
      var options = model.sync();
      if (options.db) {
        return options.db;
      }

      // TODO: ask sync adapter
        
      throw new Error('A "db" property must be specified');
    }

    return {
      attachments: function(filter) {
        var atts = this.get('_attachments') || {};
        if (filter) {
          return _.filter(_.keys(atts), function(key) {
            if (typeof filter === 'function') {
              return filter(key, atts[key]);
            }
            
            return atts[key].content_type.match(filter);
          });
        }
        return _.keys(atts);
      },
      attachment: function(name, done) {
        // TODO: first look at the _attachments stub,
        // maybe there the data is already there
        var db = getPouch(this);
        return db.getAttachment(this.id, name, done);
      },
      attach: function(blob, name, type, done) {
        if (typeof name === 'function') {
          done = name;
          name = undefined;
          type = undefined;
        }
        if (typeof type === 'function') {
          done = type;
          type = undefined;
        }
        name = name || blob.filename;
        type = type || blob.type;

        var db = getPouch(this);
        var that = this;
        return db.putAttachment(this.id, name, this.get('_rev'), blob, type, function(err, response) {
          if (!err && response.rev) {
            var atts = that.get('_attachments') || {};
            atts[name] = {
              content_type: type,
              stub: true
            };
            that.set({ _id: response.id, _rev: response.rev, _attachments: atts }, { silent: true });
          }
          done(err, response);
        });
      }
    };
  };
}(this));
