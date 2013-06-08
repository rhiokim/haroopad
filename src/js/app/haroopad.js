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
    // viewer: 'viewer/Viewer',
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
  alert('Oops! Haroopad is crash :-(');
};

requirejs([
    'window/Window',
    'editor/Editor',
    'viewer/Viewer',
    'ui/file/File',
    'utils/Error'
  ], function(Window, Editor, Viewer, File) {
    var res, file;
    var _tid_;

    var gui = require('nw.gui'),
        win = gui.Window.get();

    file = url('?file');
    x = url('?x');
    y = url('?y');


    //run with file open;
    if (file) {
      win.emit('open.file', decodeURIComponent(file), x, y);
    }

    //open file with commend line
    if (gui.App.argv.length > 0) {
      win.emit('open.file', gui.App.argv[0]);
    }

    win.show();
});