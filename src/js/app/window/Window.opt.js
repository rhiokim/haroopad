define([
	], 
	function() {
		var gui = require('nw.gui');
		var model;


		var Model = Backbone.Model.extend({
			defaults: {
				x: 0,
				y: 0,
				width: 1024,
				height: 600,
				zoom: 1,
				mode: 1, // view mode 0 is dual, 1 is only editor
				viewerWidth: 50
			},

			initialize: function() {
				var opt = localStorage.getItem('Window');

				this.bind('change', function() {
					store.set('Window', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
				} else {
					this.set(this.defaults);
					store.set('Window', this.toJSON());
				}
			}
		});

		return model = new Model();
});