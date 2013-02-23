define([], 
	function() {
		// var items = store.get('recents') || [];

		var Recents = Backbone.Model.extend({
			defaults: {},
			id: 'some-uid',
			localStorage: new Backbone.LocalStorage('Recents')
		})

		return new Recents();
		// module.exports = {
		// 	push: function(file) {
		// 		items = [file].concat(items);
		// 		items = _.uniq(items);
		// 		store.set('recents', items);
		// 	},

		// 	get: function(items) {
		// 		return _.first(items, 5);
		// 	},

		// 	clear: function(items) {
		// 		items = [];
		// 		store.remove('recents');
		// 	}
		// };
	});