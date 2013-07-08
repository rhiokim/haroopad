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
					    lineWrapping: true,
					    electricChars: false,
					    viewportMargin: 40,
					    tabSize: 2,
			        indentUnit: 4,
			        indentWithTabs: true,
					    autofocus: true,
					    workDelay: 1000,
					    dragDrop: false,
					    extraKeys: Keymap,
  						showTrailingSpace: true
					  });

		/* initialize editor */
		editor.setOption('theme', config.theme || 'solarized dark');
		editor.setOption('lineNumbers', config.displayLineNumber || true);
		editor.setOption('keyMap', config.vimKeyBinding ? 'vim' : 'default');
		editor.setOption('tabSize', config.insertFourSpace ? 4 : 2);
		editor.setOption('autoCloseBrackets', config.autoPairCharacters || true);
		
		window.ee.on('toggle.vim.keybind', function() {
		  var map = editor.getOption('keyMap');
		  editor.setOption('keyMap', map == 'vim' ? 'default' : 'vim');
		});

		window.ee.on('show.toggle.linenum', function() {
			var value = editor.getOption('lineNumbers') ? false : true;
			editor.setOption('lineNumbers', value);	
		});

		/* find & replace */
		window.ee.on('find.start', function() {
			CodeMirror.commands.find(editor);
		});
		window.ee.on('find.next', function() {
			CodeMirror.commands.findNext(editor);
		});
		window.ee.on('find.previous', function() {
			CodeMirror.commands.findPrev(editor);
		});
		window.ee.on('find.replace', function() {
			CodeMirror.commands.replace(editor);
		});
		window.ee.on('find.replace.all', function() {
			CodeMirror.commands.replaceAll(editor);
		});


		/* change preferences events */

		window.parent.ee.on('preferences.editor.theme', function(value) {
			editor.setOption('theme', value);
		});

		window.parent.ee.on('preferences.editor.displayLineNumber', function(value) {
			editor.setOption('lineNumbers', value);
		});

		window.parent.ee.on('preferences.editor.vimKeyBinding', function(value) {
			editor.setOption('keyMap', value ? 'vim' : 'default');
		});

		window.parent.ee.on('preferences.editor.insertFourSpace', function(value) {
			editor.setOption('tabSize', value ? 4 : 2);
		});
		
		window.parent.ee.on('preferences.editor.autoPairCharacters', function(value) {
			editor.setOption('autoCloseBrackets', value);
		});

		/* fire context menu event */
		if (!win._params.readOnly) {
			window.ee.on('context.cut', function(e) {
			  clipboard.set(editor.getSelection());
			  editor.replaceSelection('');
			});
			window.ee.on('context.copy', function() {
			  clipboard.set(editor.getSelection());
			});
			window.ee.on('context.paste', function() {
			  editor.replaceSelection(clipboard.get());
			});
			window.ee.on('context.select.all', function() {
			  editor.setSelection(0, 2);
			});
		}

		/**
		 * sync scroll handler
		 * @return {[type]} [description]
		 */
		function syncScrollHandler() {
		  var scrollInfo = editor.getScrollInfo();
		  var top = scrollInfo.top;
		  var per = scrollInfo.height - scrollInfo.clientHeight;
		
		  window.ee.emit('editor.scroll', top, per);
		}

		window.parent.ee.on('preferences.general.enableSyncScroll', function(value) {
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