define([],
    function() {

    return function(win) {
      var gui = require('nw.gui');
      var submenu = new gui.Menu();

      win = win || gui.Window.get();

      submenu.append(
        new gui.MenuItem({
            label: 'Tumblr',
            click: function() {
              win.emit('file.posts.tumblr');
            }
        })
      );
      // submenu.append(
      //   new gui.MenuItem({
      //       label: 'Google DOCs'
      //   })
      // );

      return submenu;
    }
});