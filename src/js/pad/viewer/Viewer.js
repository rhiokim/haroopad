define([
		'store'
	], 
	function(store) {
		var iframe = $('#haroo iframe')[0];
		var viewer = iframe.contentWindow;
		var content = '',
			options;

		var gui = require('nw.gui'),
				clipboard = gui.Clipboard.get();
		
		var viewerConfig = store.get('Viewer') || {};
		var codeConfig = store.get('Code') || {};

		// var config = option.toJSON();

		window.parent.ee.on('preferences.viewer.theme', function(value) {
			viewer.setViewStyle(value);
		});

		window.parent.ee.on('preferences.code.theme', function(value) {
			viewer.setCodeStyle(value);
		});
		
		window.parent.ee.on('preferences.viewer.clickableLink', function(value) {
			viewerConfig.clickableLink = value;
			// value ? viewer.allowLink() : viewer.blockLink() ;
		});
		
		window.ee.on('print.html', function(value) {
			viewer.print();
		});

		//linkable
		viewer.ee.on('link', function(href) {
			if (viewerConfig.clickableLink) {
    		gui.Shell.openExternal(href);
			}
		});

		viewer.setViewStyle(viewerConfig.theme || 'haroopad');
		viewer.setCodeStyle(codeConfig.theme || 'solarized_light');
		
		/**
		 * delegate to parent window key mouse down event
		 */
		viewer.addEventListener('keydown', function(e) {

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
		viewer.addEventListener('contextmenu', function(ev) {
			$(document.body).trigger('contextmenu', [ev]);
		}.bind(this), false);

		/* copy html to clipboard */
		window.ee.on('action.copy.html', function() {
			clipboard.set(content, 'text');
		});

		function update(markdown, html, editor) {
			content = html;
			viewer.update(content);
		}

		/* change markdown event handler */
		window.ee.on('change.after.markdown', update);

		/* scroll editor for sync */
		window.ee.on('editor.scroll', function(top, per) {
			viewer.scrollTop(top * 100 / per);
		});

		return {
			init: function(opt) {
				options = opt;
				viewer.init(options);
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