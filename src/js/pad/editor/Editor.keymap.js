define([
		'editor/Codemirror.markdown.keymap',
		'editor/Codemirror.markdown.hint'
	],
	function() {
		var keyMaps = {}, keyMapAutoCompletion;
		var gui = require('nw.gui'),
			win = gui.Window.get(),
			clipboard = gui.Clipboard.get();

		function _reKey(key) {
  		return key.replace('defmod', /Mac/.test(navigator.platform) ? 'Cmd' : 'Ctrl');
		}

		function cut(cm) {
			clipboard.set(cm.getSelection());
			cm.replaceSelection('');
		}

		function copy(cm) {
			clipboard.set(cm.getSelection());
		}

		function paste(cm) {
			// var pos = cm.getCursor();
			var str = clipboard.get();
			// pos.ch += str.length;

			cm.replaceSelection(str);
			cm.setCursor(cm.getCursor());
		}

		keyMaps[_reKey('defmod-X')] = cut;
		keyMaps[_reKey('defmod-C')] = copy;
		keyMaps[_reKey('defmod-V')] = paste;

		keyMaps[_reKey(__key('insert-md-header1'))] = 'markdownH1';
		keyMaps[_reKey(__key('insert-md-header2'))] = 'markdownH2';
		keyMaps[_reKey(__key('insert-md-header3'))] = 'markdownH3';
		keyMaps[_reKey(__key('insert-md-header4'))] = 'markdownH4';
		keyMaps[_reKey(__key('insert-md-header5'))] = 'markdownH5';
		keyMaps[_reKey(__key('insert-md-header6'))] = 'markdownH6';

		keyMaps[_reKey(__key('insert-md-bold'))] = 'markdownBold';
		keyMaps[_reKey(__key('insert-md-italic'))] = 'markdownItalic';
		keyMaps[_reKey(__key('insert-md-link'))] = 'markdownLink';
		keyMaps[_reKey(__key('insert-md-underline'))] = 'markdownUnderline';
		keyMaps[_reKey(__key('insert-md-inline-code'))] = 'markdownInlineCode';
		keyMaps[_reKey(__key('insert-md-embed'))] = 'markdownEmbed';
		keyMaps[_reKey(__key('insert-md-toc'))] = 'markdownTOC';
		keyMaps[_reKey(__key('insert-md-strike'))] = 'markdownStrike';
		keyMaps[_reKey(__key('insert-md-highlight'))] = 'markdownHighlight';
		keyMaps[_reKey(__key('insert-md-ordered-list'))] = 'markdownOrderedList';
		keyMaps[_reKey(__key('insert-md-unordered-list'))] = 'markdownUnOrderedList';
		keyMaps[_reKey(__key('insert-md-image'))] = 'markdownImage';
		keyMaps[_reKey(__key('insert-md-math-block'))] = 'markdownMathBlock';
		keyMaps[_reKey(__key('insert-md-math-inline'))] = 'markdownMathInline';
		keyMaps[_reKey(__key('insert-md-blockquote'))] = 'markdownBlockQuote';
		keyMaps[_reKey(__key('insert-md-section-break'))] = 'markdownSectionBreak';
		keyMaps[_reKey(__key('insert-md-page-break'))] = 'markdownPageBreak';
		keyMaps[_reKey(__key('insert-md-sentence-break'))] = 'markdownSentenceBreak';

		keyMaps['Enter'] = 'newlineAndIndentContinueMarkdownList';
		keyMaps['Shift-Tab'] = 'indentLess';
		keyMaps['Ctrl-Q'] = function(cm) { cm.foldCode(cm.getCursor()); };

		keyMapAutoCompletion = {
			// "'#'": 'markdownAutoComplete',
			"'!'": 'markdownAutoComplete',
			"'`'": 'markdownAutoComplete',
			"'$'": 'markdownAutoComplete',
			"'*'": 'markdownAutoComplete',
			"'~'": 'markdownAutoComplete',
			"'='": 'markdownAutoComplete',
			"'-'": 'markdownAutoComplete',
			"'_'": 'markdownAutoComplete',
			"'+'": 'markdownAutoComplete',
			"'@'": 'markdownAutoComplete'
		}
		keyMapAutoCompletion = merge(keyMapAutoCompletion, keyMaps);

		return {
			defaults: keyMaps,
			markdown: keyMapAutoCompletion
		}
	})
