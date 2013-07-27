define(function() {

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

    initialize: function(fileEntry) {
      var md = open(fileEntry), 
          stat = fs.statSync(fileEntry);

      this.update(fileEntry);

      this.set(stat);
      this.set('markdown', md);
    },

    update: function(fileEntry) {
      this.set({
        'fileEntry': fileEntry,
        'extname': path.extname(fileEntry) || '.md',
        'dirname': path.dirname(fileEntry),
        'basename': path.basename(fileEntry),
        'updated_at': new Date
      })
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