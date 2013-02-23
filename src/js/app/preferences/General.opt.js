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

				if(opt) {
					this.set(opt);
				} else {
					this.set(this.defaults);
				}
			},

			set: function() {
    		Backbone.Model.prototype.set.apply(this, arguments);
    		store.set('General', this.toJSON());
			}
		});

		return new Model();
});