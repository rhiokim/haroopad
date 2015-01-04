define([
		'vendors/text!tpl/modal-save.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var View = Backbone.View.extend({
			el: '#save-dialog',

			isMacCommandKeyPressed: false,

			events: {
				'click ._dont_save': 'dontSaveHandler',
				'click ._save': 'saveHandler',
				'click ._cancel': 'cancelHandler',
				'keydown': 'keyDown',
				'keyup': 'keyUp'
			},

			initialize: function() {
			},

			show: function() {
				this.$el.modal('show');
			},

			hide: function() {
				this.$el.modal('hide');
			},

			saveHandler: function() {
				this.trigger('save');
				this.hide();
			},

			cancelHandler: function() {
				this.hide();
			},
			
			dontSaveHandler: function() {
				this.trigger('dont-save');
				this.hide();
			},

			keyDown: function(e) {
				if (/Mac/.test(navigator.platform)) {
					// keyCode 91 and 93 are MacOS Left and Right Command Keys.
					if ((e.keyCode === 91 || e.keyCode === 93)) {
						this.$isMacCommandKeyPressed = true;

					} else if (this.$isMacCommandKeyPressed && e.keyCode === 68) {
						this.dontSaveHandler();

					} else if (e.keyCode === 13) {
						this.saveHandler();

					} else if (e.keyCode === 27) {
						this.cancelHandler();
					}
				}
			},

			keyUp: function(e) {
				if (/Mac/.test(navigator.platform)) {
					if ((e.keyCode === 91 || e.keyCode === 93)) {
						this.$isMacCommandKeyPressed = false;
					}
				}
			}

		});

		return View;
});