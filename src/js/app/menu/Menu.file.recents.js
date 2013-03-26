define([
      'store'
    ],
    function(store) {

    var gui = require('nw.gui');
    var submenu = new gui.Menu();
    var path = require('path');
    var name, full, item, prop;

    var recents = store.get('Recents');
        recents = recents && recents.files;


    while(item = recents.shift()) {
        for(prop in item) {
            name = item[prop];
        }
        submenu.append(
            new gui.MenuItem({
                label: name
            })
        );
    }

    return new gui.MenuItem({ label: 'Recents', submenu: submenu });
});