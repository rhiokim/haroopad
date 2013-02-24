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

			initialize: function() {
				var opt = store.get('Editor');

				this.bind('change', function() {
					store.set('Editor', this.toJSON());
				});

				if(opt) {
					this.set(opt);
				} else {
					this.set(defaults);
				}
			}
		});

		return new Model();
});