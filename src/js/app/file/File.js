define([
		'module',
		'vendors/text!tpl/file.html',
		'keyboard',
		'editor/Editor',
		'file/Recents'
	], 

	function(module, html, HotKey, Editor, Recents) {
		var fs = require('fs');
		var gui = require('nw.gui'),
				win = gui.Window.get();
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

		function open(fileEntry) {
			str = fs.readFileSync(fileEntry, 'utf8');
			Recents.add(fileEntry, 'file');
			Editor.setValue(str);

			view.trigger('opened', path.dirname(fileEntry), path.basename(fileEntry));
		}

		var View = Backbone.View.extend({
			el: '#fields',

			events: {
				'change #saveFile': 'saveHandler',
				'change #openFile': 'openHandler'
			},

			initialize: function() {
				HotKey('defmod-o', openFileDialog);
				HotKey('defmod-s', openSaveDialog);

				win.on('file.open', openFileDialog);
				win.on('file.save', openSaveDialog);
				win.on('file.recents', open);
			},

			saveHandler: function(e) {
				fileEntry = $(e.target).val();

				this.save();
			},

			openHandler: function(e) {
				fileEntry = $(e.target).val();
				if(!fileEntry) { return; }

				open(fileEntry);
			},

			externalSave: function() {
				openSaveDialog();
			},

			save: function() {
				fs.writeFileSync(fileEntry, Editor.getValue(), 'utf8');

				this.trigger('saved', path.dirname(fileEntry), path.basename(fileEntry));
			}
		});

		module.exports = view = new View();

});