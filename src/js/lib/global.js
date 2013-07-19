var gui = require('nw.gui');

global.openUrl = function(url) {
	gui.shell.openExternal(url);
}