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
          'unordered-list': '- ',
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

      var headerMap = {
          '1': '#',
          '2': '##',
          '3': '###',
          '4': '####',
          '5': '#####',
          '6': '######'
        };
      var toggleHeader = function(depth) {
        var startPoint = cm.getCursor('start');
        var endPoint = cm.getCursor('end');
        var h, repl = /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/;

        var text = cm.getLine(startPoint.line);

        if (repl.test(text)) {
          h = text.replace(repl, '$1');
          text = text.replace(repl, '$2'); 

          if (h == headerMap[depth]) {
            cm.setLine(startPoint.line, text);
            cm.focus();
            return;
          }
        }
        
        text = headerMap[depth] +' '+ text;
        cm.setLine(startPoint.line, text);
        cm.focus();
      }

      switch (name) {
        case 'h1':
          toggleHeader(1);
          break;
        case 'h2':
          toggleHeader(2);
          break;
        case 'h3':
          toggleHeader(3);
          break;
        case 'h4':
          toggleHeader(4);
          break;
        case 'h5':
          toggleHeader(5);
          break;
        case 'h6':
          toggleHeader(6);
          break;
        case 'bold':
          replaceSelection('**');
          break;
        case 'math-block':
          replaceSelection('$$\n', '\n$$');
          break;
        case 'math-line':
          replaceSelection('$$\n', '\n$$');
          break;
        case 'highlight':
          replaceSelection('==');
          break;
        case 'strike':
          replaceSelection('~~', '~~');
          break;
        case 'italic':
          replaceSelection('*');
          break;
        case 'underline':
          replaceSelection('_');
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
        case 'embed':
          replaceSelection('@[](', ')');
          break;
        case 'fenced-code':
          replaceSelection('```\n', '\n```');
          break;
        case 'table':
            addTable();
          break;
        case 'section-break':
            var pos = cm.getCursor();
                pos.line += 2;
            cm.replaceSelection('\n- - -\n');
            cm.setCursor(pos);
          break;
        case 'page-break':
            var pos = cm.getCursor();
                pos.line += 2;
            cm.replaceSelection('\n* * *\n');
            cm.setCursor(pos);
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

  CodeMirror.commands.markdownH1 = function(cm) {
    action('h1', cm);
  };
  CodeMirror.commands.markdownH2 = function(cm) {
    action('h2', cm);
  };
  CodeMirror.commands.markdownH3 = function(cm) {
    action('h3', cm);
  };
  CodeMirror.commands.markdownH4 = function(cm) {
    action('h4', cm);
  };
  CodeMirror.commands.markdownH5 = function(cm) {
    action('h5', cm);
  };
  CodeMirror.commands.markdownH6 = function(cm) {
    action('h6', cm);
  };
  CodeMirror.commands.markdownBold = function(cm) {
    action('bold', cm);
  };
  CodeMirror.commands.markdownHighlight = function(cm) {
    action('highlight', cm);
  };
  CodeMirror.commands.markdownItalic = function(cm) {
    action('italic', cm);
  };
  CodeMirror.commands.markdownUnderline = function(cm) {
    action('underline', cm);
  };
  CodeMirror.commands.markdownInlineCode = function(cm) {
    action('code', cm);
  };
  CodeMirror.commands.markdownLink = function(cm) {
    action('link', cm);
  };
  CodeMirror.commands.markdownStrike = function(cm) {
    action('strike', cm);
  };
  CodeMirror.commands.markdownImage = function(cm) {
    action('image', cm);
  };
  CodeMirror.commands.markdownBlockQuote = function(cm) {
    action('quote', cm);
  };
  CodeMirror.commands.markdownUnOrderedList = function(cm) {
    action('unordered-list', cm);
  };
  CodeMirror.commands.markdownOrderedList = function(cm) {
    action('ordered-list', cm);
  };
  CodeMirror.commands.markdownSectionBreak = function(cm) {
    action('section-break', cm);
  };
  CodeMirror.commands.markdownPageBreak = function(cm) {
    action('page-break', cm);
  };

  CodeMirror.commands.markdownFencedCode = function(cm) {
    action('fenced-code', cm);
  };
  CodeMirror.commands.markdownTable = function(cm) {
    action('table', cm);
  };
  CodeMirror.commands.markdownComment = function(cm) {
    action('comment', cm);
  };
  CodeMirror.commands.markdownEmbed = function(cm) {
    action('embed', cm);
  };
  CodeMirror.commands.markdownMathBlock = function(cm) {
    action('math-block', cm);
  };
  CodeMirror.commands.markdownMathInline = function(cm) {
    action('math-line', cm);
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
