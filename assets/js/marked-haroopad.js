var defaults = {
  "gfm": true,
  "tables": true,
  "breaks": false,
  "pedantic": false,
  "sanitize": false,
  "smartLists": true,
  "smartypants": true,
  "silent": false,
  "highlight": null,
  "langPrefix": '',
  "mathjax": true
};

var lexer = new marked.Lexer(defaults);
var customRules = {
    oembed: /^@\[(inside)\]\(href\)/,
    toc: /^\[(TOC|toc)\] *(?:\n+|$)/
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


var loading = '<span class="spinner"></span>';
var renderer = new marked.Renderer();
    renderer.oembed = function(caption, href, props) {
      var key, value, link, tmp = {};

      if (!href) {
        return '';
      }

      props = !props ? '' : props ;

      if (props) {
        props = props.split(';');
        props.forEach(function(prop) {
          prop = prop.split(':');

          if (prop[0] && prop[1]) {
            tmp[prop[0].trim()] = prop[1].trim();
          }
        });
        props = JSON.stringify(tmp);
        props = encodeURIComponent(props);
      }

      link = '<a href="href" target="_blank">'+ (caption?caption:href) +'</a>';

      return '<p data-url="'+ href +'" data-props="'+ props +'" class="oembed">'+ link +' '+ loading +'</p>';
    };

    renderer.math = function(text, block) {
      if (block) {
        return '<p class="mathjax">$$'
          + text
          + '$$</p>';
      } else {
        return '<span class="mathjax">$$$'
          + text
          + '$$$</span>';
      }
    };
    
    renderer.toc = function(content) {
      return '<p class="toc"></p>';
    }

var Lexer = lexer;
var Renderer = renderer;
var parse = function(src, options) {
  if (options) {
    Lexer.options = options;
  }
  var tokens = Lexer.lex(src);
  return marked.parser(tokens, Lexer.options, Renderer);
}