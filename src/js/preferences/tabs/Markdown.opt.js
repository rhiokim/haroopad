define([
		'store'
	], function(store) {
		var Model = Backbone.Model.extend({
			defaults: {
	      gfm: true,
	      tables: true,
	      breaks: false,
	      pedantic: false,
	      sanitize: false,
	      smartLists: true,
	      smartypants: true,
	      silent: false,
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