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
		var hasWriteAccess = false, fileEntry, markdown;

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

		function openForceSaveDialog() {
			$("#saveFile").trigger("click");
		}

		function open(file) {
			fileEntry = file;
			markdown = fs.readFileSync(fileEntry, 'utf8');
			Recents.add(fileEntry, 'file');

			view.trigger('file.opened', markdown, path.dirname(fileEntry), path.basename(fileEntry));
		}

		function openWindow(file) {
			var have = fs.existsSync(decodeURIComponent(file));

			if (!have) {
				view.trigger('file.not.exist');
				return;
			}

			gui.Window.open('pad.html?file='+ file, {
				width: win.width,
				height: win.height,
				  toolbar: false,
				  show: true
				});
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
				HotKey('defmod-shift-s', openForceSaveDialog);

				win.on('file.open', openFileDialog);
				win.on('file.save', openSaveDialog);
				win.on('file.recents', openWindow);
			},

			saveHandler: function(e) {
				fileEntry = $(e.target).val();

				this.save();
			},

			openHandler: function(e) {
				fileEntry = $(e.target).val();
				if(!fileEntry) { return; }

				openWindow(fileEntry);
				// open(fileEntry);
			},

			externalSave: openSaveDialog,

			open: open,

			save: function() {
				if(path.extname(fileEntry).indexOf('.md') < 0) {
					fileEntry += '.md';
				}

				fs.writeFileSync(fileEntry, Editor.getValue(), 'utf8');

				this.trigger('saved', path.dirname(fileEntry), path.basename(fileEntry));
			}
		});

		module.exports = view = new View();

});