define([
	], function() {
		var path = require('path');

		var temps = [];

		function removeAt(idx) {
			temps.splice(idx, 1);
			return temps;
		}

		var Model = Backbone.Model.extend({
			defaults: {
				files: []
			},

			initialize: function() {
				var opt = localStorage.getItem('Temporary');

				this.bind('change', function() {
					store.set('Temporary', this.toJSON());
				});

				if(opt) {
					this.set(JSON.parse(opt));
					temps = this.get('files') || [];
				} else {
					this.set(this.defaults);
					store.set('Temporary', this.toJSON());
				}
			},

			add: function(uid) {
				if (temps.indexOf(uid) === -1) {
					temps.push(uid);

					this.set({ files: temps });

					this.trigger('change');
				}
			},

			remove: function(uid) {
				var idx = temps.indexOf(uid);
				if (idx > -1) {
					temps.splice(idx, 1);
					this.set({ files: temps });
					this.trigger('change');
				}
			},

			clearAll: function() {
				temps.length = 0;
				this.set('files', []);

				this.trigger('change');
			}
			//TODO : remove recent file item
		});

		return new Model();
});