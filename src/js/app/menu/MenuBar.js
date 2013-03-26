// refs https://github.com/rogerwang/node-webkit/issues/348
define([
		'keyboard',
		'menu/ContextMenu',
		'menu/Menu.file',
		'menu/Menu.view',
		'menu/Menu.action',
		'menu/Menu.help'
	], function(HotKey, ContextMenu, File, View, Action, Help) {
		var gui = require('nw.gui');

		var Menu = new gui.Menu({
		    type:   'menubar'
		});

		Menu.append(File);
		Menu.append(View);
		Menu.append(Action);
		Menu.append(Help);

		gui.Window.get().menu = Menu;
});