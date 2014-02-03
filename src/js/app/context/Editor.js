define([
		'context/util',
		'context/format/Text',
		'context/search/Search',
		'context/editor/themes',
		'context/editor/userThemes'
	],
	function(util, TextFormatMenu, Search, Themes, UserThemes) {

		var gui = require('nw.gui');
		var Context = new gui.Menu();

		function add(item) {
			Context.append(item);
		}

		add(util.menuItem({
			label: i18n.t('edit.cut'),
			click: function() {
				window.ee.emit('context.cut');
			}
		}));

		add(util.menuItem({
			label: i18n.t('edit.copy'),
			click: function() {
				window.ee.emit('context.copy');
			}
		}));

		add(util.menuItem({
			label: i18n.t('edit.paste'),
			click: function() {
				window.ee.emit('context.paste');
			}
		}));

		add(util.menuItem({
			label: i18n.t('edit.delete'),
			click: function() {
				window.ee.emit('context.delete');
			}
		}));

		add(util.menuItem({
			label: i18n.t('edit.select-all'),
			click: function() {
				window.ee.emit('context.selectall');
			}
		}));

		add(util.sepItem());

		add(util.menuItem({
			label: i18n.t('Format'),
			enabled: false,
			submenu: TextFormatMenu
		}));
		
		add(util.sepItem());

		// add(util.menuItem({
		// 	label: i18n.t('edit.services'),
		// 	enabled: false,
		// 	submenu: Search
		// }));

		add(util.menuItem({
			label: i18n.t('Editor Themes'),
			submenu: Themes
		}));

		add(util.menuItem({
			label: i18n.t('Editor User Themes'),
			submenu: UserThemes
		}));
		
		add(util.sepItem());

		add(util.menuItem({
			label: i18n.t('file.preferences'),
			click: function() {
				window.ee.emit('context.preferences');
			}
		}));

		return Context;
	});