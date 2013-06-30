define([
	], function() {

		var Model = Backbone.Model.extend({

			initialize: function() {
				var opt = localStorage.getItem('Temporary');

				this.bind('change', function() {
					store.set('Temporary', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					store.set('Temporary', this.toJSON());
				}
			},

			clearAll: function() {
			}
			//TODO : remove recent file item
		});

		return new Model();
});