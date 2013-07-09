define([
		'vendors/text!tpl/modal-send-email.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var gui = require('nw.gui');
		var shell = gui.Shell;

		var el = $('#send-email-dialog');
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

			el.find('.alert-block').removeClass('hide').html(msg);
		}

		function success(msg) {
			window.clearInterval(postTimeout);
			el.find('.progress').addClass('hide');
			bar.css({ width: 0 });

			el.find('.alert-success').removeClass('hide').html(msg);
			el.find('.alert-success').addClass('in');
			
			el.find('button._save').button('reset');

			window.setTimeout(function() {
				el.find('.alert-success').removeClass('in');
				window.setTimeout(function() {
					el.find('.alert-success').addClass('hide');
				}, 250);
			}, 2500);
		}

		var View = Backbone.View.extend({
			el: '#send-email-dialog',

			events: {
				// 'click ._dont_save': 'dontSaveHandler',
				'click a': 'clickHandler',
				'submit form': 'postHandler',
				'click ._cancel': 'cancelHandler'
			},

			initialize: function() {
			},

			show: function() {
				var Emails = store.get('Emails') || {};

				this.$el.find('input[name=to]').val(Emails.to || '');
				this.$el.find('input[name=from]').val(Emails.from || '');

				this.$el.find('input[name=remember]').attr('checked', Emails.remember);
				// this.$el.find('button[name=remember]').attr('checked', Emails.remember);
				this.$el.find('input[name=to]').data({ source: Emails.addrs });

				this.$el.modal('show');
			},

			hide: function() {
				this.$el.modal('hide');
				stop();
			},

			successHandler: function() {
				success('Success!');
				this.$el.find('button._save').button('reset');
			},

			clickHandler: function(e) {
				var href = $(e.target).attr('href');
				e.preventDefault();
				shell.openExternal(href);
			},

			postHandler: function(e) {
				var title, to, from, password;
				e.preventDefault();

				el.find('button._save').button('Sending...');

				title = this.$el.find('input[name=title]').val() || '';
				to = this.$el.find('input[name=to]').val();
				from = this.$el.find('input[name=from]').val();
				password = this.$el.find('input[name=password]').val();
				remember = this.$el.find('input[name=remember]').is(':checked');
				mode = this.$el.find('button[name=markdown]').hasClass('active');
				mode = mode ? 'md' : 'html';

				progress();
				
				this.trigger('post', {
					title: title, 
					to: to, 
					from: from, 
					password: password, 
					remember: remember, 
					mode: mode
				});
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