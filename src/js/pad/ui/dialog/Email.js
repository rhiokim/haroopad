define([
		'txt!tpl/modal-send-email.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var gui = require('nw.gui');
		var shell = gui.Shell;

		var el = $('#send-email-dialog');
		var bar = el.find('.progress div.progress-bar');
		var postTimeout;

		function progress() {
			var per = 0;
			el.find('#isSent').addClass('hide');
			el.find('.progress').removeClass('hide');
			el.find('.alert').addClass('hide');
			window.clearInterval(postTimeout);

			postTimeout = window.setInterval(function() {
				per += 1.7;

				if (per > 100) { 
					per = 0;
				}

				bar.css({ width: per+'%' });
				bar.attr({ 'aria-valuenow': per });
			}, 300);
		}

		function stop() {
			window.clearInterval(postTimeout);
			el.find('.progress').addClass('hide');
			bar.css({ width: 0 });
			el.find('button._save').button('reset');
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

			el.find('#isSent').removeClass('hide').html(msg);
			el.find('#isSent').addClass('in');
			
			el.find('button._save').button('reset');

			// window.setTimeout(function() {
			// 	el.find('#isSent').removeClass('in');
			// 	window.setTimeout(function() {
			// 		el.find('#isSent').addClass('hide');
			// 	}, 250);
			// }, 10000);
		}

		var View = Backbone.View.extend({
			el: '#send-email-dialog',

			events: {
				// 'click ._dont_save': 'dontSaveHandler',
				'click a': 'clickHandler',
				'submit form': 'postHandler',
				'click ._close': 'closeHandler',
				'keypress input[name=to]': 'keypressHandler',
				'keypress form': 'submitHandler'
			},

			initialize: function() {
				this.$('input[name=title]').attr('placeholder', i18n.t('pad:email.subject'));
				this.$('input[name=to]').attr('placeholder', i18n.t('pad:email.reciver'));
				this.$('input[name=from]').attr('placeholder', i18n.t('pad:email.yours'));
				this.$('input[name=password]').attr('placeholder', i18n.t('pad:email.password'));
				this.$('#secure').attr('title', i18n.t('pad:email.secure'));
				
				this.$('[data-toggle=tooltip]').tooltip({ html: true });

				this.$el.on('shown', function() {
					$(this).find('input[name=title]').focus();
				});
				this.$el.on('hidden', function() {
					nw.editor.focus();
				});
			},

			show: function(file) {
				var Emails = store.get('Emails') || {};
				var title = file && file.title;

				this.$('input[name=title]').val(title || '');

				this.$('input[name=to]').val(Emails.to || '');
				this.$('input[name=from]').val(Emails.from || '');
				this.$('input[name=remember]').attr('checked', Emails.remember);
				this.$('input[name=to]').data({ source: Emails.addrs });

				this.$el.modal('show');

				this.keypressHandler();
			},

			hide: function() {
				this.$el.modal('hide');
				stop();
			},

			successHandler: function() {
				success('- Sent!');
			},

			clickHandler: function(e) {
				var href = $(e.target).attr('href');
				e.preventDefault();
				shell.openExternal(href);
			},

			submitHandler: function(e) {
				if (e.keyCode === 13) {
				this.$('button[type=submit]').trigger('click');
				e.preventDefault();
				}
			},

			postHandler: function(e) {
				var title, to, from, password;
				e.preventDefault();

				el.find('button._save').button('loading');

				title = this.$('input[name=title]').val() || '';
				to = this.$('input[name=to]').val();
				from = this.$('input[name=from]').val();
				password = this.$('input[name=password]').val();
				remember = this.$('input[name=remember]').is(':checked');
				mode = this.$('input[name=html]').parent().hasClass('active');
				mode = mode ? 'html' : 'md';

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

			keypressHandler: function(e) {
				var to = this.$('input[name=to]').val();

				if (to.indexOf('@tumblr.co') > -1) {
					this.$('input[name=html]').parent().removeClass('active');
					this.$('input[name=markdown]').parent().addClass('active');
				} else {
					this.$('input[name=markdown]').parent().removeClass('active');
					this.$('input[name=html]').parent().addClass('active');
				}
			},

			pushHandler: function(e) {
				
			},

			error: function(msg) {
				error(msg);
			},

			closeHandler: function(e) {
				e.preventDefault();

				stop();
				this.trigger('cancel');
				this.hide();
			}
		});

		return View;
});