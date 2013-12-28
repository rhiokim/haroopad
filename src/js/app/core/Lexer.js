define([
    'core/Renderer'
	], 
	function(Renderer) {
	var marked = require("marked");
    var config = store.get('General') || {};
    var markdown = store.get('Markdown') || {};
	
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
        "headerPrefix": '',
        "mathjax": config.enableMath, 
        "renderer": Renderer
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

    window.ee.on('preferences.general.enableMath', function(value) {
        lexer.options.mathjax = value;
        window.ee.emit('preferences.general.enableMath.after', value);
    })

    return lexer;
});