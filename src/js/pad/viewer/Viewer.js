define([
		'viewer/Viewer.inlineStyle',
		'viewer/Viewer.inlineStyleForEmail',
		'viewer/Viewer.userTheme',
		'viewer/Viewer.dragdrop'
	],
	function(inlineStyle, StyleForEmail, UserTheme, DragDrop) {
		var fs = require('fs');
		var path = require('path');

		var iframe = $('#viewer iframe')[0];
		var _viewer = iframe.contentWindow;

		var gui = require('nw.gui'),
			clipboard = gui.Clipboard.get();

		var MIN_FONT_SIZE = 9;
		var MAX_FONT_SIZE = 30;

		var viewerConfig = store.get('Viewer') || {};
			viewerConfig.fontSize = Number(viewerConfig.fontSize || 15);
		var codeConfig = store.get('Code') || {};
		// var customConfig = store.get('Custom') || {};
		// var generalConfig = store.get('General') || {};
		var markdownConfig = store.get('Markdown') || {};

		// var config = option.toJSON();

		// function setTitle() {
		// 	var viewerDoc = iframe.contentDocument.body;
		// 	var el = viewerDoc.querySelectorAll('h1, h2, h3, h4, h5, h6')[0];
		// 	var title = (el && el.innerText) || '';

		// 	nw.file.set({ title: title }, { silent: true });
		// }

		function initViewer() {
			var f = nw.file.toJSON();

			f.jslib = global.PATHS.js;
			
			_viewer.init(f);
		}

		/* change editor theme */

		function changeTheme(value, log) {
			_viewer.setViewStyle(value);

			window.setTimeout(function() {
				StyleForEmail.generateInlineStyle();
			}, 1000);

			!log && global._gaq.push('haroopad.preferences', 'style', value);
		}

		function changeFontSize(value, log) {
			_viewer.setFontSize(value);

			!log && global._gaq.push('haroopad.preferences', 'fontSize', value);
		}

		function changeFontFamily(value, log) {
			_viewer.setFontFamily(value);

			!log && global._gaq.push('haroopad.preferences', 'fontFamily', value);
		}

		/* change syntax highlight theme */

		function changeCodeTheme(value, log) {
			var style = path.join(global.PATHS.css_code, value +'.css');
			_viewer.setCodeStyle(style);

			!log && global._gaq.push('haroopad.preferences', 'code', value);
		}

		/* change clickable link */

		function changeClickableLink(value, log) {
			viewerConfig.clickableLink = value;

			!log && global._gaq.push('haroopad.preferences', 'viewer', 'changeClickableLink: ' + value);
		}

		/* change custom theme */

		// function changeCustomTheme(theme, log) {
		// 	var css = (theme && theme.path) || '';
		// 	_viewer.loadCustomCSS(css);

		// 	!log && global._gaq.push('haroopad.preferences', 'change.custom.theme', '');
		// }

		function enableMath(value, log) {
			// _viewer.empty();
			
			nw.file.trigger('change:markdown');

			!log && global._gaq.push('haroopad.preferences', 'enable math expression', value);
		}

		function changeMarkdownOption() {
			nw.file.trigger('change:markdown');
		}

		window.parent.ee.on('preferences.viewer.theme', changeTheme);
		window.parent.ee.on('preferences.viewer.fontSize', changeFontSize);
		window.parent.ee.on('preferences.viewer.fontFamily', changeFontFamily);
		window.parent.ee.on('preferences.code.theme', changeCodeTheme);
		window.parent.ee.on('preferences.viewer.clickableLink', changeClickableLink);
		// window.parent.ee.on('preferences.custom.theme', changeCustomTheme);
		window.parent.ee.on('preferences.markdown.change.after', changeMarkdownOption);
		// window.parent.ee.on('preferences.general.enableMath.after', enableMath);
		// window.parent.ee.on('preferences.markdown.mathjax.after', enableMath);

		/* window close */
		nw.on('destory', function() {
			window.parent.ee.off('preferences.viewer.theme', changeTheme);
			window.parent.ee.off('preferences.viewer.fontSize', changeFontSize);
			window.parent.ee.off('preferences.viewer.fontFamily', changeFontFamily);
			window.parent.ee.off('preferences.code.theme', changeCodeTheme);
			// window.parent.ee.off('preferences.custom.theme', changeCustomTheme);
			window.parent.ee.off('preferences.viewer.clickableLink', changeClickableLink);
			window.parent.ee.off('preferences.markdown.change.after', changeMarkdownOption);
			// window.parent.ee.off('preferences.general.enableMath.after', enableMath);
			// window.parent.ee.off('preferences.markdown.mathjax.after', enableMath);
		});

		/* change theme by context menu */
		window.ee.on('viewer.theme', changeTheme);
		window.ee.on('viewer.theme.code', changeCodeTheme);

		window.ee.on('print.viewer', function(value) {
			_viewer.replaceLazyLoading();
			_viewer.print();

			global._gaq.push('haroopad.file', 'print', '');
		});

		window.ee.on('change.column', function(count) {
			_viewer.setColumn(count);
		});

		/* scroll editor for sync */
		window.ee.on('editor.scroll', function(top, per) {
			_viewer.scrollTop(top * 100 / per);
		});
		
		window.ee.on('menu.view.doc.outline', function(show) {
			show ? _viewer.showOutline() : _viewer.hideOutline();
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
		window.ee.on('menu.file.exports.clipboard.plain', function() {
			var content = nw.file.doc.get('html');
			clipboard.set(content, 'text');
		});

		// window.ee.on('menu.file.exports.clipboard.haroopad', function() {
		// 	clipboard.set(content, 'text');
		// });

		window.ee.on('menu.view.viewer.font.size', function(value) {
			viewerConfig.fontSize += value;

			if (MIN_FONT_SIZE > viewerConfig.fontSize || MAX_FONT_SIZE < viewerConfig.fontSize) {

				viewerConfig.fontSize -= value;
				return;
			}

			changeFontSize(viewerConfig.fontSize);
		});


		/* DEPRECATED */
		keymage('defmod-shift-alt-c', function() {
			window.ee.emit('menu.file.exports.clipboard.haroopad');
		});

		keymage('shift-alt-up', function() {
			window.ee.emit('menu.view.viewer.font.size', 1);
		});

		keymage('shift-alt-down', function() {
			window.ee.emit('menu.view.viewer.font.size', -1);
		});
		/* DEPRECATED */

		/* change markdown event handler */
		nw.file.doc.on('update', function(doc, html) {
			setTimeout(function() {
				_viewer.update(doc.dom());
			}, 1);
		});

		_viewer.ee.on('rendered', function() {
			nw.file.doc.parse();

			var toc = nw.file.doc.get('toc') || '';
			_viewer.updateTOC(toc);

			window.ee.emit('rendered');
			//@TODO lazy
			// content = content.replace(/<p class="toc"><\/p>/gm, _toc);

			// nw.file.set({ 'html': content }, { silent: true });
		});

		//linkable
		_viewer.ee.on('link', function(href) {
			if (viewerConfig.clickableLink) {
				if (/^(http|\/\/)/.test(href)) {
					gui.Shell.openExternal(href);
				} else {
					href = path.resolve(nw.file.get('dirname'), href);
					alert(href)
					gui.Shell.openItem(href);
				}
			}
		});

	  //tasklist
	  _viewer.ee.on('task.done', function(el, index, isDone) {
	    var src = nw.file.get('markdown');
	    var i, line, mc = 0;

	    src = src.split('\n');

	    for (i = 0; i < src.length; i++) {
	    	line = src[i];
	      if (/^( *[> ]*)\s*(?:[*+-]|\d+\.)\s+\[[x ]\]\s*/.test(line)) {
	        if (index == mc) {
	          src[i] = isDone ? line.replace('[ ]', '[x]') : line.replace('[x]', '[ ]');
            nw.editor.replaceRange(src[i], { line:i, ch:0 }, { line:i, ch: line.length } );
	          break;
	        }

	        mc++;
	      }
	    }

    	nw.file.task(index, isDone);
	    nw.file.set({ markdown: src.join('\n') }, { silent: true });
	  });


		// _viewer.ee.on('dom', function(dom) {
			// window.ee.emit('dom', dom);
		// });

		/*
		 * Math rendering event proxy
		 * viewer.html -> Viewer.js -> index.html -> math/Math.js -> Rendering
		 */
		// _viewer.ee.on('math', function(target, cb) {
		// 	window.parent.ee.emit('math', target, cb);
		// })

		// _viewer.ee.on('title', function(title) {
		// 	nw.file.set('title', title);
		// });

		/**
		 * drop in viewer
		 * @param  {[type]} fileObject [description]
		 * @return {[type]}            [description]
		 */
		// _viewer.ee.on('drop', function(fileObject) {
		// 	var file = fileObject.path;
		// 	var ext = path.extname(file);

		// 	switch (ext) {
		// 		case '.css':
		// 			_viewer.loadCustomCSS(file);
		// 			break;
		// 	}
		// });

		changeTheme(viewerConfig.theme || 'haroopad', true);
		changeFontSize(viewerConfig.fontSize, true);
		changeFontFamily(viewerConfig.fontFamily, true);
		changeCodeTheme(codeConfig.theme || 'solarized_light', true);

		UserTheme.init();
		// if (customConfig.theme) {
		// 	_viewer.loadCustomCSS(customConfig.theme.path);
		// }

		initViewer();

		return {
			init: initViewer,

			// update: update,

			/**
			 * for html exporting
			 * @return {[type]} [description]
			 */
			getContentDocument: function() {
				return iframe.contentDocument;
			},

			getHTML: function() {
				return iframe.contentDocument.body.innerHTML;
			},

			set: function(md) {
				var res = window.parent.marked(md);
				var dom = document.createElement('div');
				dom.innerHTML = res.html

				_viewer.update(dom);
			}
		};
	});