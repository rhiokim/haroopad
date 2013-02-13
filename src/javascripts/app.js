
var res;
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  mode: 'markdown',
  lineNumbers: false,
  theme: "solarized dark",
  keyMap: "vim",
  viewportMargin: 40,
  lineWrapping: true,
  extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"}
});

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (lang === 'js') {
      //TODO
      // return highlighter.javascript(code);
    }
    return code;
  }
});

function changeHandler() {
  res = marked(editor.getValue());
  $('#haroo article').html(res);
}

editor.on("change", changeHandler);
changeHandler();

$('#fileDialog').trigger('click');          
$('#fileDialog').change(function(evt) {
  console.log($(this).val());
});


