var InlineLexer = marked.InlineLexer;

var customRules = {
    emoji: /^:([A-Za-z0-9_\-\+]+?):/,
    stronghighlight: /^==([^=]+)==/,
    underline: /^\+\+([\s\S]+?)\+\+(?!\+)/,
    sup: /^\^([\S]+?)\^(?!\^)/,
    sub: /^\~([\S]+?)\~(?!\~)/
};

var inlineMathRegEx = /^ *(split)([\s\S]*?[^\$])\1(?!\$)/;
if (true) {
  customRules.math = replace(inlineMathRegEx)
    ('split', /\${3,3}|\${1,1}/)
    ();
}


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

InlineLexer.rules.normal = merge({}, InlineLexer.rules.normal, customRules);
InlineLexer.rules.gfm = merge({}, InlineLexer.rules.gfm, customRules);
InlineLexer.rules.breaks = merge({}, InlineLexer.rules.breaks, customRules);