define([
	'module',
	'store'
	], 
	function(module, store) {
		var items = store.get('recents') || [];

		module.exports = {
			push: function(file) {
				items = [file].concat(items);
				items = _.uniq(items);
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