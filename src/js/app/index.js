
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
    'keyboard',
    'menu/MenuBar',
    'window/WindowManager'/*,
    'window/Window'*/
  ], function(HotKey, MenuBar, WindowMgr, Window) {
    var html, res, file, x, y;
    var _tid_;

    var gui = require('nw.gui'),
        win = gui.Window.get();

    //open file with commend line
    if (gui.App.argv.length > 0) {
      WindowMgr.open(gui.App.argv[0]);
    } else {
      WindowMgr.open();
    }

    win.on('file.new', function() {
      WindowMgr.open();
    })

    HotKey('defmod-n', function() {
      WindowMgr.open();
    });

    HotKey('defmod-q', function() {
    });

    win.on('file.exit', function() {
      gui.App.quit();
    });

    // win.on('file.saved', function(opt) {
    //   Viewer.init(opt);
    // });

});