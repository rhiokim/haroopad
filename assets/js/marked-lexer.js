var defaults = merge(marked.defaults, {
  renderer: Renderer
}, {
  "gfm": true,
  "tables": true,
  "breaks": true,
  "pedantic": false,
  "sanitize": false,
  "smartLists": true,
  "silent": false,
  "highlight": null,
  "langPrefix": '',
  "smartypants": true,
  "headerPrefix": '',
  "mathjax": true,
  "emoji": false
});

var lexer = new marked.Lexer(defaults);

var customRules = {
    oembed: /^@\[(inside)\]\(href\)/,
    toc: /^\[\s*(TOC|toc)(?:\s+['"]([\s\S]*?)['"])?\s*\] *(?:\n+|$)/
}

var _inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
var _href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

customRules.oembed = replace(customRules.oembed)
  ('inside', _inside)
  ('href', _href)
  ();

function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    if (!name) return new RegExp(regex, opt);
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
    return self;
  };
}

function merge(obj) {
  var i = 1
    , target
    , key;

  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }

  return obj;
}

lexer.rules = merge({}, lexer.rules, customRules);

var Lexer = lexer;