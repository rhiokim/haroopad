define([
		// 'editor/Parser',
		'store',
		'editor/Editor.keymap'
	],
	function(store, Keymap) {
		var gui = require('nw.gui'),
    		win = gui.Window.get(),
    		clipboard = gui.Clipboard.get();

    var _tid_;	//for throttle

    var config = store.get('Editor') || {};
    var generalConf = store.get('General') || {};

		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
					    mode: 'markdown',
					    theme: 'solarized dark',
					    lineNumbers: true,
					    electricChars: false,
					    viewportMargin: 40,
					    lineWrapping: true,
					    autofocus: true,
					    workDelay: 1000,
					    dragDrop: false,
					    extraKeys: Keymap
					  });

		/* initialize editor */
		editor.setOption('theme', config.theme || 'solarized dark');
		editor.setOption('lineNumbers', config.displayLineNumber || true);
		editor.setOption('keyMap', config.vimKeyBinding ? 'vim' : 'default');
		editor.setOption('tabSize', config.insertFourSpace ? 4 : 2);
		editor.setOption('autoCloseBrackets', config.autoPairCharacters || true);
		
		win.on('toggle.vim.keybind', function() {
		  var map = editor.getOption('keyMap');
		  editor.setOption('keyMap', map == 'vim' ? '' : 'vim');
		});

		win.on('show.toggle.linenum', function() {
			var value = editor.getOption('lineNumbers') ? false : true;
			editor.setOption('lineNumbers', value);	
		});

		/* change preferences events */

		window.parent.win.on('preferences.editor.theme', function(value) {
			editor.setOption('theme', value);
		});

		window.parent.win.on('preferences.editor.displayLineNumber', function(value) {
			editor.setOption('lineNumbers', value);
		});

		window.parent.win.on('preferences.editor.vimKeyBinding', function(value) {
			editor.setOption('keyMap', value ? 'vim' : 'default');
		});

		window.parent.win.on('preferences.editor.insertFourSpace', function(value) {
			editor.setOption('tabSize', value ? 4 : 2);
		});
		
		window.parent.win.on('preferences.editor.autoPairCharacters', function(value) {
			editor.setOption('autoCloseBrackets', value);
		});

		/* fire context menu event */
		win.on('context.cut', function(e) {
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

		/**
		 * sync scroll handler
		 * @return {[type]} [description]
		 */
		function syncScrollHandler() {
		  var scrollInfo = editor.getScrollInfo();
		  var top = scrollInfo.top;
		  var per = scrollInfo.height - scrollInfo.clientHeight;
		
		  win.emit('editor.scroll', top, per);
		}

		window.parent.win.on('preferences.general.enableSyncScroll', function(value) {
			if (value) {
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