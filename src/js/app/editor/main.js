define([
		'module'
	],
	function(moule) {
		
		return CodeMirror.fromTextArea(document.getElementById("code"), {
					    mode: 'markdown',
					    lineNumbers: true,
					    theme: "solarized dark",
					    keyMap: "vim",
					    viewportMargin: 40,
					    lineWrapping: true,
					    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
					  });
		
});