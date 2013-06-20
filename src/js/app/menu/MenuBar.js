// refs https://github.com/rogerwang/node-webkit/issues/348
define([
		'keyboard',
		'menu/Menu.file',
		'menu/Menu.view',
		'menu/Menu.action',
		'menu/Menu.help'
	], function(HotKey, File, View, Action, Help) {
		var gui = require('nw.gui');

		return function() {
			var Menu = new gui.Menu({
			    type:   'menubar'
			});

			Menu.append(File());
			Menu.append(View());
			Menu.append(Action());
			Menu.append(Help());

			return Menu;
		}


		// gui.Window.get().menu = Menu;
});