define([
		'editor/Codemirror.markdown.keymap'
	],
	function() {
		var keyMaps;
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

	  if (/Mac/.test(navigator.platform)) {
	    keyMaps = {
	    	'Cmd-1': 'markdownH1',
	    	'Cmd-2': 'markdownH2',
	    	'Cmd-3': 'markdownH3',
	    	'Cmd-4': 'markdownH4',
	    	'Cmd-5': 'markdownH5',
	    	'Cmd-6': 'markdownH6',
	      'Cmd-B': 'markdownBold',
	      'Cmd-I': 'markdownItalic',
	      'Cmd-L': 'markdownLink',
	      'Cmd-Y': 'markdownUnderline',
	      'Cmd-K': 'markdownInlineCode',
	      'Cmd-E': 'markdownEmbed',
	      'Cmd-T': 'markdownTOC',
	      'Cmd-Alt-S': 'markdownStrike',
	      'Cmd-Alt-H': 'markdownHighlight',
	      'Cmd-Alt-O': 'markdownOrderedList',
	      'Cmd-Alt-U': 'markdownUnOrderedList',
	      'Cmd-Alt-I': 'markdownImage',
	      'Cmd-Alt-M': 'markdownMathBlock',
	      'Cmd-Alt-J': 'markdownMathInline',
	      'Cmd-Alt-B': 'markdownBlockQuote',
	      'Cmd-Alt-Enter': 'markdownSectionBreak',
	      'Cmd-Alt-\'': 'markdownPageBreak',

	      'Cmd-X': cut,
	      'Cmd-C': copy,
	      'Cmd-V': paste
	    };

	  } else {
	    keyMaps = {
	    	'Ctrl-1': 'markdownH1',
	    	'Ctrl-2': 'markdownH2',
	    	'Ctrl-3': 'markdownH3',
	    	'Ctrl-4': 'markdownH4',
	    	'Ctrl-5': 'markdownH5',
	    	'Ctrl-6': 'markdownH6',
	      'Ctrl-B': 'markdownBold',
	      'Ctrl-I': 'markdownItalic',
	      'Ctrl-L': 'markdownLink',
	      'Ctrl-Y': 'markdownUnderline',
	      'Ctrl-K': 'markdownInlineCode',
	      'Ctrl-E': 'markdownEmbed',
	      'Ctrl-T': 'markdownTOC',
	      'Ctrl-Alt-S': 'markdownStrike',
	      'Ctrl-Alt-H': 'markdownHighlight',
	      'Ctrl-Alt-O': 'markdownOrderedList',
	      'Ctrl-Alt-U': 'markdownUnOrderedList',
	      'Ctrl-Alt-I': 'markdownImage',
	      'Ctrl-Alt-M': 'markdownMathBlock',
	      'Ctrl-Alt-J': 'markdownMathInline',
	      'Ctrl-Alt-B': 'markdownBlockQuote',
	      'Ctrl-Alt-Enter': 'markdownSectionBreak',
	      'Ctrl-Alt-\'': 'markdownPageBreak',

	      'Ctrl-X': cut,
	      'Ctrl-C': copy,
	      'Ctrl-V': paste
	    };
	  }

	  keyMaps['Enter'] = 'newlineAndIndentContinueMarkdownList';
	  keyMaps['Shift-Tab'] = 'indentLess';

	  return keyMaps;
})