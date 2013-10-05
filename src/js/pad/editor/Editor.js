define([
		// 'editor/Parser',
		'store',
		'editor/Editor.keymap',
		'editor/Editor.drop'
	],
	function(store, Keymap, Drop) {
		var moment = require('moment');

		var gui = require('nw.gui'),
			win = gui.Window.get(),
			clipboard = gui.Clipboard.get();

		var _tid_; //for throttle

		var config = store.get('Editor') || {
			displayLineNumber: true,
			autoPairCharacters: true,
			theme: 'solarized dark'
		};
		var generalConf = store.get('General') || {
			enableSyncScroll: true
		};

		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
			mode: 'markdown',
			lineNumbers: true,
			lineWrapping: true,
			electricChars: false,
			viewportMargin: 40,
			autofocus: true,
			workDelay: 1000,
			extraKeys: Keymap,
			showTrailingSpace: true
		});

		//ref: http://www.whatwg.org/specs/web-apps/current-work/multipage/dnd.html#functionstringcallback
		editor.on('drop', Drop);

		editor.on('dragover', function(cm, e) {
			var a = cm.coordsChar({
				left: e.x,
				top: e.y
			});
			var doc = cm.getDoc();
			doc.setCursor(a);

			e.preventDefault();
		});

		/* initialize editor */
		editor.setOption('theme', config.theme);
		editor.setOption('lineNumbers', config.displayLineNumber);
		editor.setOption('keyMap', config.vimKeyBinding ? 'vim' : 'default');
		editor.setOption('tabSize', config.tabSize || 4);
		editor.setOption('indentUnit', config.indentUnit || 4);
		editor.setOption('autoCloseBrackets', config.autoPairCharacters);

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

		if (generalConf.enableSyncScroll) {
			editor.on('scroll', syncScrollHandler);
		} else {
			editor.off('scroll', syncScrollHandler);
		}


		/* change theme */
		function changeTheme(value) {
			editor.setOption('theme', value);
		}

		/* toggle line number */
		function toggleLineNumber(value) {
			editor.setOption('lineNumbers', value);
		}

		/* toggle vim key binding */
		function toggleVim(value) {
			editor.setOption('keyMap', value ? 'vim' : 'default');
		}

		/* toggle auto pair char */
		function toggleAutoPairChar(value) {
			editor.setOption('autoCloseBrackets', value);
		}

		/* toggle sync scroll */
		function toggleSyncScroll(value) {
			if (value) {
				editor.on('scroll', syncScrollHandler);
			} else {
				editor.off('scroll', syncScrollHandler);
			}
		}

		window.parent.ee.on('preferences.general.enableSyncScroll', toggleSyncScroll);

		window.parent.ee.on('preferences.editor.theme', changeTheme);
		window.parent.ee.on('preferences.editor.displayLineNumber', toggleLineNumber);
		window.parent.ee.on('preferences.editor.vimKeyBinding', toggleVim);
		window.parent.ee.on('preferences.editor.autoPairCharacters', toggleAutoPairChar);

		nw.on('destroy', function() {
			window.parent.ee.off('preferences.general.enableSyncScroll', toggleSyncScroll);

			window.parent.ee.off('preferences.editor.theme', changeTheme);
			window.parent.ee.off('preferences.editor.displayLineNumber', toggleLineNumber);
			window.parent.ee.off('preferences.editor.vimKeyBinding', toggleVim);
			window.parent.ee.off('preferences.editor.autoPairCharacters', toggleAutoPairChar);
		});

		window.ee.on('toggle.vim.keybind', function() {
			var map = editor.getOption('keyMap');
			editor.setOption('keyMap', map == 'vim' ? 'default' : 'vim');
		});

		window.ee.on('show.toggle.linenum', function() {
			var value = !editor.getOption('lineNumbers');
			editor.setOption('lineNumbers', value);
		});

		/* edit */
		if (nw.file && !nw.file.get('readOnly')) {
			window.ee.on('menu.edit.undo', function() {
				editor.undo();
			});
			window.ee.on('menu.edit.redo', function() {
				editor.redo();
			});
			window.ee.on('menu.edit.cut', function() {
				clipboard.set(editor.getSelection());
				editor.replaceSelection('');
			});
			window.ee.on('menu.edit.copy', function() {
				clipboard.set(editor.getSelection());
			});
			window.ee.on('menu.edit.paste', function() {
	            var pos = editor.getCursor();
	            var str = clipboard.get();
	            pos.ch += str.length;
	            
				editor.replaceSelection(clipboard.get());
	            editor.setCursor(pos);
			});
			window.ee.on('menu.edit.delete', function() {
				editor.replaceSelection('');
			});
			window.ee.on('menu.edit.selectall', function() {
		        editor.setSelection({line:0, ch:0}, {line:editor.lineCount(), ch:0});
			});
		}

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

		window.ee.on('insert.page.break', function() {
			CodeMirror.commands.markdownPageBreak(editor);
		});
		window.ee.on('insert.section.break', function() {
			CodeMirror.commands.markdownSectionBreak(editor);
		});

		window.ee.on('insert.toc', function() {
		});
		window.ee.on('insert.date', function() {
			editor.replaceSelection(moment().format('dddd, MMMM Do YYYY'));
		});
		window.ee.on('insert.filename', function() {
			editor.replaceSelection(nw.file.get('basename'));
		});

		/* fire context menu event */
		if (nw.file && !nw.file.get('readOnly')) {
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
			window.ee.on('context.delete', function() {
				editor.replaceSelection('');
			});
			window.ee.on('context.selectall', function() {
		        editor.setSelection({line:0, ch:0}, {line:editor.lineCount(), ch:0});
			});
		} else {
			editor.setOption('readOnly', true);
		}


		var gutters = document.querySelector('.CodeMirror-gutters')
		window.onresize = function() {
			gutters.style.height = '5000px';
		}

		return editor;
	});