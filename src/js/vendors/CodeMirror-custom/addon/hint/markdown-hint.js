(function() {
  "use strict";

  var Pos = CodeMirror.Pos;

  function getHints(cm, options) {
    var tags = options && options.schemaInfo;
    
    if (!tags) return;
    
    var cur = cm.getCursor(),
      token = cm.getTokenAt(cur);
    var inner = CodeMirror.innerMode(cm.getMode(), token.state);
    
    if (inner.mode.name != "markdown") return;

    var markdown = '',
    replaceToken = true,
    tag = token.string.charAt(0),
    result = tags[tag] || [];

    var data = {
      list: result,
      from: replaceToken ? Pos(cur.line, token.start) : cur,
      to: replaceToken ? Pos(cur.line, token.end) : cur
    };

    // CodeMirror.on(data, 'select', function(md, el) {
    //   markdown = md;
    // });

    return data;
  }

  // CodeMirror.markdownHint = getHints; // deprecated
  CodeMirror.registerHelper("hint", "markdown", getHints);
})();