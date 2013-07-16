(function() {

    function getState(cm, pos) {
      pos = pos || cm.getCursor('start');
      var stat = cm.getTokenAt(pos);
      if (!stat.type) return {};

      var types = stat.type.split(' ');

      var ret = {}, data, text;
      for (var i = 0; i < types.length; i++) {
        data = types[i];
        if (data === 'strong') {
          ret.bold = true;
        } else if (data === 'variable-2') {
          text = cm.getLine(pos.line);
          if (/^\s*\d+\.\s/.test(text)) {
            ret['ordered-list'] = true;
          } else {
            ret['unordered-list'] = true;
          }
        } else if (data === 'atom') {
          ret.quote = true;
        } else if (data === 'em') {
          ret.italic = true;
        }
      }
      return ret;
    }

    function action(name, cm) {
      var stat = getState(cm);

      var replaceSelection = function(start, end) {
        var text;
        var startPoint = cm.getCursor('start');
        var endPoint = cm.getCursor('end');
        if (stat[name]) {
          text = cm.getLine(startPoint.line);
          start = text.slice(0, startPoint.ch);
          end = text.slice(startPoint.ch);
          if (name === 'bold') {
            start = start.replace(/^(.*)?(\*|\_){2}(\S+.*)?$/, '$1$3');
            end = end.replace(/^(.*\S+)?(\*|\_){2}(\s+.*)?$/, '$1$3');
            startPoint.ch -= 2;
            endPoint.ch -= 2;
          } else if (name === 'italic') {
            start = start.replace(/^(.*)?(\*|\_)(\S+.*)?$/, '$1$3');
            end = end.replace(/^(.*\S+)?(\*|\_)(\s+.*)?$/, '$1$3');
            startPoint.ch -= 1;
            endPoint.ch -= 1;
          }
          cm.setLine(startPoint.line, start + end);
          cm.setSelection(startPoint, endPoint);
          cm.focus();
          return;
        }
        if (end === null) {
          end = '';
        } else {
          end = end || start;
        }
        text = cm.getSelection();
        cm.replaceSelection(start + text + end);

        startPoint.ch += start.length;
        endPoint.ch += start.length;

        cm.setSelection(startPoint, endPoint);
        cm.focus();
      };

      var toggleLine = function() {
        var startPoint = cm.getCursor('start');
        var endPoint = cm.getCursor('end');
        var repl = {
          quote: /^(\s*)\>\s+/,
          'unordered-list': /^(\s*)(\*|\-|\+)\s+/,
          'ordered-list': /^(\s*)\d+\.\s+/
        };
        var map = {
          quote: '> ',
          'unordered-list': '* ',
          'ordered-list': '1. '
        };
        for (var i = startPoint.line; i <= endPoint.line; i++) {
          (function(i) {
            var text = cm.getLine(i);
            if (stat[name]) {
              text = text.replace(repl[name], '$1');
            } else {
              text = map[name] + text;
            }
            cm.setLine(i, text);
          })(i);
        }
        cm.focus();
      };

      var addTable = function() {
        var text = cm.getSelection();
        cm.replaceSelection(text + '| column | column |\n'
                                 + '|--------|--------|\n'
                                 + '|        |        |');
      }

      switch (name) {
        case 'bold':
          replaceSelection('**');
          break;
        case 'strike':
          replaceSelection('~~', '~~');
          break;
        case 'italic':
          replaceSelection('*');
          break;
        case 'code':
          replaceSelection('`');
          break;
        case 'comment':
          replaceSelection('<!--', '-->');
          break;
        case 'link':
          replaceSelection('[', '](http://)');
          break;
        case 'image':
          replaceSelection('![', '](http://)');
          break;
        case 'fenced-code':
          replaceSelection('```\n', '\n```');
          break;
        case 'table':
            addTable();
          break;
        case 'quote':
        case 'unordered-list':
        case 'ordered-list':
          toggleLine();
          break;
        case 'undo':
          cm.undo();
          cm.focus();
          break;
        case 'redo':
          cm.redo();
          cm.focus();
          break;
      }
    };

  CodeMirror.commands.markdownBold = function(cm) {
    action('bold', cm);
    // var pos = cm.getCursor('end');
    
    // cm.replaceSelection('**'+ cm.getSelection() +'**');
    // pos.ch += 2;
    // cm.setCursor(pos);
    // cm.focus();
  };
  CodeMirror.commands.markdownItalic = function(cm) {
    action('italic', cm);
    // var pos = cm.getCursor('end');
    
    // cm.replaceSelection('*'+ cm.getSelection() +'*');
    // pos.ch += 1;
    // cm.setCursor(pos);
    // cm.focus();
  };
  CodeMirror.commands.markdownInlineCode = function(cm) {
    action('code', cm);
    // var pos = cm.getCursor('end');
    
    // cm.replaceSelection('*'+ cm.getSelection() +'*');
    // pos.ch += 1;
    // cm.setCursor(pos);
    // cm.focus();
  };
  CodeMirror.commands.markdownLink = function(cm) {
    action('link', cm);
    // var pos = cm.getCursor('end');
    
    // cm.replaceSelection('['+ cm.getSelection() +'](http://)');
    // pos.ch += 1;
    // cm.setCursor(pos);
    // cm.focus();
  };
  CodeMirror.commands.markdownStrike = function(cm) {
    action('strike', cm);
    // var pos = cm.getCursor('end');
    
    // cm.replaceSelection('~~'+ cm.getSelection() +'~~');
    // pos.ch += 2;
    // cm.setCursor(pos);
    // cm.focus();
  };
  CodeMirror.commands.markdownImage = function(cm) {
    action('image', cm);
    // var pos = cm.getCursor('end');
    
    // cm.replaceSelection('!['+ cm.getSelection() +'](http://)');
    // pos.ch += 2;
    // cm.setCursor(pos);
    // cm.focus();
  };
  CodeMirror.commands.markdownBlockQuote = function(cm) {
    action('quote', cm);
    // var pos = cm.getCursor('start');
    // var text = cm.getLine(pos.line);
    // cm.setLine(pos.line, '> ' + text);
    // cm.focus();
  };
  CodeMirror.commands.markdownUnOrderedList = function(cm) {
    action('unordered-list', cm);
    // var pos = cm.getCursor('start');
    // var text = cm.getLine(pos.line);
    // cm.setLine(pos.line, '* ' + text);
    // cm.focus();
  };
  CodeMirror.commands.markdownOrderedList = function(cm) {
    action('ordered-list', cm);
    // var pos = cm.getCursor('start');
    // var text = cm.getLine(pos.line);
    // cm.setLine(pos.line, '1. ' + text);
    // cm.focus();
  };

  CodeMirror.commands.markdownFencedCode = function(cm) {
    action('fenced-code', cm);
    // var pos = cm.getCursor('start');
    // var text = cm.getLine(pos.line);
    // cm.setLine(pos.line, '* ' + text);
    // cm.focus();
  };
  CodeMirror.commands.markdownTable = function(cm) {
    action('table', cm);
    // var pos = cm.getCursor('start');
    // var text = cm.getLine(pos.line);
    // cm.setLine(pos.line, '1. ' + text);
    // cm.focus();
  };
  CodeMirror.commands.markdownComment = function(cm) {
    action('comment', cm);
    // var pos = cm.getCursor('start');
    // var text = cm.getLine(pos.line);
    // cm.setLine(pos.line, '1. ' + text);
    // cm.focus();
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
