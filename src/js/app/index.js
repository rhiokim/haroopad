// for Memory leak detect
process.setMaxListeners(0);

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
    'context/Context',
    'core/Parser',
    'core/Mailer',
    'window/Window',
    'window/WindowManager'
  ], function(Context, Parser, Mailer, Window, WindowMgr) {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    window.ee.on('change.markdown', function(md, options, cb) {
      cb = typeof options === 'function' ? options : cb;
      options = typeof options === 'object' ? options : undefined;
      
      var html = Parser(md, options);

      cb(html);
    });

    window.ee.on('posts.tumblr', function(fileInfo, mailInfo) {
      var child = WindowMgr.actived;
      var Emails = store.get('Emails') || {};
      var addrs = Emails.addrs || [];

      Mailer.setCredential(mailInfo.from, mailInfo.password);
      Mailer.send(mailInfo.title, fileInfo.markdown, fileInfo.html, mailInfo.to, mailInfo.mode, fileInfo.attachments, function(err, response) {

        if (err) {
          child.window.ee.emit('fail.post.tumblr', err);
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

        child.window.ee.emit('posted.tumblr');
      });
    })
    
    //open file with commend line
    if (gui.App.argv.length > 0) {
      WindowMgr.open(gui.App.argv[0]);
    } else {
      WindowMgr.open();
    }
});