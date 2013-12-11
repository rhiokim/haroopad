define([
		'keyboard',
		'txt!tpl/markdown-help.html'
	], 
	function(HotKey, html) {
		$('#md-help #md-help-content').append(html);

		var popWin;
		var view, isShow = false;
		var View = Backbone.View.extend({
			el: '#md-help',

			events: {
				'click a[target=md-help]': 'openWindow',
				'click #close-md-help': 'toggle'
			},

			initialize: function() {
				this.$el.i18n();
			},

			show: function() {
				this.$el.removeClass('hide');
				isShow = true;
			},

			hide: function() {
				this.$el.addClass('hide');
				isShow = false;
			},

			toggle: function() {
				isShow ? this.hide() : this.show();
			},

			openWindow: function(e) {
				e && e.preventDefault();

				popWin = gui.Window.open('app://root/html/markdown-help.html', {
					title: 'Markdown Syntax Help',
					width: 400,
					height: nw.height,
					toolbar: false,
					min_width: 350,
					min_height: 300
				});
				popWin.on('loaded', function() {
					popWin.focus();
				});

				this.hide();
			}
		});

		view = new View;

		HotKey('defmod-shift-h', function() {
			window.ee.emit('toggle.syntax.help');
		});

		window.ee.on('toggle.syntax.help', function() {
			view.toggle();
		});

		window.ee.on('menu.help.syntax', function() {
			view.openWindow();
		});
});