define([
    'context/util'
    ], function(util) {

    var gui = require('nw.gui');
    var Menu = new gui.Menu();

    function add(item) {
      Menu.append(item);
    }

    add(util.menuItem({
      label: i18n.t('file.sending-email'),
      click: function() {
        window.parent.ee.emit('context.viewer.publish', 'email');
      }
    }));

    // add(util.menuItem({
    //   label: i18n.t('Evernote'),
    //   click: function() {
    //     window.parent.ee.emit('context.viewer.publish', 'evernote');
    //   }
    // }));

    // add(util.menuItem({
    //   label: i18n.t('Tumblr'),
    //   click: function() {
    //     window.parent.ee.emit('context.viewer.publish', 'tumblr');
    //   }
    // }));

    return Menu;
});