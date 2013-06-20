define([],
    function() {

    return function(win) {

      var gui = require('nw.gui');
      var submenu = new gui.Menu();
      
      win = win || gui.Window.get();

      submenu.append(
        new gui.MenuItem({
            label: 'Twitter',
            click: function() {
              win.emit('file.activity.twitter');
            }
        })
      );
      // submenu.append(
      //   new gui.MenuItem({
      //       label: 'PDF'
      //   })
      // );

      return submenu;
    }
});