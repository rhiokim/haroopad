// for Memory leak detect
process.setMaxListeners(0);

var gui = require('nw.gui');

window.nw = gui.Window.get();
window.ee = new EventEmitter();

MenuBar(); 

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
    'mail/Mailer',
    'window/Window',
    'window/WindowManager',
    'utils/UpdateNotifier'
  ], function(Context/*, Parser*/, Mailer, Window, WindowMgr, Updater) {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    // window.ee.on('change.markdown', function(md, options, cb) {
    //   cb = typeof options === 'function' ? options : cb;
    //   options = typeof options === 'object' ? options : undefined;
      
    //   var html = Parser(md, options);

    //   cb(html);
    // });

    window.ee.on('send.email', function(fileInfo, mailInfo) {
      var child = WindowMgr.actived;
      var Emails = store.get('Emails') || {};
      var addrs = Emails.addrs || [];

      Mailer.setCredential(mailInfo.from, mailInfo.password);
      Mailer.send(mailInfo.title, fileInfo.markdown, fileInfo.html, mailInfo.to, mailInfo.mode, fileInfo.attachments, function(err, response) {

        if (err) {
          child.window.ee.emit('fail.send.email', err);
          return;
        }

        if (mailInfo.remember) {
          addrs.push(mailInfo.to);
          addrs = _.uniq(addrs);

          store.set('Emails', {
            to: mailInfo.to,
            from: mailInfo.from,
            mode: mailInfo.mode,
            addrs: addrs,
            remember: mailInfo.remember
          });
        }

        child.window.ee.emit('sent.email');
      });
    })
    
    //open file with commend line
    if (gui.App.argv.length > 0) {
      WindowMgr.open(gui.App.argv[0]);
    } else {
      WindowMgr.open();
    }
});