define([
		'store'
	], function(store) {
		var Model = Backbone.Model.extend({
			defaults: {
				youtube: true,
				slideshare: true,
				vimeo: true,
				jsfiddle: true,
				tweet: true,
				gist: true
			},

			// localStorage: new Backbone.LocalStorage('General'),
			initialize: function() {
				var opt = store.get('Helper');

				this.bind('change', function() {
					store.set('Helper', this.toJSON());
				});

				if(opt) {
					this.set(opt);
				} else {
					this.set(this.defaults);
				}
			}
		});

		return new Model();
});