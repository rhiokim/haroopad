define([
		'store'
	], function(store) {
		var Model = Backbone.Model.extend({
			defaults: {
				enableSyncScroll: true,
				playKeypressSound: false
			},

			// localStorage: new Backbone.LocalStorage('General'),
			initialize: function() {
				var opt = localStorage.getItem('Code');

				this.bind('change', function() {
					store.set('Code', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('Code', this.toJSON());
				}
			}
		});

		return new Model();
});