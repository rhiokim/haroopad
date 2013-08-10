define([
		'store'
	], 
	function(store) {
		var iframe = $('#haroo iframe')[0];
		var _viewer = iframe.contentWindow;
		var content = '',
			options;

		var gui = require('nw.gui'),
				clipboard = gui.Clipboard.get();
		
		var viewerConfig = store.get('Viewer') || {};
		var codeConfig = store.get('Code') || {};

		// var config = option.toJSON();

		function update(markdown, html, editor) {
			content = html;
			_viewer.update(content);
		}

		window.parent.ee.on('preferences.viewer.theme', function(value) {
			_viewer.setViewStyle(value);
		});

		window.parent.ee.on('preferences.code.theme', function(value) {
			_viewer.setCodeStyle(value);
		});
		
		window.parent.ee.on('preferences.viewer.clickableLink', function(value) {
			viewerConfig.clickableLink = value;
			// value ? viewer.allowLink() : viewer.blockLink() ;
		});
		
		window.ee.on('print.html', function(value) {
			_viewer.print();
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

		}, false);

		/**
		 * delegate right mouse down event
		 */
		_viewer.addEventListener('contextmenu', function(ev) {
			$(document.body).trigger('contextmenu', [ev]);
		}.bind(this), false);

		/* copy html to clipboard */
		window.ee.on('action.copy.html', function() {
			clipboard.set(content, 'text');
		});

		_viewer.onload = function() {
		}

		//linkable
		_viewer.ee.on('link', function(href) {
			if (viewerConfig.clickableLink) {
    		gui.Shell.openExternal(href);
			}
		});

		_viewer.setViewStyle(viewerConfig.theme || 'haroopad');
		_viewer.setCodeStyle(codeConfig.theme || 'solarized_light');

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
			}
		};
	});