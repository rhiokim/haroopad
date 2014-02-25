define([], function() {

  return function(cm) {
      var cur = cm.getCursor();
      var token = cm.getTokenAt(cur);
      var md = token.string;
      var type = token.type;

      switch(md) {
        case '##':
        case '###':
        case '####':
        case '#####':
        case '######':
          cm.replaceSelection(' ');
          cur.ch++;
          cm.setCursor(cur);
          cm.replaceSelection('[Header]');
        break;
        case '**':
        case '++':
        case '~~':
        case '==':
        case '$$$':
          cm.replaceSelection(md);
          cm.setCursor(cur);
          cm.replaceSelection(' ');
        break;
        case '```':
          cm.replaceSelection('\n'+ md);
          cm.setCursor(cur);
          cm.replaceSelection('language');
        break;
        case '$$':
          cm.replaceSelection('\n\n'+ md);
          cur.line++;
          cm.setCursor(cur);
        break;
        case '()':
          cur.ch--;
          cm.setCursor(cur);
          cm.replaceSelection(' ');
        break;
        case '* * *':
        case '*****':
        case '- - -':
        case '-----':
        case '_ _ _':
        case '_____':
          cur.ch -= md.length;
          cm.setCursor(cur);
          cm.replaceSelection('\n');
          cur.line += 1;
          cur.ch += md.length;
          cm.setCursor(cur);
          cm.replaceSelection('\n\n');
          cur.line += 2;
          cm.setCursor(cur);
        break;
        default:
        break;
      }
    }

});