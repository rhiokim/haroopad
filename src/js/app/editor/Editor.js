define([
		'module'
	],
	function(module) {
		
		module.exports = CodeMirror.fromTextArea(document.getElementById("code"), {
					    mode: 'markdown',
					    lineNumbers: true,
					    theme: "solarized dark",
					    keyMap: "vim",
					    viewportMargin: 40,
					    lineWrapping: true,
					    extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
					  });
		
});