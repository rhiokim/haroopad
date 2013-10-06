define([
		'editor/Editor.drop.file',
		'editor/Editor.drop.string',
		'editor/Editor.drop.html'
	], function(FILE, STRING, HTML) {
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
			var html = e.dataTransfer.getData('text/html');

			if (url && html) {
				STRING.uri(url, dropCallback);
			} else if (!url && html) {
				return dropCallback(HTML(html));
			} else {
				return dropCallback(text);
			}
    	}
	}

	return Drop;
});