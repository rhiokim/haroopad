define([
		// 'editor/Parser',
		'store',
		'editor/Editor.keymap',
		'editor/Editor.drop'
	],
	function(store, Keymap, Drop) {
		var gui = require('nw.gui'),
    		win = gui.Window.get(),
    		clipboard = gui.Clipboard.get();

	    var _tid_;	//for throttle

	    var config = store.get('Editor') || {};
	    var generalConf = store.get('General') || {
	    	enableSyncScroll: true
	    };

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
					    extraKeys: Keymap,
  						showTrailingSpace: true/*,
					    dragDrop: true*/
					  });


		//ref: http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#functionstringcallback
		editor.on('drop', Drop);

		editor.on('dragover', function(cm, e) {
	    	var a = cm.coordsChar({ left:e.x, top: e.y });
	    	var doc = cm.getDoc();
	    	doc.setCursor(a);

	    	e.preventDefault();
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

		window.ee.on('action.h1', function() {
			CodeMirror.commands.markdownH1(editor);
		});
		window.ee.on('action.h2', function() {
			CodeMirror.commands.markdownH2(editor);
		});
		window.ee.on('action.h3', function() {
			CodeMirror.commands.markdownH3(editor);
		});
		window.ee.on('action.h4', function() {
			CodeMirror.commands.markdownH4(editor);
		});
		window.ee.on('action.h5', function() {
			CodeMirror.commands.markdownH5(editor);
		});
		window.ee.on('action.h6', function() {
			CodeMirror.commands.markdownH6(editor);
		});
		window.ee.on('action.strong', function() {
			CodeMirror.commands.markdownBold(editor);
		});
		window.ee.on('action.emphasize', function() {
			CodeMirror.commands.markdownItalic(editor);
		});
		window.ee.on('action.inlinecode', function() {
			CodeMirror.commands.markdownInlineCode(editor);
		});
		window.ee.on('action.link', function() {
			CodeMirror.commands.markdownLink(editor);
		});
		window.ee.on('action.strikethrough', function() {
			CodeMirror.commands.markdownStrike(editor);
		});
		window.ee.on('action.image', function() {
			CodeMirror.commands.markdownImage(editor);
		});
		window.ee.on('action.blockquote', function() {
			CodeMirror.commands.markdownBlockQuote(editor);
		});
		window.ee.on('action.orderlist', function() {
			CodeMirror.commands.markdownOrderedList(editor);
		});
		window.ee.on('action.unorderlist', function() {
			CodeMirror.commands.markdownUnOrderedList(editor);
		});
		window.ee.on('action.fencedcode', function() {
			CodeMirror.commands.markdownFencedCode(editor);
		});
		window.ee.on('action.table', function() {
			CodeMirror.commands.markdownTable(editor);
		});
		window.ee.on('action.comment', function() {
			CodeMirror.commands.markdownComment(editor);
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