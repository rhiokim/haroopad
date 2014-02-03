define([
    'context/util'
    ], function(util) {

    var gui = require('nw.gui');
    var Menu = new gui.Menu();

    function add(item) {
      Menu.append(item);
    }

    add(util.menuItem({
      label: i18n.t('Sending email'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('Evernote'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('Tumblr'),
      click: function() {
      }
    }));

    return Menu;
});