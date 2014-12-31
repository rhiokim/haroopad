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
    txt: '../vendors/text/text'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

i18n.init({
  lng: global.LOCALES._lang
}, function() {

  i18n.addResourceBundle(global.LOCALES._lang, 'menu', global.LOCALES['menu']);
  i18n.addResourceBundle(global.LOCALES._lang, 'pad', global.LOCALES['pad']);

  i18n.setDefaultNamespace('menu');

  if (process.platform != 'darwin') {
    MenuBar();
  }

  requirejs([
    'window/Window',
    'editor/Editor',
    'viewer/Viewer',
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

      opt = file.toJSON();
      doc = file.doc;

      Editor.off("change", delayChange);
      Editor.setValue(opt.markdown);
      Editor.getDoc().clearHistory();
      Viewer.init();

      window.ee.emit('file.opened');

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
      
      switch(nw._args.mode) {
        case 'view':
          window.ee.emit('menu.view.mode', 'viewer');
        break;
        case 'edit':
          window.ee.emit('menu.view.mode', 'editor');
        break;
      }

      window.ee.once('rendered', function() {
        setTimeout(function() {
          nw.show();
          nw.focus();
          window.parent.ee.emit('actived', nw);
        }, 1);
      });
    });


    /* open blank window */
    if (!file.get('fileEntry')) {
      Editor.on("change", delayChange);

      nw.show();
      nw.focus();
      window.parent.ee.emit('actived', nw);
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
      Viewer.init();
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
      window.parent.ee.emit('actived', nw);
    });

    window.ee.on('up.to.date.news', function(md) {
      //if already editor has not any contents
      if (!nw.editor.getValue()) { 
        Viewer.set(md);
      }
    });

    $(document.body).click(function(e) {
      var el = e.target, href;
      var tagName = el.tagName.toUpperCase();

      switch (tagName) {
        case 'A':
          href = el.getAttribute('href');

          if (!href || href === '#') {
            return;
          }

          global.Shell.openExternal(href);
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
