window.ee = new EventEmitter();

if (process.platform != 'darwin') {
  MenuBar(); 
}

function loadCss(url) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    document.getElementsByTagName("head")[0].appendChild(link);
}

// function haveParent(parent) {
//   window.parent = parent;
// }

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
    'editor/Editor',
    'viewer/Viewer',
    'ui/file/File'
  ], function(Window, Editor, Viewer, File) {
    var html, res, file, uid, tmp, x, y;
    var _tid_;

    var orgTitle = 'Untitled';
    var edited = false,
      delayClose = false;

    var gui = require('nw.gui'),
        win = gui.Window.get();

    // file = url('#file');
    file = win._params.file;
    tmp = win._params.tmp;
    uid = win._params.uid;

    window.ee.on('file.opened', function(opt) {

      window.parent.ee.emit('change.markdown', opt.markdown, function(html) {
        Editor.setValue(opt.markdown);
        
        Viewer.init(opt);
        window.ee.emit('change.after.markdown', Editor.getValue(), html, Editor);

        Editor.on("change", delayChange); 
      });

    });

    //run with file open;
    if (tmp) {
      File.openTmp(decodeURIComponent(file), uid);
    } else {
      if (file && !tmp) {
        File.open(decodeURIComponent(file));
      } else {
        Editor.on("change", delayChange);
      }

      File.startAutoSave();
    }

    window.ee.on('file.saved', function(opt) {
      Viewer.init(opt);
    });

    function delayChange() {
      clearTimeout(_tid_);

      window.ee.emit('change.before.markdown', Editor.getValue());

      _tid_ = setTimeout(function() {
        window.parent.ee.emit('change.markdown', Editor.getValue(), function(html) {
          window.ee.emit('change.after.markdown', Editor.getValue(), html, Editor);
        });
      }, 300);
    }

    win.focus();
    win.on('focus', function() {
      process.emit('actived', win);
    });

    setTimeout(function() {
      process.emit('actived', win);
      win.show();
    }, 10);
});