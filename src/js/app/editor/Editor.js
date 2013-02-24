define([
		'keyboard',
		'viewer',
		'preferences/Editor.opt',
		'preferences/General.opt'
	],
	function(HotKey, Viewer, editorOpt, generalOpt) {
		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
					    mode: 'markdown',
					    lineNumbers: true,
					    // theme: "solarized dark",
					    electricChars: false,
					    viewportMargin: 40,
					    lineWrapping: true,
					    autofocus: true,
					    workDelay: 1000,
					    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
					  });

		var editorConf = editorOpt.toJSON();
		var generalConf = generalOpt.toJSON();

		/**
		 * initialize editor
		 */
		editor.setOption('theme', editorConf.theme);
		editor.setOption('lineNumbers', editorConf.displayLineNumber);
		editor.setOption('keyMap', editorConf.vimKeyBinding ? 'vim' : 'default');
		editor.setOption('tabSize', editorConf.insertFourSpace ? 4 : 2);

		HotKey('super-ctrl-l', function() {
			var lineNumbers = editor.getOption('lineNumbers');
			editor.setOption('lineNumbers', !lineNumbers);
		});
		HotKey('super-ctrl-v', function() {
			var map = editor.getOption('keyMap');
			editor.setOption('keyMap', map == 'vim' ? '' : 'vim');
		});

		editorOpt.bind('change:theme', function(model, value, memo) {
			editor.setOption('theme', value);
		});

		editorOpt.bind('change:displayLineNumber', function(model, value, memo) {
			editor.setOption('lineNumbers', value);
		});

		editorOpt.bind('change:vimKeyBinding', function(model, value, memo) {
			editor.setOption('keyMap', value ? 'vim' : 'default');
		});

		editorOpt.bind('change:insertFourSpace', function(model, value, memo) {
			editor.setOption('tabSize', value ? 4 : 2);
		});

		function syncScrollHandler() {
			var scrollInfo = editor.getScrollInfo();
			Viewer.scroll(scrollInfo.top, scrollInfo.height - scrollInfo.clientHeight)
		}

		generalOpt.bind('change:enableSyncScroll', function(model, value, memo) {
			if(value) {
				editor.on('scroll', syncScrollHandler);
			} else {
				editor.off('scroll', syncScrollHandler);
			}
		});
		
		if(generalConf.enableSyncScroll) {
			editor.on('scroll', syncScrollHandler);
		} else {
			editor.off('scroll', syncScrollHandler);
		}

		return editor;
});