define([
		'editor/Codemirror.markdown.keymap'
	],
	function() {
		var keyMaps;

	  if (/Mac/.test(navigator.platform)) {
	    keyMaps = {
	      'Cmd-B': 'markdownBold',
	      'Cmd-I': 'markdownItalic',
	      'Cmd-L': 'markdownLink',
	      'Shift-Cmd-S': 'markdownStrike',
	      'Shift-Cmd-O': 'markdownOrderedList',
	      'Shift-Cmd-U': 'markdownUnorderedList',
	      'Shift-Cmd-I': 'markdownImage',
	      'Shift-Cmd-B': 'markdownBlockQuote'
	    };

	  } else {
	    keyMaps = {
	      'Ctrl-B': 'markdownBold',
	      'Ctrl-I': 'markdownItalic',
	      'Ctrl-L': 'markdownLink',
	      'Shift-Ctrl-S': 'markdownStrike',
	      'Shift-Ctrl-O': 'markdownOrderedList',
	      'Shift-Ctrl-U': 'markdownUnorderedList',
	      'Shift-Ctrl-I': 'markdownImage',
	      'Shift-Ctrl-B': 'markdownBlockQuote'
	    };
	  }

	  keyMaps['Enter'] = 'newlineAndIndentContinueMarkdownList';

	  return keyMaps;
})