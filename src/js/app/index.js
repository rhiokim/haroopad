
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

    // file = url('#file');
    // x = url('#x');
    // y = url('#y');

    // WindowMgr.open(file); 

    // win.on('file.opened', function(opt) {
    //   Editor.setValue(opt.markdown);
    //   html = Parser(opt.markdown);

    //   Viewer.init(opt);
    //   Viewer.update(opt.markdown, html, Editor);
    //   Editor.on("change", delayChange); 
    // });

    // if (file) {
    //   File.open(decodeURIComponent(file));
    // } else {
    //   Editor.on("change", delayChange);
    // }

    // if (x && y) {
    //   win.moveTo(x, y);
    // }

    //open file with commend line
    if (gui.App.argv.length > 0) {
      // File.open(gui.App.argv[0])
      // win.emit('open.file', gui.App.argv[0]);
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