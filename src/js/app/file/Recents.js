define([
		'store'
	], function(store) {
		var path = require('path');

		var recents = [];

		var Model = Backbone.Model.extend({

			defaults: {
				files: [],
				limit: 100
			},

			initialize: function() {
				var opt = localStorage.getItem('Recents');

				this.bind('change', function() {
					store.set('Recents', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
					recents = this.get('files');
				} else {
					this.set(this.defaults);
					store.set('Recents', this.toJSON());
				}
			},

			add: function(file) {
				var name = path.basename(file);
				var o = {};
						o[file] = name;
				recents.push(o);
				
				this.set('files', recents.reverse());
				this.trigger('change');
			}
		});

		return new Model();
});