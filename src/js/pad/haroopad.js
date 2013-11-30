/* globally for window event system */
var gui = require('nw.gui');

window.nw = gui.Window.get();
window.ee = new EventEmitter();
window.parent = nw.parent;

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

requirejs.onError = function(e) {
  alert('Oops! pad is crash :-(');
};

i18n.init({
  lng: getLang(),
  getAsync: false,
  fallbackLng: false,
  resGetPath: getExecPath() +'Libraries/.locales/__lng__/__ns__.json',
  ns: { namespaces: [ 'pad' ], defaultNs: 'pad' }
}, function() {
  if (process.platform != 'darwin') {
    MenuBar();
  }
});

requirejs([
  'window/Window',
  'editor/Editor',
  'viewer/Viewer',
  'ui/file/File',
  'ui/layout/Layout',
  'ui/footer/Footer'
], function(Window, Editor, Viewer, File) {
  var _tid_;
  var file = nw.file;

  $('body').i18n(); 

  function delayChange() {
    window.clearTimeout(_tid_);

    window.ee.emit('change.before.markdown', Editor.getValue());

    _tid_ = setTimeout(function() {
      nw.file.set('markdown', Editor.getValue());

      window.parent.ee.emit('change.markdown', Editor.getValue(), function(html) {
        window.ee.emit('change.after.markdown', Editor.getValue(), html, Editor);
      });
    }, 210);
  }

  nw.on('file.opened', function(file) {
    var opt;

    opt = file.toJSON();

    Editor.setValue(opt.markdown);
    Viewer.init(opt);

    // window.ee.emit('change.after.markdown', opt.markdown, opt.html, Editor);

    if (!opt.readOnly) {
      Editor.on('change', delayChange);
    }

    if (opt.html) {
      file.trigger('change:html');
    }

    //temp file
    if (opt.tmp) {
      file.set({ fileEntry: undefined }, { silent: true });
    }

    /* change by external application */
    file.on('change:mtime', function() {
      window.ee.emit('file.update', nw.file.get('fileEntry'));
    });

    // window.parent.ee.emit('change.markdown', opt.markdown, function(html) {
    //   Editor.setValue(opt.markdown);

    //   Viewer.init(opt);
    //   window.ee.emit('change.after.markdown', Editor.getValue(), html, Editor);

    //   if (!opt.readOnly) {
    //     Editor.on("change", delayChange); 
    //   }
    // });
  });

  file.on('change:html', function() {
    window.ee.emit('change.after.markdown', file.get('markdown'), file.get('html'), Editor);
  });

  if (!file.get('fileEntry')) {
    Editor.on("change", delayChange);
  } else {
    nw.emit('file.opened', file);
  }

  // window.ee.on('file.opened', function(opt) {
  //   window.parent.ee.emit('change.markdown', opt.markdown, function(html) {
  //     Editor.setValue(opt.markdown);

  //     Viewer.init(opt);
  //     window.ee.emit('change.after.markdown', Editor.getValue(), html, Editor);

  //     if (!readOnly) {
  //       Editor.on("change", delayChange); 
  //     }
  //   });

  // });

  window.ee.on('reload', function() {
    file.reload({
      silent: true
    });
    Editor.setValue(file.get('markdown'));
    file.trigger('change:markdown');
  });

  file.on('saved', function() {
    var opt = nw.file.toJSON();
    Viewer.init(opt);
    nw.emit('file.saved', opt);
  });

  //run with file open;
  // if (tmp) {
  //   File.openTmp(decodeURIComponent(file), uid);
  // } else {
  //   if (file) {
  //     File.open(decodeURIComponent(file));
  //     Editor.setOption('readOnly', readOnly);
  //   } else {
  //     Editor.on("change", delayChange);
  //   }

  //   File.startAutoSave();
  // }

  nw.on('focus', function() {
    nw.file.refresh();
    process.emit('actived', nw);
  });

  $("#notifier").click(function(e) {
    var tagName = e.target.tagName.toUpperCase();

    switch (tagName) {
      case 'A':
        window.parent.ee.emit($(e.target).data('href'));
        e.preventDefault();
        break;
    }
  });

  /* control gui editor */
  $('#editControls a').click(function(e) {
    switch ($(this).data('role')) {
      case 'h1':
      case 'h2':
      case 'p':
        document.execCommand('formatBlock', false, '<' + $(this).data('role') + '>');
        break;
      default:
        document.execCommand($(this).data('role'), false, null);
        break;
    }

  });

  //for aside menu
  if (window.gnMenu) {
    new gnMenu(document.getElementById('editControls'));
  }

  nw.show();
  nw.focus();
  process.emit('actived', nw);
});
