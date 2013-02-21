define([
		'module',
		'keyboard'
	],
	function(module, HotKey) {
		var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
					    mode: 'markdown',
					    lineNumbers: true,
					    theme: "solarized dark",
					    // keyMap: "vim",
					    viewportMargin: 40,
					    lineWrapping: true,
					    autofocus: true,
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
		
		module.exports = editor;
});