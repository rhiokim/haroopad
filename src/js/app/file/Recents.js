define([
	], function() {
		var path = require('path');

		var recents = [];

		function removeAt(idx) {
			recents.splice(idx, 1);
			return recents;
		}

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
				
				recents.forEach(function(item, idx) {
					if(item.hasOwnProperty(file)) {
						removeAt(idx);
						return;
					}
				});

				recents.push(o);
				
				this.set('files', recents.reverse());
				this.trigger('change');
			},

			clearAll: function() {
				recents.length = 0;
				this.set('files', []);
				this.trigger('change');
			}
			//TODO : remove recent file item
		});

		return new Model();
});