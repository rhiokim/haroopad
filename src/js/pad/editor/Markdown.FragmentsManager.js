define([],
	function() {
		var marked = require('marked');

		var Fragments = [];
		var _tokens = [];	//previous tokens
		var _links = {};	//marked lexer return links

		function log(obj) {
			console.log(JSON.stringify(obj, null, 2));
		}
		/**
		 * compare object
		 * @param  {[type]} obj1 [description]
		 * @param  {[type]} obj2 [description]
		 * @return {[type]}      [description]
		 */
		function compareJSON(obj1, obj2) { 
		  var ret = {}; 
		  for(var i in obj2) { 
		    if(!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) { 
		      ret[i] = obj2[i]; 
		    } 
		  } 
		  return _.isEmpty(ret); 
		}; 

		function render(token, idx) {
			var tok;

			tok = [ token ];
			tok.links = _links;

			html = marked.parser(tok);
			window.ee.emit('markdown.fragment.change', html, idx);
		}

		function move(oldIndex, newIndex) {
			window.ee.emit('markdown.fragment.move', oldIndex, newIndex);
		}

    window.ee.on('change.before.markdown', function(md) {
			var i, j;
			var tokens = marked.lexer(md, marked.defaults);
			_links = tokens.links;

			var creates = [];
			var removes = [];
			var reuses = [];

			_.each(tokens, function(token, idx) {
				
				j = _tokens.length;
				creates[idx] = tokens;

				for (i = 0; i < j; i++) {

					if (compareJSON(token, _tokens[i])) {
						reuses[idx] = _tokens.splice(i, 1);
						creates[idx] = undefined;
						break;
					}

				}

				// render(token, idx);
			});
			removes = _tokens;

			_tokens = tokens;

    });

	});