define([
    'parse',
    'file/File.doc',
    'file/File.tmp.opt'
    ], function(parse, Doc, TmpOpt) {

  var fs = require('fs-extra'),
      path = require('path'),
      base62 = require('base62');
  var gui = require('nw.gui');

  var appTmpDataPath = gui.App.dataPath;

  function open(fileEntry) {
    return fs.readFileSync(fileEntry, 'utf8');
  }

  function unique() {
    return base62.encode(parseInt(Math.random() * 100000000000000000));
  }

  function getTmpFile(uid) {
    return path.join(appTmpDataPath, '.tmp', uid);
  }

  var Model = Backbone.Model.extend({
    defaults: {
      created_at: new Date,
      updated_at: new Date,
      fileEntry: undefined,
      extname: '.md',
      dirname: undefined,
      basename: undefined,
      markdown: '',
      tmp: undefined,
      readOnly: false,
      doc: null
    },

    initialize: function() {
      this.doc = new Doc;
      this.set('doc', this.doc);

      this.on('change:markdown', function() {
        var md = this.get('markdown') || '';
        var html = parse(md);

        this.doc.set('html', html);
        // this.trigger('change:doc', this, this.doc);
        // this.set('html', html);

        if (!this.get('tmp')) {
          window.clearTimeout(this._writeTimeout);

          this._writeTimeout = window.setTimeout(function() {
            fs.writeFileSync(this._tmpFile, md, 'utf8');
            TmpOpt.add(this._uid);
          }.bind(this), 5000);
        }
      });

      this.on('change:fileEntry', function() {
        var fileEntry = this.get('fileEntry');

        this.update(fileEntry);
      });

      if (!this.get('tmp')) {
        this._uid = unique();
        this._tmpFile = getTmpFile(this._uid);
      } else {
        this._tmpFile = this.get('fileEntry');
        this._uid = path.basename(this._tmpFile);
      }

      if (this.get('fileEntry')) {
        this.trigger('change:fileEntry');
        this.load();
      }
    },

    load: function(silent) {
      var fileEntry = this.get('fileEntry');
      var md = open(fileEntry), 
          stat = fs.statSync(fileEntry);

      silent = silent ? silent : {} ;

      this.set({ markdown: md }, silent);
      this.set(stat, silent);
    },

    reload: function(silent) {
      var fileEntry = this.get('fileEntry');
      var md = open(fileEntry);

      silent = silent ? silent : {} ;

      this.set({ markdown: md }, silent);
    },

    refresh: function() {
      var stat,
          fileEntry = this.get('fileEntry');

      if (fileEntry) {
        stat = fs.statSync(fileEntry);
        this.set(stat); 
      }
    },

    update: function(fileEntry) {
      this.set({
        'fileEntry': fileEntry,
        'extname': path.extname(fileEntry) || '.md',
        'dirname': path.dirname(fileEntry),
        'basename': path.basename(fileEntry),
        'updated_at': new Date
      });
    },

    save: function(fileEntry) {
      var stat;
      fileEntry = fileEntry || this.get('fileEntry');

      if (!path.extname(fileEntry)) {
        fileEntry += '.md';
      }

      fs.writeFileSync(fileEntry, this.get('markdown'), 'utf8');
      stat = fs.statSync(fileEntry);

      this.update(fileEntry);
      this.set(stat, { silent: true });

      this.trigger('saved');
    },

    close: function() {
      window.clearTimeout(this._writeTimeout);
      
      if (fs.existsSync(this._tmpFile)) {
        fs.removeSync(this._tmpFile);
      }

      TmpOpt.remove(this._uid);
    }
  });

  return Model;

});