define([
    'context/util'
    ], function(util) {

    var gui = require('nw.gui');
    var Menu = new gui.Menu();

    function add(item) {
      Menu.append(item);
    }

    add(util.menuItem({
      label: i18n.t('Tweet'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('Wikipedia'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('Slideshare.net'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('Speakerdeck.com'),
      click: function() {
      }
    }));

    return Menu;
});