define([
	'editor/Editor.drop.file',
	'editor/Editor.drop.string'
], function(FILE, STRING) {

	var path = require('path');

	function Drop(cm, e) {
		var kind, items;
		var dataTransfer = e.dataTransfer;

		e.preventDefault();

		function dropCallback(res) {
			cm.replaceSelection(res);
		}

		items = dataTransfer.items;
		files = dataTransfer.files;

		kind = dataTransfer.types;

		if (kind == "Files") {
			FILE(files, dropCallback);
		} else {
			var text = e.dataTransfer.getData('text/plain');
			var url = e.dataTransfer.getData('text/uri-list');

			if (url) {
				STRING.uri(url, dropCallback);
			} else {
				return dropCallback(text);
			}
		}

  	global._gaq.push('haroopad.editor', 'drag and drop', kind);
	}

	return Drop;
});