define([
		'editor/Codemirror.markdown.keymap',
		'editor/Codemirror.markdown.hint'
	],
	function() {
		var keyMaps = {}, keyMapAutoCompletion;
		var gui = require('nw.gui'),
			win = gui.Window.get(),
			clipboard = gui.Clipboard.get();

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

		// keyMaps[__reKey({ key: 's', modifiers: 'cmd' })] = function() {};
		keyMaps[__reKey({ key: 'x', modifiers: 'cmd' })] = cut;
		keyMaps[__reKey({ key: 'c', modifiers: 'cmd' })] = copy;
		keyMaps[__reKey({ key: 'v', modifiers: 'cmd' })] = paste;

		keyMaps[__reKey(__kbd('insert_md_header1'))] = 'markdownH1';
		keyMaps[__reKey(__kbd('insert_md_header2'))] = 'markdownH2';
		keyMaps[__reKey(__kbd('insert_md_header3'))] = 'markdownH3';
		keyMaps[__reKey(__kbd('insert_md_header4'))] = 'markdownH4';
		keyMaps[__reKey(__kbd('insert_md_header5'))] = 'markdownH5';
		keyMaps[__reKey(__kbd('insert_md_header6'))] = 'markdownH6';

		keyMaps[__reKey(__kbd('insert_md_bold'))] = 'markdownBold';
		keyMaps[__reKey(__kbd('insert_md_italic'))] = 'markdownItalic';
		keyMaps[__reKey(__kbd('insert_md_link'))] = 'markdownLink';
		keyMaps[__reKey(__kbd('insert_md_underline'))] = 'markdownUnderline';
		keyMaps[__reKey(__kbd('insert_md_inline_code'))] = 'markdownInlineCode';
		keyMaps[__reKey(__kbd('insert_md_embed'))] = 'markdownEmbed';
		keyMaps[__reKey(__kbd('insert_md_footnotes'))] = 'markdownFootnotes';
		keyMaps[__reKey(__kbd('insert_md_footnotes_ref'))] = 'markdownFootnotesRef';
		keyMaps[__reKey(__kbd('insert_md_toc'))] = 'markdownTOC';
		keyMaps[__reKey(__kbd('insert_md_task'))] = 'markdownTask';
		keyMaps[__reKey(__kbd('insert_md_strike'))] = 'markdownStrike';
		keyMaps[__reKey(__kbd('insert_md_highlight'))] = 'markdownHighlight';
		keyMaps[__reKey(__kbd('insert_md_ordered_list'))] = 'markdownOrderedList';
		keyMaps[__reKey(__kbd('insert_md_unordered_list'))] = 'markdownUnOrderedList';
		keyMaps[__reKey(__kbd('insert_md_image'))] = 'markdownImage';
		keyMaps[__reKey(__kbd('insert_md_math_block'))] = 'markdownMathBlock';
		keyMaps[__reKey(__kbd('insert_md_math_inline'))] = 'markdownMathInline';
		keyMaps[__reKey(__kbd('insert_md_blockquote'))] = 'markdownBlockQuote';

		/* nw issue */
		keyMaps['Shift-Alt-Enter'] = 'markdownSectionBreak';
		keyMaps['Shift-Ctrl-Enter'] = 'markdownPageBreak';
		keyMaps['Shift-Ctrl-Alt-Enter'] = 'markdownSentenceBreak';
		/* nw issue */

		keyMaps['Enter'] = 'newlineAndIndentContinueMarkdownList';
		keyMaps['Shift-Tab'] = 'indentLess';

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
