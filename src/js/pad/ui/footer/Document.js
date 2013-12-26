define(function() {

	var Document = Backbone.View.extend({
		el: 'footer #documentConfig',

		events: {
			'click': 'clickHandler',
			'click a[data-exec=outline]': 'toggleOutline',
			'click a[data-exec=toc]': 'toggleTOC',
			'click a[data-exec=md-help]': 'toggleHelp',
			'click a[data-exec=fullscreen]': 'toggleFullscreen'
		},

		initialize: function() {},

		clickHandler: function(e) {
			this.trigger('click');
		},

		toggleOutline: function(e) {
			var target = $(e.target);
			var show = target.hasClass('active');

			show = !show;
			show ? target.addClass('active') : target.removeClass('active') ;

			this.trigger('outline', show);
		},

		toggleTOC: function(e) {
			var target = $(e.target);
			var show = target.hasClass('active');

			show = !show;
			// show ? target.addClass('active') : target.removeClass('active') ;

			this.trigger('toc', show);
		},

		toggleHelp: function(e) {
			var target = $(e.target);
			var show = target.hasClass('active');

			show = !show;
			// show ? target.addClass('active') : target.removeClass('active') ;

			this.trigger('help', show);
		},

		toggleFullscreen: function(e) {
			var target = $(e.target);
			var show = target.hasClass('active');

			show = !show;
			// show ? target.addClass('active') : target.removeClass('active') ;

			this.trigger('fullscreen', show);
		},

		set: function(show) {
			var target = this.$('a[data-exec=outline]');
			show ? target.addClass('active') : target.removeClass('active') ;
		}
	});

	return new Document;
});