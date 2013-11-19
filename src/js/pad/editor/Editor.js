define([
		// 'editor/Parser',
		'keyboard',
		'store',
		'editor/Editor.keymap',
		'editor/Editor.drop'
	],
	function(HotKey, store, Keymap, Drop) {
		var moment = require('moment');

		var gui = require('nw.gui'),
			win = gui.Window.get(),
			clipboard = gui.Clipboard.get();

		var _tid_; //for throttle

		var MIN_FONT_SIZE = 9;
		var MAX_FONT_SIZE = 30;

		var config = store.get('Editor') || {
			displayLineNumber: true,
			autoPairCharacters: true,
			theme: 'solarized dark'
		};
		config.fontSize = Number(config.fontSize || 13);
		var generalConf = store.get('General') || {
			enableSyncScroll: true
		};

		var editor = nw.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
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

		var CodeMirrorElement = document.querySelector('.CodeMirror'),
			CodeMirrorGutters = document.querySelector('.CodeMirror-gutters'),
			CodeMirrorCode = document.querySelector('.CodeMirror-code');

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

		function setFontSize(value) {
			CodeMirrorElement.style.fontSize = value + 'px';
		}
		
		editor.setOption('theme', config.theme);
		editor.setOption('lineNumbers', config.displayLineNumber);
		editor.setOption('keyMap', config.vimKeyBinding ? 'vim' : 'default');
		editor.setOption('tabSize', config.tabSize || 4);
		editor.setOption('indentUnit', config.indentUnit || 4);
		editor.setOption('autoCloseBrackets', config.autoPairCharacters);

		//TODO FIXME
		function setFontFmaily() {
			var all = document.styleSheets,
			    s = all[all.length - 1],
			    l = s.cssRules.length;

			if (s.insertRule) {
			    s.insertRule(".CodeMirror { font-family: Menlo, Monaco, 'Andale Mono','lucida console','Courier New', monospace, 'Segoe UI', 'Malgun Gothic', AppleSDGothicNeo-Regular !important; }", l);
			}
			// CodeMirrorElement.style.fontFamily = "Monaco, Menlo, 'Segoe UI', 'Malgun Gothic', AppleSDGothicNeo-Regular";
		}

		setFontSize(config.fontSize);
		setFontFmaily();

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

			global._gaq.push('haroopad.preferences', 'theme', value);
		}

		/* change font size */

		function changeFontSize(value) {
			setFontSize(value);

			global._gaq.push('haroopad.preferences', 'fontSize', value);
		}

		/* toggle line number */

		function toggleLineNumber(value) {
			editor.setOption('lineNumbers', value);

			global._gaq.push('haroopad.preferences', 'editor', 'lineNumbers: ' + value);
		}

		/* toggle vim key binding */

		function toggleVim(value) {
			editor.setOption('keyMap', value ? 'vim' : 'default');

			global._gaq.push('haroopad.preferences', 'editor', 'vim: ' + value);
		}

		/* toggle auto pair char */

		function toggleAutoPairChar(value) {
			editor.setOption('autoCloseBrackets', value);

			global._gaq.push('haroopad.preferences', 'editor', 'autoCloseBrackets: ' + value);
		}

		/* toggle sync scroll */

		function toggleSyncScroll(value) {
			if (value) {
				editor.on('scroll', syncScrollHandler);
			} else {
				editor.off('scroll', syncScrollHandler);
			}

			global._gaq.push('haroopad.preferences', 'editor', 'syncScroll: ' + value);
		}

		window.parent.ee.on('preferences.general.enableSyncScroll', toggleSyncScroll);

		window.parent.ee.on('preferences.editor.theme', changeTheme);
		window.parent.ee.on('preferences.editor.displayLineNumber', toggleLineNumber);
		window.parent.ee.on('preferences.editor.vimKeyBinding', toggleVim);
		window.parent.ee.on('preferences.editor.autoPairCharacters', toggleAutoPairChar);
		window.parent.ee.on('preferences.editor.fontSize', changeFontSize);

		nw.on('destroy', function() {
			window.parent.ee.off('preferences.general.enableSyncScroll', toggleSyncScroll);

			window.parent.ee.off('preferences.editor.theme', changeTheme);
			window.parent.ee.off('preferences.editor.displayLineNumber', toggleLineNumber);
			window.parent.ee.off('preferences.editor.vimKeyBinding', toggleVim);
			window.parent.ee.off('preferences.editor.autoPairCharacters', toggleAutoPairChar);
		});

		window.ee.on('toggle.vim.keybind', function() {
			var map = editor.getOption('keyMap');
			// map == 'vim' ? 'default' : 'vim';
			toggleVim(map != 'vim')
		});
		window.ee.on('menu.view.toggle.vim', function() {
			window.ee.emit('toggle.vim.keybind');
		});

		window.ee.on('show.toggle.linenum', function() {
			var value = !editor.getOption('lineNumbers');
			toggleLineNumber(value);
		});

		window.ee.on('menu.view.editor.font.size', function(value) {
			config.fontSize += value;

			if (MIN_FONT_SIZE > config.fontSize || MAX_FONT_SIZE < config.fontSize) {

				config.fontSize -= value;
				return;
			}

			setFontSize(config.fontSize);
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
				var str = clipboard.get();

				editor.replaceSelection(str);
				editor.setCursor(editor.getCursor());
			});
			window.ee.on('menu.edit.delete', function() {
				editor.replaceSelection('');
			});
			window.ee.on('menu.edit.selectall', function() {
				editor.setSelection({
					line: 0,
					ch: 0
				}, {
					line: editor.lineCount(),
					ch: 0
				});
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

		window.ee.on('menu.insert.markdown', function(tag) {
			switch(tag) {
				case 'h1': CodeMirror.commands.markdownH1(editor); break;
				case 'h2': CodeMirror.commands.markdownH2(editor); break;
				case 'h3': CodeMirror.commands.markdownH3(editor); break;
				case 'h4': CodeMirror.commands.markdownH4(editor); break;
				case 'h5': CodeMirror.commands.markdownH5(editor); break;
				case 'h6': CodeMirror.commands.markdownH6(editor); break;

				case 'strong': CodeMirror.commands.markdownBold(editor); break;
				case 'i': CodeMirror.commands.markdownItalic(editor); break;
				case 'code': CodeMirror.commands.markdownInlineCode(editor); break;
				case 'a': CodeMirror.commands.markdownLink(editor); break;
				case 'u': CodeMirror.commands.markdownUnderline(editor); break;
				case 'del': CodeMirror.commands.markdownStrike(editor); break;
				case 'highlight': CodeMirror.commands.markdownHighlight(editor); break;
				case 'image': CodeMirror.commands.markdownImage(editor); break;
				case 'blockquote': CodeMirror.commands.markdownBlockQuote(editor); break;
				case 'ol': CodeMirror.commands.markdownOrderedList(editor); break;
				case 'li': CodeMirror.commands.markdownUnOrderedList(editor); break;
				case 'precode': CodeMirror.commands.markdownFencedCode(editor); break;
				case 'table': CodeMirror.commands.markdownTable(editor); break;
				case 'comment': CodeMirror.commands.markdownComment(editor); break;
				case 'embed': CodeMirror.commands.markdownEmbed(editor); break;
				case 'math-inline': CodeMirror.commands.markdownMathInline(editor); break;
				case 'math-block': CodeMirror.commands.markdownMathInBlock(editor); break;
			}

			global._gaq.push('haroopad.insert', 'markdown', tag);
		});

		window.ee.on('insert.page.break', function() {
			CodeMirror.commands.markdownPageBreak(editor);

			global._gaq.push('haroopad.insert', 'markdown', 'page break');
		});
		window.ee.on('insert.section.break', function() {
			CodeMirror.commands.markdownSectionBreak(editor);

			global._gaq.push('haroopad.insert', 'markdown', 'section break');
		});

		window.ee.on('insert.toc', function() {
			global._gaq.push('haroopad.insert', 'TOC', '');
		});

		window.ee.on('insert.date', function(format) {
			editor.replaceSelection(moment().format(format));
			editor.setCursor(editor.getCursor());

			global._gaq.push('haroopad.insert', 'datetime', format);
		});

		window.ee.on('insert.filename', function() {
			editor.replaceSelection(nw.file.get('basename'));
			editor.setCursor(editor.getCursor());

			global._gaq.push('haroopad.insert', 'filename', '');
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
				editor.replaceSelection(clipboard.get('text'));
			});
			window.ee.on('context.delete', function() {
				editor.replaceSelection('');
			});
			window.ee.on('context.selectall', function() {
				editor.setSelection({
					line: 0,
					ch: 0
				}, {
					line: editor.lineCount(),
					ch: 0
				});
			});
		} else {
			editor.setOption('readOnly', true);
		}


		window.onresize = function() {
			CodeMirrorGutters.style.height = '5000px';
		}

		HotKey('defmod-alt-.', function() {
			window.ee.emit('menu.view.editor.font.size', 1);
		});
		HotKey('defmod-alt-,', function() {
			window.ee.emit('menu.view.editor.font.size', -1);
		});

		// HotKey('defmod-1', function() {
		// 	window.ee.emit('menu.insert.markdown', 'h1');
		// });
		// HotKey('defmod-2', function() {
		// 	window.ee.emit('menu.insert.markdown', 'h2');
		// });
		// HotKey('defmod-3', function() {
		// 	window.ee.emit('menu.insert.markdown', 'h3');
		// });
		// HotKey('defmod-4', function() {
		// 	window.ee.emit('menu.insert.markdown', 'h4');
		// });
		// HotKey('defmod-5', function() {
		// 	window.ee.emit('menu.insert.markdown', 'h5');
		// });
		// HotKey('defmod-6', function() {
		// 	window.ee.emit('menu.insert.markdown', 'h6');
		// });

		HotKey('shift-ctrl-1', function() {
			window.ee.emit('insert.date', 'l');
		});
		HotKey('shift-ctrl-2', function() {
			window.ee.emit('insert.date', 'L');
		});
		HotKey('shift-ctrl-3', function() {
			window.ee.emit('insert.date', 'll');
		});
		HotKey('shift-ctrl-4', function() {
			window.ee.emit('insert.date', 'LL');
		});
		HotKey('shift-ctrl-5', function() {
			window.ee.emit('insert.date', 'lll');
		});
		HotKey('shift-ctrl-6', function() {
			window.ee.emit('insert.date', 'LLL');
		});
		HotKey('shift-ctrl-7', function() {
			window.ee.emit('insert.date', 'llll');
		});
		HotKey('shift-ctrl-8', function() {
			window.ee.emit('insert.date', 'LLLL');
		});

		return editor;
	});