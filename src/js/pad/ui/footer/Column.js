define(function() {

	var Column = Backbone.View.extend({
		el: 'footer #columnCount',

		events: {
			'click a[data-column]': 'changeColumn'
		},

		initialize: function() {},

		changeColumn: function(e) {
			var target = $(e.target);
			var column = target.data('column');

			this.$('a[data-column]').removeClass('active');
			target.addClass('active');

			this.trigger('change', column);
		},

		set: function(column) {
			this.$('a[data-column]').removeClass('active');
			this.$('a[data-column='+ column +']').addClass('active');
		}
	});

	return new Column;
});