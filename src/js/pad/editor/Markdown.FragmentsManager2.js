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

		var Fragment = Backbone.Model.extend({
			initialize: function(idx) {
				this.index = idx;

				window.ee.emit('markdown.fragment.create', this.index);

				this.on('change', function() {
					var html, token = this.toJSON();

					if (_.isEmpty(token)) {
						html = '';
					} else {
						token = [token];
						token.links = _links;
						html = marked.parser(token);
					}
					window.ee.emit('markdown.fragment.change', this.index, html);
				});
			},

			setIndex: function(idx) {
				if (this.index != idx) {
					window.ee.emit('markdown.fragment.move', this.index, idx);
					this.index = idx;
				}
			},

			removeFragment: function() {
				window.ee.emit('markdown.fragment.remove', this.index);
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

    	Fragments = [];

  		j = 0;

  		//이전 토큰 탐색
  		_.forEach(tokens, function(token, idx) {

  			j = _tokens.length;

  			for (i = 0; i < j; i++) {
  				if (_tokens[i] && compareJSON(token, _tokens[i].toJSON())) {

  					Fragments[idx] = _tokens.splice(i,1);
  					// Fragments[idx].setIndex(i);

  					// _tokens[i] = undefined;
  					break;
  				}
  			}
  		// 	_.each(_tokens, function(_token, key) {
  		// 		if (compareJSON(token, _token.toJSON())) {
  		// 			Fragments[idx] = _token;
  		// 			Fragments[idx].setIndex(key);
  		// 		}
				// });

  		});
  		log(_tokens);

  		_.each(_tokens, function(obj) {
  			if (obj) {
  				console.log('delete fragment: '+obj.index);
  				obj.removeFragment();
  				// obj.clear();
  				// obj.setIndex(undefined);
  			}
  		});

  		// _.each(_tokens, function(obj, key) {

  		// 	exist = false;

  		// 	//새로운 토큰 탐색
  		// 	for (i = j; i < tokens.length; i++) {

  		// 		//새로운 토큰에 이전 토큰과 동일한 토큰이 있는 경우 재사용
  		// 		if (compareJSON(obj.toJSON(), tokens[i])) {
  		// 			//이전 토큰과 새로운 토큰을 결합하여 새로운 해쉬 테이블 생성
  		// 			Fragments[i] = obj;
  		// 			//모델에 인덱스를 지정해준다.
  		// 			Fragments[i].setIndex(i);

  		// 			exist = true;

  		// 			j++;
  		// 			break;
  		// 		}

  		// 	}

  		// 	if (!exist) {
  		// 		_remove.push(obj);
  		// 		console.log(obj.index +' 번째 제거 대상 등록');
  		// 	}

  		// });

  		// _remove.forEach(function(obj) {
				// console.log(obj.index +' 번째 제거');
  		// 	obj.clear();
  		// });

  		// console.log('새로 생성된 프레그먼트 인덱스: '+ _.keys(Fragments));
  		tokens.forEach(function(token, idx) {

    		if(!Fragments[idx]) {
	    		fragment = new Fragment(idx);
	    		// fragment.setIndex(idx);
					fragment.set(token);

	    		Fragments[idx] = fragment;
    		} else {
    			fragment = Fragments[idx];
	    		// fragment.setIndex(idx);

					fragment.set(token);
    		}

  		});

  		// Fragments.length = tokens.length;
    	_tokens = Fragments;

    });

	});