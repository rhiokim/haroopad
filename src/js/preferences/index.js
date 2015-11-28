var gui = require('nw.gui');
var path = require('path');

window.nw = gui.Window.get();
window.parent = nw.parent;

var lng = global.LOCALES._lang.split('-')[0];
i18n.init({
  lng: lng
}, function() {
  i18n.addResourceBundle(lng, 'preference', global.LOCALES['preference']);
  i18n.setDefaultNamespace('preference');
    
  //fixed text.js error on node-webkit
  require.nodeRequire = require;

  /**
   * require.js 환경 설정
   */
  requirejs.config({
    baseUrl: 'js/preferences',
    waitSeconds: 30,
    locale: 'ko-kr',
    paths: {
      tpl: '../../tpl',
      txt: '../vendors/text/text',
      vendors: '../vendors'
    },
    config: {
      text: {
        env: 'xhr'
      }
    }
  });

  requirejs.onError = function (e) {console.log(e.stack)
    alert('Oops! Preferences dialog is crash :-(');
  };

  requirejs([
      'tabs/General',
      'tabs/Editor',
      'tabs/Viewer',
      // 'tabs/Custom',
      'tabs/Code',
      'tabs/Markdown',
      'tabs/Helper',
      'tabs/About',
      'tabs/Backup',
      'updater/UpdateLanguagePack'
    ], function(General, Editor, Viewer, /*Custom, */Code, Markdown, Helper, About) {
      var shell = gui.Shell;

      $('body').i18n(); 
      document.title = i18n.t('title');
    
      keymage('esc', function(e, ctx) {
        e.preventDefault();
        nw.close();
      });
      keymage('defmod-w', function(e, ctx) {
        e.preventDefault();
        nw.close();
      });

      function showItemInFolder(area, file) {
        var theme = path.join(gui.App.dataPath, 'Themes', area, file);
        theme += '.css';
        shell.showItemInFolder(theme);
      }
      
      Editor.on('open-theme', function(theme) {
        showItemInFolder('editor', theme);
      });

      Viewer.on('open-theme', function(theme) {
        showItemInFolder('viewer', theme);
      })

      nw.show();
      nw.focus();

      global._gaq.push('haroopad.preferences', 'init', '');
  });

});