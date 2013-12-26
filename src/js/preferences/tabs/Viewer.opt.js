define([
		'store'
	], function(store) {
		var Model = Backbone.Model.extend({
			defaults: {
				theme: 'haroopad',
				clickableLink: false,
				fontSize: 15,
				fontFamily: undefined
			},

			// localStorage: new Backbone.LocalStorage('General'),
			initialize: function() {
				var opt = localStorage.getItem('Viewer');

				this.bind('change', function() {
					store.set('Viewer', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('Viewer', this.toJSON());
				}
			}
		});

		return new Model();
});