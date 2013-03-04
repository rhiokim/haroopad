define([
		'store'
	], function(store) {

		var recents = [];

		var Model = Backbone.Model.extend({

			initialize: function() {
				var opt = localStorage.getItem('Recents');

				this.bind('change', function() {
					store.set('Recents', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('Recents', this.toJSON());
				}
			},

			add: function(file) {
				recents.push(file);
				this.set('Recents', recents.reverse());
			}
		});

		return new Model();
});