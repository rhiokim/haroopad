define([
		'store'
	], function(store) {
		var Model = Backbone.Model.extend({
			defaults: {
				themeDir: undefined,
				theme: undefined
			},

			initialize: function() {
				var opt = localStorage.getItem('Custom');

				this.bind('change', function() {
					store.set('Custom', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('Custom', this.toJSON());
				}
			}
		});

		return new Model();
});