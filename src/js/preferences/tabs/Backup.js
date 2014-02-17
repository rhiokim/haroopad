define([
  'tabs/backup/dialog.import',
  'tabs/backup/dialog.export',
], function(dialogImport, dialogExport) {
  var moment = require('moment');
  var manifest = gui.App.manifest;

  var _gaq = global._gaq;

  function importJson(res) {
    var view, prop;

    delete res._version;

    for (prop in res) {
      store.set(prop, res[prop]);
    }

    dialogImport.show();
  }

  var BackupTabView = Backbone.View.extend({
    el: '#backup-tab',

    events: {
      'click a[name=export]': 'exportHandler',
      'click a[name=import]': 'importHandler',
      'change #openFile': 'changeFileHandler'
    },

    initialize: function() {},

    changeFileHandler: function(e) {
      var file = $('#openFile')[0].files[0];
      // var file    = document.querySelector('#openFile').files[0];

      var reader = new FileReader();
      reader.onloadend = function(e) {
        try {
          var res = JSON.parse(e.target.result);
          importJson(res);

          _gaq.push('haroopad.preferences', 'backup', 'import settings');
        } catch (e) {
          alert('broken setting.json');
        }
      };

      reader.readAsText(file, '');
    },

    importHandler: function() {
      this.$('#openFile').trigger('click');
    },

    exportHandler: function(e) {
      var config = store.getAll();

      delete config._time;
      delete config.Temporary;
      delete config.Recents;
      delete config.Window;
      delete config.Helper;
      delete config.Markdown.gfm;
      delete config.Markdown.emoji;
      delete config.Markdown.highlight;
      delete config.Markdown.langPrefix;
      delete config.Markdown.headerPrefix;
      delete config.Markdown.pedantic;
      delete config.Markdown.silent;

      config._version = gui.App.manifest.version;

      var text = JSON.stringify(config, null, 2);

      var blob = new Blob([text], {
        type: 'application/json'
      });

      var a = e.currentTarget;
      a.download = manifest.name +'-' + moment().format('YYYY-MM-DD') + '-setting.json';
      a.href = window.URL.createObjectURL(blob);

      // $(a).trigger('click');

      // dialogExport.show();

      _gaq.push('haroopad.preferences', 'backup', 'export settings');
    }
  });

  dialogImport.on('yes', function() {
    // gui.App.closeAllWindows();
    nw.hide();
    window.parent.ee.emit('closeAll');
  });
  
  return view = new BackupTabView;

});