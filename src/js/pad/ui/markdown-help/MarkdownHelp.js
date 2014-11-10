define([
		'txt!tpl/markdown-help.html'
	], 
	function(html) {
		$('#md-help #md-help-content').append(html);

		// var gui = require('nw.gui');

		var popWin;
		var view, isShow = false;
		var View = Backbone.View.extend({
			el: '#md-help',

			events: {
				'click a[target=md-help]': 'openWindow',
				'click #close-md-help': 'toggle',
				'click a': 'clickHandler'
			},

			initialize: function() {
				this.$el.i18n();
				this.$pel = this.$el.parent();

				/* not need */
				// $('#md-help #md-help-content').tooltip({
    		//		selector: "a[data-toggle=tooltip]",
    		//		trigger: 'hover',
    		//		html: true
				// });
			},

			show: function() {
				// this.$el.removeClass('hide');
				this.$pel.addClass('md-help');
				isShow = true;

				setTimeout(function() {
					nw.editor.refresh();
				}, 250);
			},

			hide: function() {
				// this.$el.addClass('hide');
				this.$pel.removeClass('md-help');
				isShow = false;

				setTimeout(function() {
					nw.editor.refresh();
				}, 250);
			},

			toggle: function() {
				isShow ? this.hide() : this.show();
			},

			clickHandler: function(e) {
				var $el = $(e.currentTarget);
				var md = $el.data('md');

				e.preventDefault();

				if (!md) {
					// global.Shell.openExternal($el.attr('href'));
					return;
				}

				window.ee.emit('menu.insert.markdown', md);
			},

			openWindow: function(e) {
				e && e.preventDefault();

				popWin = gui.Window.open('app://root/html/markdown-help.html', {
					title: 'Markdown Syntax Help',
					width: 420,
					height: nw.height,
					toolbar: false,
					min_width: 420,
					min_height: 500
				});
				popWin.on('loaded', function() {
					popWin.focus();
				});

				this.hide();
			}
		});

		view = new View;

		window.ee.on('toggle.syntax.help', function() {
			view.toggle();
		});

		window.ee.on('menu.help.syntax', function() {
			view.openWindow();
		});
});