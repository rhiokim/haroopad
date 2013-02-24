define([
		'preferences/Helper.opt'
	], function(option) {

		var EditorTabView = Backbone.View.extend({
			el: '#helper-section',

			events: {
				'click input[name=youtube]': 'youtube',
				'click input[name=slideshare]': 'slideshare',
				'click input[name=vimeo]': 'vimeo',
				'click input[name=jsfiddle]': 'jsfiddle',
				'click input[name=tweet]': 'tweet',
				'click input[name=gist]': 'gist'
			},

			initialize: function() {
			},

			youtube: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('youtube', bool);
			},

			slideshare: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('slideshare', bool);
			},

			vimeo: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('vimeo', bool);
			},

			jsfiddle: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('jsfiddle', bool);
			},

			tweet: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('tweet', bool);
			},

			gist: function(e) {
				var bool = $(e.target).is(':checked');
				option.set('gist', bool);
			}
		});

		return EditorTabView;

});