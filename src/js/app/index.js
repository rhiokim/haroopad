
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
    // text: '../vendors/text',
    store: '../vendors/store',
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
    'menu/MenuBar',
    'context/Context',
    'core/Parser',
    'window/Window',
    'window/WindowManager'
  ], function(MenuBar, Context, Parser, Window, WindowMgr) {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    if (process.platform == 'darwin') {
      win.menu = MenuBar();
    }

    //open file with commend line
    if (gui.App.argv.length > 0) {
      WindowMgr.open(gui.App.argv[0]);
    } else {
      WindowMgr.open();
    }

   win.on('change.markdown', function(md, options, cb) {
    var cb = typeof options == 'function' ? options : cb;
    var options = typeof options == 'object' ? options : undefined;
    
    var html = Parser(md, options);

      cb(html);
      // WindowMgr.actived.updateMarkdown(html);
    });
});