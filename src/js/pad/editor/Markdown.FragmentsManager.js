define([],
	function() {
		var marked = require('marked');

		var Fragments = {};
		var _tokens = {};	//previous tokens
		var _links = {};	//marked lexer return links

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

		var Fragment = Backbone.Model.extend({
			initialize: function() {
				this.on('change', function() {
					var html, token = this.toJSON();

					if (_.isEmpty(token)) {
						html = '';
					} else {
						token = [token];
						token.links = _links;
						console.log(token);
						html = marked.parser(token);
					}

					window.ee.emit('markdown.fragment.change', this.index, html);
				});
			},

			setIndex: function(idx) {
				//window.ee.emit('markdown.fragment.move', this.index, idx);
				this.index = idx;
			},

			innerFragmentType: function(type) {
				this.innerType = type;
			}
		});

    window.ee.on('change.before.markdown', function(md) {
    	var i, j, exist, _remove = [], fragment;
			var tokens = marked.lexer(md, marked.defaults);
			_links = tokens.links;

			if (_.isEmpty(tokens)) {
				_.each(_tokens, function(obj) {
					obj.clear();
				});
				return;
			}

    	Fragments = {};

  		j = 0;

  		//이전 토큰 탐색
  		_.each(_tokens, function(obj, key) {

  			exist = false;

  			//새로운 토큰 탐색
  			for (i = j; i < tokens.length; i++) {

  				//새로운 토큰에 이전 토큰과 동일한 토큰이 있는 경우 재사용
  				if (compareJSON(obj.toJSON(), tokens[i])) {
  					//이전 토큰과 새로운 토큰을 결합하여 새로운 해쉬 테이블 생성
  					Fragments[i] = obj;
  					//모델에 인덱스를 지정해준다.
  					Fragments[i].setIndex(i);

  					exist = true;

  					j++;
  					break;
  				}

  			}

  			if (!exist) {
  				_remove.push(obj);
  			}

  		});

  		_remove.forEach(function(obj) {
  			obj.clear();
  		});

  		tokens.forEach(function(token, idx) {

    		if(!_.has(Fragments, idx)) {
	    		fragment = new Fragment();
	    		fragment.setIndex(idx);
    		} else {
    			fragment = Fragments[idx];
    		}

    		Fragments[idx] = fragment;	
				fragment.set(token);

  		});

  		Fragments.length = tokens.length;
    	_tokens = Fragments;

    });

	});