define([
		'store',
		'keyboard',
		'viewer/Viewer.explicitStyleMaker',
		'viewer/Viewer.dragdrop'
	], 
	function(store, HotKey, StyleMaker, DragDrop) {
		var fs = require('fs');
		var path = require('path');

		var iframe = $('#haroo iframe')[0];
		var _viewer = iframe.contentWindow;
		var content = '',
			options;

		var gui = require('nw.gui'),
			clipboard = gui.Clipboard.get();

		var viewerConfig = store.get('Viewer') || {};
		var codeConfig = store.get('Code') || {};
		var customConfig = store.get('Custom') || {};

		// var config = option.toJSON();

		function setTitle() {
			var viewerDoc = iframe.contentDocument.body;
			var el = viewerDoc.querySelectorAll('h1, h2, h3, h4, h5, h6')[0];
			var title = (el && el.innerText) || '';

			nw.file.set({ title: title }, { silent: true });
		}

		function update(markdown, html, editor) {
			content = html;
			_viewer.update(content);

			setTitle();
		}

		/* change editor theme */
		function changeTheme(value) {
			_viewer.setViewStyle(value);

			setTimeout(function() {
				StyleMaker.generateInlineStyle();
			}, 500);

  			global._gaq.push('haroopad.preferences', 'style', value);
		}

		/* change syntax highlight theme */
		function changeCodeTheme(value) {
			_viewer.setCodeStyle(value);

			global._gaq.push('haroopad.preferences', 'code', value);
		}

		/* change clickable link */
		function changeClickableLink(value) {
			viewerConfig.clickableLink = value;

			global._gaq.push('haroopad.preferences', 'viewer', 'changeClickableLink: '+ value);
		}

		/* change custom theme */
		function changeCustomTheme(theme) {
			var css = (theme && theme.path) || '';
			_viewer.loadCustomCSS(css);


			global._gaq.push('haroopad.preferences', 'change.custom.theme', '');
		}

		window.parent.ee.on('preferences.viewer.theme', changeTheme);
		window.parent.ee.on('preferences.code.theme', changeCodeTheme);
		window.parent.ee.on('preferences.viewer.clickableLink', changeClickableLink);
		window.parent.ee.on('preferences.custom.theme', changeCustomTheme);

		/* window close */
		nw.on('destory', function() {
			window.parent.ee.off('preferences.viewer.theme', changeTheme);
			window.parent.ee.off('preferences.code.theme', changeCodeTheme);
			window.parent.ee.off('preferences.custom.theme', changeCustomTheme);
			window.parent.ee.off('preferences.viewer.clickableLink', changeClickableLink);
		});

		window.ee.on('print.html', function(value) {
			_viewer.print();

    	global._gaq.push('haroopad.file', 'print', '');
		});

		window.ee.on('change.column', function(count) {
			_viewer.setColumn(count);
		});

		/* change markdown event handler */
		window.ee.on('change.after.markdown', update);

		/* scroll editor for sync */
		window.ee.on('editor.scroll', function(top, per) {
			_viewer.scrollTop(top * 100 / per);
		});

		/**
		 * delegate to parent window key mouse down event
		 */
		_viewer.addEventListener('keydown', function(e) {

			var evt = document.createEvent("Events");
			evt.initEvent("keydown", true, true);

			evt.view = e.view;
			evt.altKey = e.altKey;
			evt.ctrlKey = e.ctrlKey;
			evt.shiftKey = e.shiftKey;
			evt.metaKey = e.metaKey;
			evt.keyCode = e.keyCode;
			evt.charCode = e.charCode;

			window.parent.dispatchEvent(evt);
			window.dispatchEvent(evt);

		}, false);

		/**
		 * delegate right mouse down event
		 */
		_viewer.addEventListener('contextmenu', function(ev) {
			$('#editor').trigger('contextmenu', [ev]);
		}.bind(this), false);

		/* copy html to clipboard */
		window.ee.on('menu.file.exports.clipboard', function() {
			clipboard.set(content, 'text');
		});

		window.ee.on('menu.view.doc.outline', function(show) {
			show ? _viewer.showOutline() : _viewer.hideOutline();
		});
		window.ee.on('menu.view.doc.toc', function(show) {
			show ? _viewer.showTOC() : _viewer.hideTOC();
		});

		HotKey('defmod-alt-c', function() {
			window.ee.emit('menu.file.exports.clipboard');
		});

		_viewer.onload = function() {}

		//linkable
		_viewer.ee.on('link', function(href) {
			if (viewerConfig.clickableLink) {
				gui.Shell.openExternal(href);
			}
		});

		_viewer.ee.on('dom', function(dom) {
			window.ee.emit('dom', dom);
		});

		_viewer.ee.on('title', function(title) {
			nw.file.set('title', title);
		});

		/**
		 * drop in viewer
		 * @param  {[type]} fileObject [description]
		 * @return {[type]}            [description]
		 */
		_viewer.ee.on('drop', function(fileObject) {
			var file = fileObject.path;
			var ext = path.extname(file);

			switch (ext) {
				// case '.scss':
				// 	var dir = path.dirname(file);
				// 	var name = path.basename(file);
				// 	var _name = path.join(dir, name);
				// 	_name = _name.replace(ext, '.css');

				// 	sass.render({
				// 		file: file,
				// 		success: function(css) {
				// 			fs.writeFile(path.join(_name), css, 'utf8', function(err) {
				// 				_viewer.loadCustomCSS(_name);
				// 			});
				// 		},
				// 		includePaths: [ dir ],
    // 					outputStyle: 'compressed'
				// 	});
				// break;
				case '.css':
					_viewer.loadCustomCSS(file);
				break;
			}
		});

		_viewer.setViewStyle(viewerConfig.theme || 'haroopad');
		_viewer.setCodeStyle(codeConfig.theme || 'solarized_light');

		if (customConfig.theme) {
			_viewer.loadCustomCSS(customConfig.theme.path);
		}

		return {
			init: function(opt) {
				options = opt;
				_viewer.init(options);
			},

			update: update,

			/**
			 * for html exporting
			 * @return {[type]} [description]
			 */
			getContentDocument: function() {
				return iframe.contentDocument;
			},

			getHTML: function() {
				return iframe.contentDocument.body.innerHTML;
			}
		};
	});