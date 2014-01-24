var fs = require('fs'), 
    path = require('path'),
    gui = require('nw.gui');

/* node-webkit gui */
global.Shell = gui.Shell;
global.Clipboard = gui.Clipboard;
global.App = gui.App;
global.Manifest = gui.App.Manifest;

// prevent memory leak detect
process.setMaxListeners(0);

switch(process.platform) {
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
process.mainModule.paths = [ global.PATHS.node_modules ];

/* load locales */
global.LANGS = fs.readFileSync(path.join(global.PATHS.locales, 'locales.json'));
global.LANGS = JSON.parse(global.LANGS);
