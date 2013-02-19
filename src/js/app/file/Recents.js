define([
	'module'
	], 
	function(module) {
		var items = [];

		module.exports = {
			push: function(file) {
				items = [file].concat(items);
				store.set('recents', items);
			},

			get: function(items) {
				return _.first(items, 5);
			},

			clear: function(items) {
				items = [];
				store.remove('recents');
			}
		};
	});