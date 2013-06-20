// refs https://github.com/rogerwang/node-webkit/issues/348
define([
		'keyboard',
		'menu/Menu.file',
		'menu/Menu.view',
		'menu/Menu.action',
		'menu/Menu.help'
	], function(HotKey, File, View, Action, Help) {

		return function(win) {
			var gui = require('nw.gui');

			var Menu = new gui.Menu({
			    type:   'menubar'
			});

			Menu.append(File(win));
			Menu.append(View(win));
			Menu.append(Action(win));
			Menu.append(Help(win));

			return Menu;
		}
});