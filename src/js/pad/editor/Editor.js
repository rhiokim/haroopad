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

    var config = store.get('Editor');
    alert(config)

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
					    // onDragEvent: dragDropHandler,
					    extraKeys: Keymap
					  });

		// var editorConf = editorOpt.toJSON();
		// var generalConf = generalOpt.toJSON();

		/* initialize editor */
		// editor.setOption('theme', editorConf.theme);
		// editor.setOption('lineNumbers', editorConf.displayLineNumber);
		// editor.setOption('keyMap', editorConf.vimKeyBinding ? 'vim' : 'default');
		// editor.setOption('tabSize', editorConf.insertFourSpace ? 4 : 2);
		// editor.setOption('autoCloseBrackets', editorConf.autoPairCharacters);

		/* hotkey area */
		// HotKey('defmod-ctrl-l', function() {
		//   var lineNumbers = editor.getOption('lineNumbers');
		//   editor.setOption('lineNumbers', !lineNumbers);
		// });
		// HotKey('defmod-ctrl-v', function() {
		//   var map = editor.getOption('keyMap');
		//   editor.setOption('keyMap', map == 'vim' ? '' : 'vim');
		// });
		
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
		// if(generalConf.enableSyncScroll) {
		//   editor.on('scroll', syncScrollHandler);
		// } else {
		//   editor.off('scroll', syncScrollHandler);
		// }

	    // /**
	    //  * 코드미러 내용 변경 이벤트 핸들러
	    //  * @return {[type]} [description]
	    //  */
	    // function changeHandler() {
	    //   res = Parser(editor.getValue());
	    //   win.emit('change.markdown', editor.getValue(), res, editor);
	    // }

	    // function delayChange() {
	    //   if(_tid_) {
	    //     clearTimeout(_tid_);
	    //   }

	    //   _tid_ = setTimeout(changeHandler, 300);
	    // }

		return editor;
});