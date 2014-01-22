/* globally for window event system */
var gui = require('nw.gui');
var fs = require('fs');
var lng = getLang();

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
    txt: '../vendors/text/text',
    store: '../vendors/store.js/store',
    keyboard: '../vendors/keymage/keymage'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

i18n.init({
  lng: lng
}, function() {

  i18n.addResourceBundle(lng, 'menu', global._locales['menu']);
  i18n.addResourceBundle(lng, 'pad', global._locales['pad']);

  i18n.setDefaultNamespace('menu');

  if (process.platform != 'darwin') {
    MenuBar();
  }

  requirejs([
    'window/Window',
    'editor/Editor',
    'viewer/Viewer',
    // 'ui/toc/TOC',
    'ui/markdown-help/MarkdownHelp',
    'ui/file/File',
    'ui/layout/Layout',
    'ui/footer/Footer'
  ], function(Window, Editor, Viewer, /*TOC,*/ MarkdownHelp, File) {
    var _tid_;
    var file = nw.file;

    $('body').i18n(); 

    function delayChange() {
      window.clearTimeout(_tid_);

      window.ee.emit('change.before.markdown', Editor.getValue());

      _tid_ = setTimeout(function() {
        nw.file.set('markdown', Editor.getValue());
      }, 210);
    }

    nw.on('file.opened', function(file) {
      var opt, doc;
      opt = file.toJSON()
      doc = opt.doc;

      Editor.setValue(opt.markdown);
      Viewer.init();

      file.doc.trigger('change:html', doc, doc.html());

      if (!opt.readOnly) {
        Editor.on('change', delayChange);
      }

      //temp file
      if (opt.tmp) {
        file.set({ fileEntry: undefined }, { silent: true });
      }

      /* change by external application */
      file.on('change:mtime', function() {
        window.ee.emit('file.update', nw.file.get('fileEntry'));
      });
      
      window.ee.once('rendered', function() {
        setTimeout(function() {
          nw.show();
          nw.focus();
          process.emit('actived', nw);
        }, 1);
      });
    });


    /* open blank window */
    if (!file.get('fileEntry')) {
      Editor.on("change", delayChange);

      nw.show();
      nw.focus();
      process.emit('actived', nw);
    } else {
      nw.emit('file.opened', file);
    }

    /**
     * change file state by other application
     */
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
  });

});
