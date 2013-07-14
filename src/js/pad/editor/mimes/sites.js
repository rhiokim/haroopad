define(function() {
	return {
		'youtube.com': function(str) {
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
		'vimeo.com': function(str) {
			var key = url('path', str);
			key = key.split('/')[1];
			return '[vimeo:'+ key +']';
		}
	};
});