// for Memory leak detect
process.setMaxListeners(0);

//add node main module path
process.mainModule.paths = [getExecPath() +'Libraries/.node_modules'].concat(process.mainModule.paths);

var lng = getLang();

global.gui = gui = require('nw.gui');
global.top = window;

window.nw = gui.Window.get();
window.ee = new EventEmitter();

i18n.init({
  lng: lng
}, function() {
  i18n.addResourceBundle(lng, 'menu', global.locales['menu']);
  i18n.setDefaultNamespace('menu');

  MenuBar();
});

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
    keyboard: '../vendors/keymage',
    parse: 'core/Parser'
  },
  config: {
    text: {
      env: 'xhr'
    }
  }
});

requirejs.onError = function (e) {
  alert('Oops! app is crash :-(');
};

requirejs([
    'context/Context',
    // 'core/Parser',
    'window/Window',
    'window/WindowManager',
    'utils/UpdateNotifier'
  ], function(Context, /*Parser, */Window, WindowMgr, Updater) {

    var os = getPlatformName();
    gui.App.on('open', function(cmdline) {
      var file;

      switch(os) {
        case 'windows':
          //"z:\Works\haroopad\" --original-process-start-time=1302223754723848
          //"z:\Works\haroopad\" --original-process-start-time=1302223754723848 "z:\Works\filename.ext"
          
          if (cmdline.split('"').length >= 5) {
            cmdline = cmdline.split('"');
            cmdline.pop();
            
            file = cmdline.pop();
          }
        break;
        case 'mac':
          file = cmdline;
        break;
        case 'linux':
          cmdline = cmdline.split(' ');
          cmdline.shift();

          file = cmdline.join(' ');
        break;
      }
      
      WindowMgr.open(file);
    });

    //open file with commend line
    if (gui.App.argv.length > 0) {
      var file;
      
      switch(os) {
        case 'windows':
          file = gui.App.argv[0];
        break;
        case 'mac':
          file = gui.App.argv[0];
        break;
        case 'linux':
          file = gui.App.fullArgv.join(' ');  //it's bug
        break;
      }

      WindowMgr.open(file);
    } else {
      WindowMgr.open();
    }
});
