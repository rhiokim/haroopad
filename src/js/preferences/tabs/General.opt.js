define([
		'store'
	], function(store) {
		var Model = Backbone.Model.extend({
			defaults: {
				enableSyncScroll: true,
				playKeypressSound: false,
				enableLastFileRestore: true
			},

			// localStorage: new Backbone.LocalStorage('General'),
			initialize: function() {
				var opt = localStorage.getItem('General');

				this.bind('change', function() {
					store.set('General', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('General', this.toJSON());
				}
			}
		});

		return new Model();
});