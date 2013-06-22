(function() {
  CodeMirror.commands.markdownBold = function(cm) {
    var pos = cm.getCursor('end');
    
    cm.replaceSelection('**'+ cm.getSelection() +'**');
    pos.ch += 2;
    cm.setCursor(pos);
    cm.focus();
  };
  CodeMirror.commands.markdownItalic = function(cm) {
    var pos = cm.getCursor('end');
    
    cm.replaceSelection('*'+ cm.getSelection() +'*');
    pos.ch += 1;
    cm.setCursor(pos);
    cm.focus();
  };
  CodeMirror.commands.markdownLink = function(cm) {
    var pos = cm.getCursor('end');
    
    cm.replaceSelection('['+ cm.getSelection() +'](http://)');
    pos.ch += 1;
    cm.setCursor(pos);
    cm.focus();
  };
  CodeMirror.commands.markdownStrike = function(cm) {
    var pos = cm.getCursor('end');
    
    cm.replaceSelection('~~'+ cm.getSelection() +'~~');
    pos.ch += 2;
    cm.setCursor(pos);
    cm.focus();
  };
  CodeMirror.commands.markdownImage = function(cm) {
    var pos = cm.getCursor('end');
    
    cm.replaceSelection('!['+ cm.getSelection() +'](http://)');
    pos.ch += 2;
    cm.setCursor(pos);
    cm.focus();
  };
  CodeMirror.commands.markdownBlockQuote = function(cm) {
    var pos = cm.getCursor('start');
    var text = cm.getLine(pos.line);
    cm.setLine(pos.line, '> ' + text);
    cm.focus();
  };
  CodeMirror.commands.markdownUnorderedList = function(cm) {
    var pos = cm.getCursor('start');
    var text = cm.getLine(pos.line);
    cm.setLine(pos.line, '* ' + text);
    cm.focus();
  };
  CodeMirror.commands.markdownOrderedList= function(cm) {
    var pos = cm.getCursor('start');
    var text = cm.getLine(pos.line);
    cm.setLine(pos.line, '1. ' + text);
    cm.focus();
  };
  CodeMirror.commands.markdownUndo = function(cm) {
    cm.undo();
    cm.focus();
  };
  CodeMirror.commands.markdownRedo = function(cm) {
    cm.redo();
    cm.focus();
  };
})();
