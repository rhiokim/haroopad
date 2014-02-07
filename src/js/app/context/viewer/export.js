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
        window.parent.ee.emit('context.viewer.export', this.label);
      }
    }));

    // add(util.menuItem({
    //   label: i18n.t('PDF'),
    //   click: function() {
    //     window.parent.ee.emit('context.viewer.export', this.label);
    //   }
    // }));

    // add(util.menuItem({
    //   label: i18n.t('ODT'),
    //   click: function() {
    //     window.parent.ee.emit('context.viewer.export', this.label);
    //   }
    // }));

    // add(util.menuItem({
    //   label: i18n.t('DOCX'),
    //   click: function() {
    //     window.parent.ee.emit('context.viewer.export', this.label);
    //   }
    // }));

    // add(util.menuItem({
    //   label: i18n.t('WIKI'),
    //   click: function() {
    //     window.parent.ee.emit('context.viewer.export', this.label);
    //   }
    // }));

    // add(util.menuItem({
    //   label: i18n.t('RTF'),
    //   click: function() {
    //     window.parent.ee.emit('context.viewer.export', this.label);
    //   }
    // }));

    // add(util.menuItem({
    //   label: i18n.t('TXT'),
    //   click: function() {
    //     window.parent.ee.emit('context.viewer.export', this.label);
    //   }
    // }));

    return Menu;
});