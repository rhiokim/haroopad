function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

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
    // editor: 'editor/Editor',
    viewer: 'viewer/Viewer',
    text: '../vendors/text',
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
  $('#crash-dialog').modal();
};

requirejs([
    'window/Window',
    'editor/Editor',
    'viewer'
  ], function(Window, Editor, Viewer) {

    var res, file;
    var _tid_;

    var gui = require('nw.gui'),
        win = gui.Window.get();

    file = url('?file');
    x = url('?x');
    y = url('?y');

    // Listen to `open` event
    win.on('open.file', function(path) {
      Window.open(path);

      res = Parser(Editor.getValue());
      Viewer.update(res);
    });

    //run with file open;
    if(file) {
      win.emit('open.file', file, x, y);
    }

    //open file with commend line
    if(gui.App.argv.length > 0) {
      Window.open(gui.App.argv[0]);
      changeHandler();
    }

    Window.show();
});