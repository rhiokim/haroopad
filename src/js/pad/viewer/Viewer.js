define([
		// 'preferences/Viewer.opt'
	], 
	function(/*option*/) {
		var iframe = $('#haroo iframe')[0];
		var viewer = iframe.contentWindow;
		var content = '',
			options;

		var gui = require('nw.gui'),
				win = gui.Window.get(),
				clipboard = gui.Clipboard.get();
		
		// var config = option.toJSON();

		// option.bind('change:viewStyle', function(model, value) {
		// 	config = model.toJSON();
		// 	iframe.src = 'viewer.html?view='+ value +'&code='+ config.codeStyle;
		// });
		
		// option.bind('change:codeStyle', function(model, value) {
		// 	config = model.toJSON();
		// 	iframe.src = 'viewer.html?view='+ config.viewStyle +'&code='+ value;
		// });

		// option.bind('change:clickableLink', function(model, value) {
		// 	value ? viewer.allowLink() : viewer.blockLink() ;
		// });

		// iframe.src = 'viewer.html?view='+ config.viewStyle +'&code='+ config.codeStyle;

		$(iframe).bind('load', function(e) {
			// viewer.setViewStyle(config.viewStyle);
			// viewer.setCodeStyle(config.codeStyle);
			viewer.init(options);
			viewer.update(content);

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

				    // viewer.top.dispatchEvent(evt);
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
			
		});

		/* copy html to clipboard */
		win.on('copy.html', function() {
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