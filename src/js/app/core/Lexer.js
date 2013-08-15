define([
	], 
	function() {
	var marked = require("marked");
	
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
        "langPrefix": ''
    };

    var lexer = new marked.Lexer(defaults);

    var customRules = {
    	// plugin: /^ *\[([^\:\]]+):([^\]\/]+)\][^\(:] *\n*/
    	plugin: /^ *\[([^\:\]]+):([^\]\/]+)\][^\(] */
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

    return lexer;
});