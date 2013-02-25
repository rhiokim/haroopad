define([
		'module',
		'text!tpl/file.html',
		'keyboard',
		'editor',
		'file/Recents'
	], 

	function(module, html, HotKey, Editor, Recents) {
		var fs = require('fs');
		var path = require('path');
		var hasWriteAccess = false, fileEntry, str;

		$('#fields').append(html);

		function openFileDialog() {
			$("#openFile").trigger("click");
		}

		function openSaveDialog() {
			if(fileEntry) {
				view.save(fileEntry);
				return;
			}

			$("#saveFile").trigger("click");
		}

		function newHandler() {
	    var x = window.screenX + 10;
	    var y = window.screenY + 10;
    	window.open('pad.html', '_blank', 'screenX=' + x + ',screenY=' + y);
		}

		var View = Backbone.View.extend({
			el: '#fields',

			events: {
				'change #saveFile': 'saveHandler',
				'change #openFile': 'openHandler'
			},

			initialize: function() {
				HotKey('super-o', openFileDialog);
				HotKey('super-s', openSaveDialog);
				HotKey('super-n', newHandler);
			},

			saveHandler: function(e) {
				fileEntry = $(e.target).val();

				this.save(fileEntry);
			},

			openHandler: function(e) {
				fileEntry = $(e.target).val();
				if(!fileEntry) { return; }

				str = fs.readFileSync(fileEntry, 'utf8');
				Recents.add(fileEntry, 'file');
				Editor.setValue(str);

				this.trigger('opened', path.dirname(fileEntry), path.basename(fileEntry));
			},

			save: function(file) {
				fs.writeFileSync(fileEntry, Editor.getValue(), 'utf8');

				this.trigger('saved', path.dirname(fileEntry), path.basename(fileEntry));
			}
		});

		module.exports = view = new View();

});