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
  'new window': 'defmod-n',
  'quite': 'defmod-q',
  'toggle linenumber': 'defmod-shift-l',
  'toggle vim bind': 'defmod-alt-v',
  'show preference': 'defmod-,',
  'editor font size up': 'defmod-alt-.',
  'editor font size down': 'defmod-alt-,',

  /* pad */
  'insert date l': 'shift-ctrl-1',
  'insert date L': 'shift-ctrl-2',
  'insert date ll': 'shift-ctrl-3',
  'insert date LL': 'shift-ctrl-4',
  'insert date lll': 'shift-ctrl-5',
  'insert date LLL': 'shift-ctrl-6',
  'insert date llll': 'shift-ctrl-7',
  'insert date LLLL': 'shift-ctrl-8',

  'sending email': 'defmod-shift-e',

  'editor viewer mode': 'defmod-alt-1',
  'reset mode': 'ctrl-\\',
  'viewer editor mode': 'defmod-alt-2',
  'editor mode': 'defmod-alt-3',
  'viewer mode': 'defmod-alt-4',
  'move right': 'shift-ctrl-]',
  'move left': 'shift-ctrl-[',
  'viewer width minus': 'ctrl-alt-]',
  'viewer width plus': 'ctrl-alt-[',

  'show markdown help': 'defmod-shift-h',
  'show table of content': 'defmod-shift-t',

  'print': 'defmod-p',
  'copy to clipboard': 'defmod-alt-c',
  'viewer font size up': 'defmod-shift-.',
  'viewer font size down': 'defmod-shift-,',

  'enter fullscreen1': 'defmod-enter',
  'enter fullscreen2': 'defmod-f11',
  'escape fullscreen': 'esc esc',

  'file open': 'defmod-o',
  'file save': 'defmod-s',
  'file save as': 'defmod-shift-s',
  'file close1': 'defmod-w',
  'file close2': 'defmod-f4',
  'export html': 'defmod-alt-e',
  'exit': 'defmod-q',

  /* preference */
  'close preference': 'esc'
};
global.SHORTCUTS.core = {};
global.SHORTCUTS.menu = {

};
global.SHORTCUTS.pad = {};
global.SHORTCUTS.preference = {};
