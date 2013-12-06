define([
	'store'
	],function(store) {
	var shell = gui.Shell;
	
	var _cookie = store.get('_time') || { donate : 0};

	function loop() {
		var now = new Date().getTime();

		if (_cookie.donate < now) {
			$('#donate-btn>a').popover('show');
			_cookie.donate = now + Math.random() * 1000 * 60 * 60 * 8;
			// _cookie.donate = now + Math.random() * 1000 * 10;
			store.set('_time', _cookie);
		}
	}

	var Adver = Backbone.View.extend({
		el: '#donate-btn',

		events: {
			'click': 'donateHandler'
		},

		initialize: function() {
			this.$('a[data-toggle=popover]').popover({
				content: i18n.t('pad:donate.desc'),
				title: i18n.t('pad:donate.title')/*,
				animation: false*/
			});

			window.setInterval(loop, 1000);
		},

		hide: function() {
			this.$('a[data-toggle=popover]').popover('hide');
		},

		donateHandler: function(e) {
			e.preventDefault();

			if (e.target.id == 'donate-link') {
				this.trigger('donate');	
			} 
		}
	});

	return new Adver;

});