define([], function() {

  var tags = {
    "#": ["## ", "### ", "#### ", "##### ", "###### "],
    "$": ["$$", "$$$"],
    "`": ["`", "```"],
    "!": ["![]()"],
    "~": ["~~"],
    "*": ["*", "**", "* * *"],
    "-": ["-", "- - -"],
    "@": ["@[]()"]
  };

  function markdownAutoComplete(cm, pred) {
    var cur = cm.getCursor();

    if (!pred || pred()) setTimeout(function() {
      if (!cm.state.completionActive)
        CodeMirror.showHint(cm, CodeMirror.hint.markdown, {
          schemaInfo: tags,
          completeSingle: false
        });
    }, 100);

    return CodeMirror.Pass;
  }

  CodeMirror.commands.markdownAutoComplete = markdownAutoComplete;

});