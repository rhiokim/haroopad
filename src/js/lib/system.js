;(function() {
  var path = require('path'),
    cp = require('child_process'),
    gui = require('nw.gui'),
    fs, watchr, readDir;

  /* node-webkit gui */
  global.Shell = gui.Shell;
  global.Clipboard = gui.Clipboard;
  global.App = gui.App;
  global.Manifest = gui.App.manifest;

  // prevent memory leak detect
  process.setMaxListeners(0);

  switch (process.platform) {
    case 'win32':
      global.EXECPATH = path.join(process.execPath, '../');
      break;
    case 'darwin':
      global.EXECPATH = path.join(process.execPath, '../../../../../');
      break;
    case 'linux':
      global.EXECPATH = path.join(process.execPath, '../');
      break;
  }

  /* system path */
  global.PATHS = {
    node_modules: path.join(global.EXECPATH, 'Libraries', '.node_modules'),
    locales: path.join(global.EXECPATH, 'Libraries', '.locales'),
    docs: path.join(global.EXECPATH, 'Libraries', '.docs'),
    css_code: path.join(global.EXECPATH, 'Libraries', '.css', 'code'),
    js: path.join(global.EXECPATH, 'Libraries', '.js'),
    theme_res_editor: path.join(global.EXECPATH, 'Resources', 'Themes', 'editor'),
    theme_res_viewer: path.join(global.EXECPATH, 'Resources', 'Themes', 'viewer'),
    theme_dest_editor: path.join(global.App.dataPath, 'Themes', 'editor'),
    theme_dest_viewer: path.join(global.App.dataPath, 'Themes', 'viewer')
  };

  //add node main module path
  process.mainModule.paths = [global.PATHS.node_modules];

  fs = require('fs-extra');
  readDir = require('readdir');

  /* load locales */
  global.LANGS = fs.readFileSync(path.join(global.PATHS.locales, 'locales.json'));
  global.LANGS = JSON.parse(global.LANGS);

  /* native themes */


  function loadUserThemes(dir) {
    var csses = readDir.readSync(dir, ['*.css'], readDir.CASELESS_SORT);
    var name, themes = [];

    csses.forEach(function(css, idx) {
      name = path.basename(css).replace('.css', '');
      themes.push(name);
    });

    return themes;
  }

  /* copy native resources */
  (function() {
    var files, isExist, source, dest;

    var editorSource = global.PATHS.theme_res_editor;
    var markdownSource = global.PATHS.theme_res_viewer;

    var editorDest = global.PATHS.theme_dest_editor;
    var markdownDest = global.PATHS.theme_dest_viewer;

    fs.mkdirpSync(editorDest);
    fs.mkdirpSync(markdownDest);

    files = readDir.readSync(editorSource, ['**.css']);

    files.forEach(function(file) {
      dest = path.join(editorDest, file);
      source = path.join(editorSource, file);

      isExist = fs.existsSync(dest);

      if (!isExist) {
        try {
          fs.copySync(source, dest);
        } catch (e) {}
      }

    });

    files = readDir.readSync(markdownSource, ['**.css']);

    files.forEach(function(file) {
      dest = path.join(markdownDest, file);
      source = path.join(markdownSource, file);

      isExist = fs.existsSync(dest);

      if (!isExist) {
        try {
          fs.copySync(source, dest);
        } catch (e) {}
      }

    });
  })();

  global.THEMES = {};
  global.THEMES.user = {};
  global.THEMES.user.editor = loadUserThemes(global.PATHS.theme_dest_editor);
  global.THEMES.user.viewer = loadUserThemes(global.PATHS.theme_dest_viewer);
  global.THEMES.editor = ['default', '3024-day', '3024-night', 'ambiance-mobile', 'ambiance',
    'base16-dark', 'base16-light', 'blackboard', 'cobalt', 'eclipse', 'elegant', 'erlang-dark',
    'lesser-dark', 'mbo', 'midnight', 'monokai', 'neat', 'night', 'paraiso-dark', 'paraiso-light',
    'pastel-on-dark', 'rubyblue', 'solarized dark', 'solarized light', 'the-matrix',
    'tomorrow-night-eighties', 'twilight', 'vibrant-ink', 'xq-dark', 'xq-light'
  ];
  global.THEMES.viewer = ['clearness', 'clearness-dark', 'node-dark', 'github', 'haroopad',
    'solarized-dark', 'solarized-light', 'metro-vibes', 'metro-vibes-dark', 'wood', 'wood-ri'
  ];
  global.THEMES.code = ['default', 'arta', 'ascetic', 'atelier-dune.dark', 'atelier-dune.light',
    'atelier-forest.dark', 'atelier-forest.light', 'atelier-heath.dark', 'atelier-heath.light',
    'atelier-lakeside.dark', 'atelier-lakeside.light', 'atelier-seaside.dark', 'atelier-seaside.light',
    'brown_paper', 'dark', 'docco', 'far', 'foundation', 'github', 'googlecode', 'idea',
    'ir_black', 'magula', 'mono-blue', 'monokai', 'monokai_sublime', 'obsidian', 'paraiso.dark', 'paraiso.light',
    'pojoaque', 'railscasts', 'rainbow', 'school_book', 'solarized_dark', 'solarized_light', 'sunburst',
    'tomorrow-night-blue', 'tomorrow-night-bright', 'tomorrow-night-eighties', 'tomorrow-night',
    'tomorrow', 'vs', 'xcode', 'zenburn'
  ];
  
  global.SHORTCUTS = {
    /* app */
    'new-window':         'defmod-n',
    'save':               'defmod-s',
    'save-as':            'defmod-shift-s',
    'open':               'defmod-o',
    'send-email':         'defmod-shift-e',
    'copy-to-clipboard':  'defmod-alt-c',
    'export-html':        'defmod-alt-e',
    'close':              'defmod-w',
    'close-win':          'defmod-f4',
    'show-preference':    'defmod-,',
    'print':              'defmod-p',
    'exit':               'defmod-q',

    /* view */
    'perspective-edit-view':    'defmod-alt-1',
    'perspective-view-edit':    'defmod-alt-2',
    'perspective-only-edit':    'defmod-alt-3',
    'perspective-only-view':    'defmod-alt-4',
    'perspective-set-default':  'ctrl-\\',

    'perspective-move-right': 'shift-ctrl-]',
    'perspective-move-left':  'shift-ctrl-[',
    'perspective-minus-view': 'ctrl-alt-]',
    'perspective-plus-view':  'ctrl-alt-[',

    'toggle-line-number':     'defmod-shift-l',
    'show-markdown-help':     'defmod-shift-h',
    'enter-fullscreen':       'defmod-enter',
    'enter-fullscreen-win':   'defmod-f11',
    'escape-fullscreen':      'esc esc',
    'toggle-vim-key-binding': 'defmod-alt-v',
    'show-table-of-content':  'defmod-shift-t',
    'editor-font-size-up':    'defmod-alt-.',
    'editor-font-size-down':  'defmod-alt-,',
    'viewer-font-size-up':    'defmod-shift-.',
    'viewer-font-size-down':  'defmod-shift-,',

    'select-all':           'defmod-a',
    'delete-line':          'defmod-d',
    'undo':                 'defmod-z',
    'redo1':                'defmod-y',
    'redo2':                'shift-defmod-z',
    'go-to-doc-start':      'defmod-up',
    'go-to-doc-end1':       'defmod-end',
    'go-to-doc-end2':       'defmod-down',
    'go-to-group-left':     'alt-left',
    'go-to-group-right':    'alt-right',
    'go-to-line-start':     'defmod-left',
    'go-to-line-end':       'defmod-right',
    'delete-group-before':  'alt-backspace',
    'delete-group-after1':  'ctrl-alt-backspace',
    'delete-group-after2':  'alt-delete',
    'indent-less':          'defmod-[',
    'indent':               'defmod-]',

    /* pad */
    'insert-date-l':    'shift-ctrl-1',
    'insert-date-L':    'shift-ctrl-2',
    'insert-date-ll':   'shift-ctrl-3',
    'insert-date-LL':   'shift-ctrl-4',
    'insert-date-lll':  'shift-ctrl-5',
    'insert-date-LLL':  'shift-ctrl-6',
    'insert-date-llll': 'shift-ctrl-7',
    'insert-date-LLLL': 'shift-ctrl-8',

    /* markdown */
    'insert-md-header1':         'defmod-1',
    'insert-md-header2':         'defmod-2',
    'insert-md-header3':         'defmod-3',
    'insert-md-header4':         'defmod-4',
    'insert-md-header5':         'defmod-5',
    'insert-md-header6':         'defmod-6',
    'insert-md-bold':            'defmod-B',
    'insert-md-italic':          'defmod-I',
    'insert-md-link':            'defmod-L',
    'insert-md-underline':       'defmod-Y',
    'insert-md-inline-code':     'defmod-K',
    'insert-md-embed':           'defmod-E',
    'insert-md-toc':             'defmod-T',
    'insert-md-strike':          'defmod-Alt-S',
    'insert-md-highlight':       'defmod-Alt-H',
    'insert-md-ordered-list':    'defmod-Alt-O',
    'insert-md-unordered-list':  'defmod-Alt-U',
    'insert-md-image':           'defmod-Alt-I',
    'insert-md-math-block':      'defmod-Alt-M',
    'insert-md-math-inline':     'defmod-Alt-J',
    'insert-md-blockquote':      'defmod-Alt-B',
    'insert-md-section-break':   'defmod-Alt-Enter',
    'insert-md-page-break':      'defmod-Alt-\'',
    'insert-md-sentence-break':  'defmod-',

    /* finding */
    'start-search':     'defmod-f',
    'find-next':        'defmod-g',
    'find-previous':    'defmod-shift-g',
    'replace-mac':      'defmod-alt-f',
    'replace-win':      'shift-ctrl-f',
    'replace-all-mac':  'defmod-shift-alt-f',
    'replace-all-win':  'shift-ctrl-r',

    /* preference */
    'close-preference': 'esc'
  };
})();
