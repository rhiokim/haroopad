define([
		'store'
	], function(store) {
		var Model = Backbone.Model.extend({
			defaults: {
				theme: 'default',
				displayLineNumber: false,
				vimKeyBinding: false,
				insertFourSpace: false,
				autoPairCharacters: true
			},

			// localStorage: new Backbone.LocalStorage('General'),
			initialize: function() {
				var opt = store.get('Editor');

				if(opt) {
					this.set(opt);
				} else {
					this.set(this.defaults);
				}
			},

			set: function() {
    		Backbone.Model.prototype.set.apply(this, arguments);
    		store.set('Editor', this.toJSON());
			}
		});

		return new Model();
});