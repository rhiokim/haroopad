define([
		'context/util',
		'context/viewer/export',
		'context/viewer/publish',
		'context/viewer/embedVideo',
		'context/viewer/embedAudio',
		'context/viewer/embedOthers',
		'context/viewer/themes',
		'context/viewer/userThemes'
	],
	function(util, MenuExport, MenuPublish, MenuEmbedVideo, MenuEmbedAudio, MenuEmbedOthers, Themes, UserThemes) {

		var gui = require('nw.gui');
		var Context = new gui.Menu();

		function add(item) {
			Context.append(item);
		}


		add(util.menuItem({
			label: i18n.t('Table of Contents'),
			click: function() {
			}
		}));

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
			label: i18n.t('Export...'),
			submenu: MenuExport
		}));

		add(util.menuItem({
			label: i18n.t('Publish...'),
			submenu: MenuPublish
		}));

		add(util.sepItem());

		add(util.menuItem({
			label: i18n.t('Embed Video'),
			submenu: MenuEmbedVideo
		}));

		add(util.menuItem({
			label: i18n.t('Embed Image'),
			submenu: MenuEmbedAudio
		}));

		add(util.menuItem({
			label: i18n.t('Embed Others...'),
			submenu: MenuEmbedOthers
		}));


		add(util.sepItem());

		add(util.menuItem({
			label: i18n.t('Viewer Themes...'),
			submenu: Themes
		}));

		add(util.menuItem({
			label: i18n.t('Viewer User Themes...'),
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