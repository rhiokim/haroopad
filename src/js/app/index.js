// for Memory leak detect
process.setMaxListeners(0);

window.ee = new EventEmitter();
MenuBar(); 

//fixed text.js error on node-webkit
require.nodeRequire = require;

/**
 * require.js 환경 설정
 */
requirejs.config({
  baseUrl: 'js/app',
  waitSeconds: 30,
  locale: 'ko-kr',
  paths: {
    tpl: '../../tpl',
    vendors: '../vendors',
    keyboard: '../vendors/keymage'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

requirejs.onError = function (e) {
  alert('Oops! Haroopad is crash :-(');
};

requirejs([
    'context/Context',
    'core/Parser',
    'window/Window',
    'window/WindowManager'
  ], function(Context, Parser, Window, WindowMgr) {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    //open file with commend line
    if (gui.App.argv.length > 0) {
      WindowMgr.open(gui.App.argv[0]);
    } else {
      WindowMgr.open();
    }

    window.ee.on('change.markdown', function(md, options, cb) {
      var cb = typeof options == 'function' ? options : cb;
      var options = typeof options == 'object' ? options : undefined;
      
      var html = Parser(md, options);

      cb(html);
      // WindowMgr.actived.updateMarkdown(html);
    });
});