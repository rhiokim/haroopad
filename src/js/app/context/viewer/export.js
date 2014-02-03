define([
    'context/util'
    ], function(util) {

    var gui = require('nw.gui');
    var Menu = new gui.Menu();

    function add(item) {
      Menu.append(item);
    }

    add(util.menuItem({
      label: i18n.t('HTML'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('PDF'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('ODT'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('DOCX'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('WIKI'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('RTF'),
      click: function() {
      }
    }));

    add(util.menuItem({
      label: i18n.t('TXT'),
      click: function() {
      }
    }));

    return Menu;
});