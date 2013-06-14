
function haveParent(parent) {
  window.parent = parent;
}

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
    store: '../vendors/store'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

requirejs.onError = function (e) {
  alert('Oops! preferences is crash :-(');
};

requirejs([
    'tabs/General',
    'tabs/Editor',
    'tabs/Viewer',
    'tabs/Code',
    'tabs/Helper',
    'tabs/About'
  ], function(General, Editor, Viewer, Code, Helper, About) {

    $('.switch').bootstrapSwitch();

    var gui = require('nw.gui'),
        win = gui.Window.get();

    win.on('context.preferences', function() {
      alert('context.prefe')
    });
    win.on('preferences.show', function() {
      alert('prefe.show')
    });

});