define([
		'module',
		'require',
		'keyboard',
		'preferences/Editor.opt'
	],
	function(module, require, HotKey, Config) {
		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
					    mode: 'markdown',
					    lineNumbers: true,
					    theme: "solarized dark",
					    // keyMap: "vim",
					    electricChars: false,
					    viewportMargin: 40,
					    lineWrapping: true,
					    autofocus: true,
					    workDelay: 1000,
					    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
					  });

		HotKey('super-ctrl-l', function() {
			var lineNumbers = editor.getOption('lineNumbers');
			editor.setOption('lineNumbers', !lineNumbers);
		});
		HotKey('super-ctrl-v', function() {
			var map = editor.getOption('keyMap');
			editor.setOption('keyMap', map == 'vim' ? '' : 'vim');
		});

		Config.bind('change:theme', function(model, value, memo) {
			editor.setOption('theme', value);
			loadCss('js/vendors/codemirror-3.02/theme/'+ value +'.css');
		});

		Config.bind('change:displayLineNumber', function(model, value, memo) {
			editor.setOption('lineNumbers', value);
		});

		Config.bind('change:vimKeyBinding', function(model, value, memo) {
			editor.setOption('keyMap', value ? 'vim' : '');
		});

		Config.bind('change:insertFourSpace', function(model, value, memo) {
			editor.setOption('keyMap', value ? 'vim' : '');
		});
		
		module.exports = editor;
});