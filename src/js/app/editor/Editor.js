define([
		'keyboard',
		'viewer',
		'editor/Editor.keymap',
		'preferences/Editor.opt',
		'preferences/General.opt'
	],
	function(HotKey, Viewer, Keymap, editorOpt, generalOpt) {
		var gui = require('nw.gui'),
      	win = gui.Window.get(),
      	clipboard = gui.Clipboard.get();

		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
					    mode: 'markdown',
					    lineNumbers: true,
					    electricChars: false,
					    viewportMargin: 40,
					    lineWrapping: true,
					    autofocus: true,
					    workDelay: 1000,
					    dragDrop: false,
					    // onDragEvent: dragDropHandler,
					    extraKeys: Keymap
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
		editor.setOption('autoCloseBrackets', editorConf.autoPairCharacters);

		/**
		 * hotkey area
		 */
		HotKey('defmod-ctrl-l', function() {
			var lineNumbers = editor.getOption('lineNumbers');
			editor.setOption('lineNumbers', !lineNumbers);
		});
		HotKey('defmod-ctrl-v', function() {
			var map = editor.getOption('keyMap');
			editor.setOption('keyMap', map == 'vim' ? '' : 'vim');
		});

		/**
		 * change preferences events
		 */
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

		editorOpt.bind('change:autoPairCharacters', function(model, value, memo) {
			editor.setOption('autoCloseBrackets', value);
		});

		/**
		 * fire context menu event
		 */

		win.on('context.cut', function() {
			clipboard.set(editor.getSelection());
			editor.replaceSelection('');
		});
		win.on('context.copy', function() {
			clipboard.set(editor.getSelection());
		});
		win.on('context.paste', function() {
			editor.replaceSelection(clipboard.get());
		});
		win.on('context.select.all', function() {
			editor.setSelection(0, 2);
		});

		function dragDropHandler(cm, e) {
			e.preventDefault();
			return false;
		}
		/**
		 * sync scroll handler
		 * @return {[type]} [description]
		 */
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