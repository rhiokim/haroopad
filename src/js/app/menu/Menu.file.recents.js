define([
      'store'
    ],
    function(store) {

    var gui = require('nw.gui'),
        win = gui.Window.get();
    var submenu = new gui.Menu();
    var path = require('path');
    var name, full, item, prop;

    var recents = store.get('Recents');
        recents = recents && recents.files;

    var mClear = new gui.MenuItem({
                label: 'Clear all',
                click: function() {
                    win.emit('file.recents.clear');
                }
            });

    if(recents) {
        while(item = recents.shift()) {
            for(prop in item) {
                name = item[prop];
            }
            submenu.append(
                new gui.MenuItem({
                    label: name,
                    tooltip: prop,
                    click: function() {
                        win.emit('file.recents', this.tooltip);
                    }
                })
            );
        }

        submenu.append(
            new gui.MenuItem({
                type: 'separator'
            })
        );

    } else {
        mClear.enabled = false;
    }

    submenu.append(mClear);

    return submenu;
});