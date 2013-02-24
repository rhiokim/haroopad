define([
		'keyboard',
		'preferences/Editor.opt'
	],
	function(HotKey, option) {
		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
					    mode: 'markdown',
					    lineNumbers: true,
					    // theme: "solarized dark",
					    electricChars: false,
					    viewportMargin: 40,
					    lineWrapping: true,
					    autofocus: true,
					    workDelay: 1000,
					    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
					  });
		var config = option.toJSON();

		/**
		 * initialize editor
		 */
		editor.setOption('theme', config.theme);
		editor.setOption('lineNumbers', config.displayLineNumber);
		editor.setOption('keyMap', config.vimKeyBinding ? 'vim' : 'default');
		editor.setOption('tabSize', config.insertFourSpace ? 4 : 2);

		HotKey('super-ctrl-l', function() {
			var lineNumbers = editor.getOption('lineNumbers');
			editor.setOption('lineNumbers', !lineNumbers);
		});
		HotKey('super-ctrl-v', function() {
			var map = editor.getOption('keyMap');
			editor.setOption('keyMap', map == 'vim' ? '' : 'vim');
		});

		option.bind('change:theme', function(model, value, memo) {
			editor.setOption('theme', value);
		});

		option.bind('change:displayLineNumber', function(model, value, memo) {
			editor.setOption('lineNumbers', value);
		});

		option.bind('change:vimKeyBinding', function(model, value, memo) {
			editor.setOption('keyMap', value ? 'vim' : 'default');
		});

		option.bind('change:insertFourSpace', function(model, value, memo) {
			editor.setOption('tabSize', value ? 4 : 2);
		});
		
		return editor;
});