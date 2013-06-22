define([
		'vendors/text!tpl/modal-post-tumblr.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var el = $('#post-tumblr-dialog');
		var bar = el.find('.progress div.bar');
		var postTimeout;

		function progress() {
			var per = 0;
			el.find('.progress').removeClass('hide');
			el.find('.alert').addClass('hide')
			window.clearInterval(postTimeout);

			postTimeout = window.setInterval(function() {
				per += 1.7;

				if (per > 100) { per = 0 }

				bar.css({ width: per+'%' });
			}, 300);
		}

		function stop() {
			window.clearInterval(postTimeout);
			el.find('.progress').addClass('hide');
			bar.css({ width: 0 });
		}

		function error(msg) {
			window.clearInterval(postTimeout);
			el.find('.progress').addClass('hide');
			bar.css({ width: 0 });

			el.find('.alert').removeClass('hide').html(msg);
		}

		var View = Backbone.View.extend({
			el: '#post-tumblr-dialog',

			events: {
				// 'click ._dont_save': 'dontSaveHandler',
				'submit form': 'postHandler',
				'click ._cancel': 'cancelHandler'
			},

			initialize: function() {
			},

			show: function() {
				var to = store.get('Tumblr') || {};
				var from = store.get('Mail') || {};

				this.$el.find('input[name=to]').val(to.email || '');
				this.$el.find('input[name=from]').val(from.email || '');

				this.$el.find('input[name=remember]').val(to.remember);

				this.$el.modal('show');
			},

			hide: function() {
				this.$el.modal('hide');
				stop();
			},

			postHandler: function(e) {
				var to, from, password;
				e.preventDefault();

				to = this.$el.find('input[name=to]').val();
				from = this.$el.find('input[name=from]').val();
				password = this.$el.find('input[name=password]').val();
				remember = this.$el.find('input[name=remember]').val();

				progress();
				
				this.trigger('post', to, from, password, remember);
				// this.hide();
			},

			error: function(msg) {
				error(msg);
			},

			cancelHandler: function() {
				this.hide();
				stop();
			},
			
			dontSaveHandler: function() {
				this.trigger('dont-save');
				this.hide();
			}
		});

		return View;
});