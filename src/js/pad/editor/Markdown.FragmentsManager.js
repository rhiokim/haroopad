define([],
	function() {

		var Fragment = Backbone.Model.extend({
			initialize: function() {
				this.on('change:md', function() {
					window.ee.emit('markdown.fragment.change', this.toJSON());
				})
			}
		});

		// var FragmentCollection = Backbone.Collection.extend({
		// });

		// var Fragments = new FragmentCollection();

		var Fragments = {};
		var _fragments = {};

		//markdown fragment update
		window.ee.on('markdown.fragment.change', function(obj) {
			console.log(JSON.stringify(obj));
		});

    window.ee.on('change.before.markdown', function(md) {
    	var i, o, fragment, fragments = md.split('\n#');

    	fragments = _.compact(fragments);
    	// fragments[0] = fragments[0].substr(1, fragments[0].length);
    	// Fragments = {};

  		_.each(_fragments, function(obj, key) {

  			for (i = 0; i < fragments.length; i++) {

  				// console.log(fragments[i] +'---'+ obj.md);
  				if (fragments[i] === obj.get('md')) {
	  				// Fragments[i] = obj;
	  				Fragments[i] = obj;

	  				// if (i != key) { 
	  				// 	delete Fragments[key] ;
	  				// };

	  				break;
	  			}
  			}

  		});


    	fragments.forEach(function(frag, idx) {

    		if(!_.has(Fragments, idx)) {
	    		fragment = new Fragment();
	    		fragment.set('idx', idx);
	    		fragment.set('md', frag);

	    		Fragments[idx] = fragment;	
    		} else {
    			fragment = Fragments[idx];

    			fragment.set('idx', idx);
    			if (frag !== fragment.get('md')) {
    				fragment.set('md', frag);
    			}
    		}
    	});

    	_fragments = Fragments;

    	// _fragments = Fragments;

    	//hash table
    	// InvertFragments = _.invert(Fragments);

    	// console.log(JSON.stringify(Fragments, null, 2));
    });

	});