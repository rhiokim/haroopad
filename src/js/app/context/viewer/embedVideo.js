define([
    'context/util'
    ], function(util) {

    var gui = require('nw.gui');
    var Menu = new gui.Menu();

    function add(item) {
      Menu.append(item);
    }

    add(util.menuItem({
      label: i18n.t('Youtube'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('Vimeo'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('Ted.com'),
      click: function() {
      }
    }));

    return Menu;
});