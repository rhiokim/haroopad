define([
	], function() {
		var Model = Backbone.Model.extend({
			defaults: {
				gfm: true,
        emoji: false,
				tables: true,
				breaks: true,
				pedantic: false,
				sanitize: false,
				smartLists: true,
				smartypants: true,
				silent: false,
				highlight: null,
				langPrefix: '',
				headerPrefix: '',
				mathjax: false,
				dollarSign: false
			},

			initialize: function() {
				var opt = localStorage.getItem('Markdown');

				this.bind('change', function() {
					store.set('Markdown', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('Markdown', this.toJSON());
				}
			}
		});

		return new Model();
});