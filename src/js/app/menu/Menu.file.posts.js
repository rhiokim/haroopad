define([],
    function() {

    var gui = require('nw.gui'),
        win = gui.Window.get();

    return function() {
      var submenu = new gui.Menu();

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