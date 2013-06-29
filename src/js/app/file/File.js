define([
		'file/File.tmp'
	],
	function(Temporary) {
		var fs = require('fs'),
			path = require('path');

		var gui = require('nw.gui'),
			win = gui.Window.get();

		

		return {
			save: function(file, markdown, cb) {
				fs.writeFile(file, markdown, 'utf8', cb);
			},
			
			open: function(file, cb) {
				fs.readFile(file, 'utf8', cb);
			}
		}
});