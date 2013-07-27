define([
	], function() {
		var path = require('path');

		var temps = [];

		function removeAt(idx) {
			temps.splice(idx, 1);
			return temps;
		}

		var Model = Backbone.Model.extend({
			initialize: function() {
				var opt = localStorage.getItem('Temporary');

				this.bind('change', function() {
					store.set('Temporary', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
					temps = this.get('files') || [];
				} else {
					store.set('Temporary', { files: [] });
				}
			},

			add: function(uid) {
				if (temps.indexOf(uid) === -1) {
					temps.push(uid);

					this.set('files', temps);
				}
			},

			clearAll: function() {
				temps.length = 0;
				this.set('files', []);
			}
			//TODO : remove recent file item
		});

		return new Model();
});