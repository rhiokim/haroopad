define([
		'store'
	], 
	function(store) {
		var iframe = $('#haroo iframe')[0];
		var viewer = iframe.contentWindow;
		var content = '',
			options;

		var gui = require('nw.gui'),
				win = gui.Window.get(),
				clipboard = gui.Clipboard.get();
		
		var viewerConfig = store.get('Viewer') || {};
		var codeConfig = store.get('Code') || {};

		// var config = option.toJSON();

		window.parent.win.on('preferences.viewer.theme', function(value) {
			viewer.setViewStyle(value);
		});

		window.parent.win.on('preferences.code.theme', function(value) {
			viewer.setCodeStyle(value);
		});
		
		window.parent.win.on('preferences.viewer.clickableLink', function(value) {
			value ? viewer.allowLink() : viewer.blockLink() ;
		});


		viewer.setViewStyle(viewerConfig.theme || 'haroopad');
		viewer.setCodeStyle(codeConfig.theme || 'solarized_light');
		viewerConfig.clickableLink ? viewer.allowLink() : viewer.blockLink() ;
		
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
		$(viewer).mousedown(function(e) {
			if (e.which === 3) {
				$(viewer.top).trigger('mousedown', [e]);
	    }
		});

		/* copy html to clipboard */
		win.on('action.copy.html', function() {
			clipboard.set(content, 'text');
		});

		function update(markdown, html, editor) {
			content = html;
			viewer.update(content);

			// config.clickableLink ? viewer.allowLink() : viewer.blockLink();
		}

		/* change markdown event handler */
		win.on('change.markdown', update);

		/* scroll editor for sync */
		win.on('editor.scroll', function(top, per) {
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