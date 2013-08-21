define(function() {

	var Share = Backbone.View.extend({
		el: 'footer #shareit',

		events: {
			'click': 'clickHandler',
			'click a[data-service]': 'selectService'
		},

		initialize: function() {},

		clickHandler: function(e) {
			this.trigger('click');
		},

		selectService: function(e) {
			var target = $(e.target);
			var service = target.data('service');

			// this.$('a[data-column]').removeClass('active');
			target.addClass('active');

			this.trigger('select', service);
		}
	});

	return new Share;
});