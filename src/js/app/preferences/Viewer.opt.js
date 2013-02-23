define([
		'store'
	], function(store) {
		var Model = Backbone.Model.extend({
			defaults: {
				theme: 'default',
				codeTheme: 'default',
				clickableLink: false
			},

			// localStorage: new Backbone.LocalStorage('General'),
			initialize: function() {
				var opt = store.get('Viewer');

				if(opt) {
					this.set(opt);
				} else {
					this.set(this.defaults);
				}
			},

			set: function() {
    		Backbone.Model.prototype.set.apply(this, arguments);
    		store.set('Viewer', this.toJSON());
			}
		});

		return new Model();
});