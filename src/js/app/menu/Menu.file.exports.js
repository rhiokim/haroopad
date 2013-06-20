define([],
    function() {

    return function(win) {

      var gui = require('nw.gui');
      var submenu = new gui.Menu();

      win = win || gui.Window.get();

      submenu.append(
        new gui.MenuItem({
            label: 'HTML',
            click: function() {
              win.emit('menu.file.exports.html');
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