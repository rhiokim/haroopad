
function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

function haveParent(parent) {
  window.parent = parent;
}

//fixed text.js error on node-webkit
require.nodeRequire = require;

/**
 * require.js 환경 설정
 */
requirejs.config({
  baseUrl: 'js/pad',
  waitSeconds: 30,
  locale: 'ko-kr',
  paths: {
    tpl: '../../tpl',
    vendors: '../vendors',
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
    'menu/Menu',
    'editor/Editor',
    'viewer/Viewer',
    'ui/file/File'
  ], function(Window, Menu, Editor, Viewer, File) {
    var html, res, file, x, y;
    var _tid_;

    var orgTitle = 'Untitled';
    var edited = false,
      delayClose = false;

    var gui = require('nw.gui'),
        win = gui.Window.get();

    file = url('#file');

    win.on('file.opened', function(opt) {

      window.parent.win.emit('change.markdown', opt.markdown, function(html) {
        Editor.setValue(opt.markdown);
        
        Viewer.init(opt);
        win.emit('change.after.markdown', Editor.getValue(), html, Editor);

        Editor.on("change", delayChange); 
      });

    });

    //run with file open;
    if (file) {
      File.open(decodeURIComponent(file));
    } else {
      Editor.on("change", delayChange);
    }

    win.on('file.saved', function(opt) {
      Viewer.init(opt);
    });

    function delayChange() {
      clearTimeout(_tid_);

      win.emit('change.before.markdown', Editor.getValue());

      _tid_ = setTimeout(function() {
        window.parent.win.emit('change.markdown', Editor.getValue(), function(html) {
          win.emit('change.after.markdown', Editor.getValue(), html, Editor);
        });
      }, 300);
    }

    win.focus();
    win.on('focus', function() {
      window.parent.win.emit('actived', win);
    });

    setTimeout(function() {
      win.show();
    }, 50);
});