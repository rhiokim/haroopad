define([
		'module',
		'vendors/keyboard',
		'editor',
		'file/Open'
	], 

	function(module, keyboard, editor, File) {
		var fs = require('fs');
		var str;

		keyboard.on('super + o', function(e) {
			File.open();
		});

		keyboard.on('super + s', function(e) {
		});

		File.bind('open_file', function(file) {
			str = fs.readFileSync(file, 'utf8');
			editor.setValue(str);
		});

});