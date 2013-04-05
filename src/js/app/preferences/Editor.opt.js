define([
		'store'
	], function(store) {

		var gui = require('nw.gui');
		var win = gui.Window.get();
		var model;

		win.on('show.toggle.linenum', function() {
			model.set('displayLineNumber', !model.get('displayLineNumber'));
		});

		var Model = Backbone.Model.extend({
			defaults: {
				theme: 'solarized dark',
				displayLineNumber: true,
				vimKeyBinding: false,
				insertFourSpace: false,
				autoPairCharacters: true
			},

			initialize: function() {
				var opt = localStorage.getItem('Editor');

				this.bind('change', function() {
					store.set('Editor', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('Editor', this.toJSON());
				}
			}
		});

		return model = new Model;
});