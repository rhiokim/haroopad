define([
		'context/util',
		'context/viewer/export',
		'context/viewer/publish',
		'context/viewer/embedImage',
		'context/viewer/embedVideo',
		'context/viewer/embedAudio',
		'context/viewer/embedOthers',
		'context/viewer/themes',
		'context/viewer/themesUser',
		'context/viewer/themesCode'
	],
	function(util, MenuExport, MenuPublish, MenuEmbedImage, MenuEmbedVideo, MenuEmbedAudio, MenuEmbedOthers, Themes, ThemesUser, ThemesCode) {

		var gui = require('nw.gui');
		var Context = new gui.Menu();

		function add(item) {
			Context.append(item);
		}


		// add(util.menuItem({
		// 	label: i18n.t('Table of Contents'),
		// 	click: function() {
		// 	}
		// }));

		add(util.sepItem());

		add(util.menuItem({
			label: i18n.t('edit.copy-html'),
			click: function() {
				window.ee.emit('context.copy.html');
			}
		}));

		add(util.menuItem({
			label: i18n.t('edit.copy-styled-html'),
			click: function() {
				window.parent.ee.emit('menu.file.exports.clipboard.styled');
			}
		}));

		add(util.sepItem());

		add(util.menuItem({
			label: i18n.t('file.exports'),
			submenu: MenuExport
		}));

		add(util.menuItem({
			label: i18n.t('file.sending'),
			submenu: MenuPublish
		}));

		add(util.sepItem());

		// add(util.menuItem({
		// 	label: i18n.t('insert.embed-image'),
		// 	submenu: MenuEmbedImage
		// }));

		// add(util.menuItem({
		// 	label: i18n.t('insert.embed-video'),
		// 	submenu: MenuEmbedVideo
		// }));

		// add(util.menuItem({
		// 	label: i18n.t('insert.embed-audio'),
		// 	submenu: MenuEmbedAudio
		// }));

		// add(util.menuItem({
		// 	label: i18n.t('insert.embed-other'),
		// 	submenu: MenuEmbedOthers
		// }));

		// add(util.sepItem());

		add(util.menuItem({
			label: i18n.t('view.viewer.theme'),
			submenu: Themes
		}));

		add(util.menuItem({
			label: i18n.t('view.viewer.theme-code'),
			submenu: ThemesCode
		}));

		add(util.menuItem({
			label: i18n.t('view.viewer.theme-user'),
			submenu: ThemesUser
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