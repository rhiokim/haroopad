define([],function() {
  var css = require('css');

  var fontStyle = [ 'color', 'font-style', 'text-shadow' ];
  var layoutStyle = fontStyle.concat([ 
    'font-family', 'background', 'background-image', 'background-color' ]);
  var supportTable = {
    '*': { 'select': '.CodeMirror', 'properties': fontStyle},
    'header': { 'selector': '.cm-header', 'properties': fontStyle },
    'code': { 'selector': '.cm-comment', 'properties': fontStyle },
    'comment': { 'selector': '.cm-comment', 'properties': fontStyle },
    'del': { 'selector': '.cm-comment', 'properties': fontStyle  },
    'strike': { 'selector': '.cm-comment', 'properties': fontStyle },
    'blockquote': { 'selector': '.cm-atom', 'properties': fontStyle },
    'li1': { 'selector': '.cm-variable-2', 'properties': fontStyle},
    'li2': { 'selector': '.cm-variable-3', 'properties': fontStyle },
    'li3': { 'selector': '.cm-keyword', 'properties': fontStyle},
    'hr': { 'selector': '.cm-hr', 'properties': fontStyle },
    'img': { 'selector': '.cm-tag', 'properties': fontStyle },
    'a': { 'selector': '.cm-link', 'properties': fontStyle },
    'link': { 'selector': '.cm-link', 'properties': fontStyle },
    'i': { 'selector': '.cm-em', 'properties': fontStyle },
    'em': { 'selector': '.cm-em',  'properties': fontStyle },
    'strong': { 'selector': '.cm-strong', 'properties': fontStyle },

    'editor': { 'selector': '.CodeMirror', 'properties': layoutStyle },
    'linenumber': { 'selector': '.CodeMirror-gutters, #editor .CodeMirror-linenumber',
      'properties': layoutStyle
    },
    'activeline': { 'selector': '.CodeMirror-activeline-background', 'properties': layoutStyle }
  };

  return function(style) {
    var styleSheet = css.parse(style).stylesheet;
    var cssRules = styleSheet.rules || [];
    var userStyle = css.parse('');
    var userRules = userStyle.stylesheet.rules || [];
    var selector, supportRule, declarations;

    cssRules.forEach(function(rule) {
      if (rule.type == 'import') {
        userRules.push(rule);
      }
    });

    cssRules = cssRules.filter(function(rule) {
      if (rule.type == 'rule') {
        selector = rule['selectors'][0];
        return selector in supportTable;
      }
    });

    while(rule = cssRules.shift()) {
      selector = rule['selectors'][0];
      declarations = rule['declarations'];

      supportRule = supportTable[selector];
      declarations = declarations.filter(function(declaration) {
        return supportRule.properties.indexOf(declaration.property) > -1;
      });

      userRules.push({
        "selectors": [ '#editor '+ supportRule.selector],
        "declarations": declarations || [],
        "type": "rule"
      });
    }

    return css.stringify(userStyle);
  }

});