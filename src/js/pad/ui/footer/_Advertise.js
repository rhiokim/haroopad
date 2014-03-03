define([
	],function() {
	// var shell = gui.Shell;
	
	var _cookie = store.get('_time') || { donate : 0 };

	function loop() {
		var now = new Date().getTime();

		if (_cookie.donate < now) {
			$('#donate-btn>button').popover('show');
			_cookie.donate = now + Math.random() * 1000 * 60 * 60 * 8;
			store.set('_time', _cookie);
		}
	}

	var Adver = Backbone.View.extend({
		el: '#donate-btn',

		events: {
			'click': 'donateHandler'
		},

		initialize: function() {
			this.$('button[data-toggle=popover]').popover({
				content: i18n.t('pad:donate.desc'),
				title: i18n.t('pad:donate.title')
			});

			window.setInterval(loop, 10000);
		},

		hide: function() {
			this.$('button[data-toggle=popover]').popover('hide');
		},

		donateHandler: function(e) {
			var d;
			e.preventDefault();

			if (e.target.id == 'donate-link') {
				d = new Date().getTime() + Math.random() * 1000 * 60 * 60 * 24 * 10;

				if (_cookie.donate < d) {
					store.set('_time', _cookie);
				}

				this.$('button[data-toggle=popover]').popover('hide');
			} 
		}
	});

	keymage('i space n e e d space h a r o o p a d space f o r e v e r', function(e) {
		_cookie.donate = new Date().getTime() + 1000 * 60 * 60 * 24 * 99999;
		store.set('_time', _cookie);

		setTimeout(function() {
			nw.file.set('markdown', '## Thank you :-)\nDisabled donation auto popover!\n\nEnjoy Markdown. Enjoy Haroopad.\n');
		}, 350);
		
		global._gaq.push('haroopad', 'ester egg', 'disabled donation popover');
	});

	return new Adver;

});