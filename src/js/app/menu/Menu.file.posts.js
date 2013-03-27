define(
    function() {

    var gui = require('nw.gui');
    var submenu = new gui.Menu();

    submenu.append(
      new gui.MenuItem({
          label: 'Tumblr'
      })
    );
    // submenu.append(
    //   new gui.MenuItem({
    //       label: 'Google DOCs'
    //   })
    // );

    return submenu;
});