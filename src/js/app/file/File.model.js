define([
    'parse'
    ], function(parse) {

  var fs = require('fs-extra'),
      path = require('path');

  function open(fileEntry) {
    return fs.readFileSync(fileEntry, 'utf8');
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
        var html = parse(this.get('markdown'));
        this.set('html', html);
      });
    },

    load: function(fileEntry, silent) {
      var md = open(fileEntry), 
          stat = fs.statSync(fileEntry);

      silent = silent ? silent : {} ;

      this.set(stat, silent);
      this.set({
        'markdown': md,
        'fileEntry': fileEntry,
        'extname': path.extname(fileEntry) || '.md',
        'dirname': path.dirname(fileEntry),
        'basename': path.basename(fileEntry),
        'updated_at': new Date
      }, silent);
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
    }
  });

  return Model;

});