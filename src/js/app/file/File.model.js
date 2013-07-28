define([
    'parse',
    'file/File.tmp.opt'
    ], function(parse, TmpOpt) {

  var fs = require('fs-extra'),
      path = require('path'),
      base62 = require('base62');
  var gui = require('nw.gui');

  var appTmpDataPath = gui.App.dataPath[0];

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
      markdown: undefined,
      tmp: undefined,
      readOnly: false
    },

    initialize: function() {
      this.on('change:markdown', function() {
        var md = this.get('markdown');
        var html = parse(md);

        this.set('html', html);

        if (!this.get('tmp')) {
          window.clearTimeout(this._writeTimeout);

          this._writeTimeout = window.setTimeout(function() {
            fs.writeFileSync(this._tmpFile, md, 'utf8');
            TmpOpt.add(this._uid);
          }.bind(this), 5000);
        }
      });

      this.on('change:fileEntry', function() {
        this.set({
          'extname': path.extname(fileEntry) || '.md',
          'dirname': path.dirname(fileEntry),
          'basename': path.basename(fileEntry),
          'updated_at': new Date
        });
      });

      if (!this.get('tmp')) {
        this._uid = unique();
        this._tmpFile = getTmpFile(this._uid);
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

    loadTmp: function(uid, silent) {
      var fileEntry = getTmpFile(uid);
      var md = open(fileEntry);

      this._uid = uid;
      this._tmpFile = fileEntry;

      this.set({
        'markdown': md,
        'tmp': true,
        'fileEntry': fileEntry
      }, silent);
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

    save: function(fileEntry) {
      if (!path.extname(fileEntry)) {
        fileEntry += '.md';
      }

      fs.writeFileSync(fileEntry, this.get('markdown'), 'utf8');

      this.load(fileEntry, { silent: true });
    },

    close: function() {
      window.clearTimeout(this._writeTimeout);
      fs.removeSync(this._tmpFile);
      TmpOpt.remove(this._uid);
    }/*,

    checkUpdate: function() {
      var fileEntry = this.get('fileEntry');
      var mtime;

      if (fileEntry) {
        fs.stat(fileEntry, function(err, stats) {
          mtime = this.get('mtime');

          if(!mtime) {
            this.set(stats);
            return;
          }

          if (mtime.getTime() != stats.mtime.getTime()) {
            this.set(stats);
            window.ee.emit('file.update', this.get('fileEntry'));
          }
        });
      }
    }*/
  });

  return Model;

});