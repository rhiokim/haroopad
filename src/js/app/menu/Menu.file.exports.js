define([],
    function() {

    var gui = require('nw.gui'),
        win = gui.Window.get();
    var submenu = new gui.Menu();

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
});