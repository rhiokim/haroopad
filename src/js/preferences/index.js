var gui = require('nw.gui');
var fs = require('fs');
var path = require('path');
var lng = getLang();

window.nw = gui.Window.get();
window.parent = nw.parent;

i18n.init({
  lng: lng
}, function() {
  i18n.addResourceBundle(lng, 'preference', global.locales['preference']);
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
      // tpl: '../../tpl',
      tpl: '../../tpl',
      txt: '../vendors/text/text',
      vendors: '../vendors'
      // store: '../vendors/store.js/store',
      // keyboard: '../vendors/keymage/keymage'
    },
    config: {
      text: {
        env: 'xhr'
      }
    }
  });

  requirejs.onError = function (e) {
    alert('Oops! Preferences dialog is crash :-(');
  };

  requirejs([
      'tabs/General',
      'tabs/Editor',
      'tabs/Viewer',
      'tabs/Custom',
      'tabs/Code',
      'tabs/Markdown',
      'tabs/Helper',
      'tabs/About',
      'tabs/Backup',
      'util/ResourceCopy'
    ], function(General, Editor, Viewer, Custom, Code, Markdown, Helper, About) {
      var shell = gui.Shell;

      $('body').i18n(); 
      document.title = i18n.t('title');
    
      keymage('esc', function() {
        nw.close();
      });

      Editor.on('open-theme', function(theme) {
        var theme = path.join(gui.App.dataPath, 'Themes', 'editor', theme);
        theme += '.css';
        shell.showItemInFolder(theme);
      });

      nw.show();
      nw.focus();

      global._gaq.push('haroopad.preferences', 'init', '');
  });

});