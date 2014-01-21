var gui = require('nw.gui'),
    win = gui.Window.get();
var fs = require('fs');
var lng = getLang();

window.parent = win.parent;

i18n.init({
  lng: lng
}, function() {
  i18n.addResourceBundle(lng, 'preference', global._locales['preference']);
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
      vendors: '../vendors',
      store: '../vendors/store.js/store',
      keyboard: '../vendors/keymage/keymage'
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
      'keyboard',
      'tabs/General',
      'tabs/Editor',
      'tabs/Viewer',
      'tabs/Custom',
      'tabs/Code',
      'tabs/Markdown',
      'tabs/Helper',
      'tabs/About'
    ], function(HotKey, General, Editor, Viewer, Custom, Code, Markdown, Helper, About) {

      // $('.switch').bootstrapSwitch();
      
      $('body').i18n(); 
      document.title = i18n.t('title');
    
      HotKey('esc', function() {
        win.close();
      });

      win.show();
      win.focus();

      global._gaq.push('haroopad.preferences', 'init', '');
  });

});