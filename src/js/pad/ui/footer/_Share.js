define(function() {

	var Share = Backbone.View.extend({
		el: 'footer #shareit',

		events: {
			'click a[data-service]': 'selectService'
		},

		initialize: function() {},

		selectService: function(e) {
			var target = $(e.target);
			var service = target.data('service');

			// this.$('a[data-column]').removeClass('active');
			target.addClass('active');

			this.trigger('click', service);
		}
	});

	return new Share;
});