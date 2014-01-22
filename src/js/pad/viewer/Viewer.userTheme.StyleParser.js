define([], function() {
  var css = require('css');

  return function(style) {
    var styleSheet = css.parse(style);
    var cssRules = styleSheet.stylesheet.rules || [];
    var selector;

    cssRules.forEach(function(rule) {
      if (rule.type == 'rule') {
        selector = rule['selectors'][0];
        rule['selectors'][0] = '#root>' + selector;
      }
    });

    return css.stringify(styleSheet);
  }

});