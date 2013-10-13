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
	      'Cmd-B': 'markdownBold',
	      'Cmd-I': 'markdownItalic',
	      'Cmd-L': 'markdownLink',
	      'Cmd-Y': 'markdownUnderline',
	      'Cmd-K': 'markdownInlineCode',
	      'Cmd-Alt-S': 'markdownStrike',
	      'Cmd-Alt-H': 'markdownHighlight',
	      'Cmd-Alt-O': 'markdownOrderedList',
	      'Cmd-Alt-U': 'markdownUnOrderedList',
	      'Cmd-Alt-I': 'markdownImage',
	      'Cmd-Alt-B': 'markdownBlockQuote',
	      'Cmd-Alt-Enter': 'markdownSectionBreak',
	      'Cmd-Alt-\'': 'markdownPageBreak',

	      'Cmd-X': cut,
	      'Cmd-C': copy,
	      'Cmd-V': paste
	    };

	  } else {
	    keyMaps = {
	      'Ctrl-B': 'markdownBold',
	      'Ctrl-I': 'markdownItalic',
	      'Ctrl-L': 'markdownLink',
	      'Ctrl-Y': 'markdownUnderline',
	      'Ctrl-K': 'markdownInlineCode',
	      'Ctrl-Alt-S': 'markdownStrike',
	      'Ctrl-Alt-H': 'markdownHighlight',
	      'Ctrl-Alt-O': 'markdownOrderedList',
	      'Ctrl-Alt-U': 'markdownUnOrderedList',
	      'Ctrl-Alt-I': 'markdownImage',
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