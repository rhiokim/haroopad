define(function() {
	function linkText(str) {
		return '['+ str +']('+ str +')';
	}

	return {
		'www.youtube.com': function(str) {
			var key = url('?v', str);
			return '[youtube:'+ key +']';
		},
		'twitter.com': function(str) {
			var key = url('path', str);
			key = key.split('/')[3];
			return '[tweet:'+ key +']';
		},
		'speakerdeck.com': function(str) {
			var key = url('path', str);
			key = key.split('/')[2];
			return '[speakerdeck:'+ key +']';
		},
		'www.slideshare.net': function(str) {
			// var key = url('path', str);
			// key = key.split('/')[2];
			// return '[slideshare:'+ key +']';
		},
		'vimeo.com': function(str) {
			var key = url('path', str);
			key = key.split('/')[1];

			if (!Number(key)) {
				return linkText(text);
			}

			return '[vimeo:'+ key +']';
		},
		'gist.github.com': function(str) {
			var file, key = url('path', str);
			var frag = key.split('/');
			key = frag[2];
			file = frag[5];

			return '[gist:'
					+ key 
					+ (file ? ' '+ file : '')
					+']';
		}
	};
});

