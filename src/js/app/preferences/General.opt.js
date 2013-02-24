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
				var opt = store.get('General');

				this.bind('change', function() {
					store.set('General', this.toJSON());
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