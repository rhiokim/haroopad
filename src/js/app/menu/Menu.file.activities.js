define(
    function() {

    var gui = require('nw.gui'),
        win = gui.Window.get();
    var submenu = new gui.Menu();

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
});