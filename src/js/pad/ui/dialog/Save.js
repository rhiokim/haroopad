define([
		'vendors/text!tpl/modal-save.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var tabCnt = 0;
		var View = Backbone.View.extend({
			el: '#save-dialog',

			events: {
				'click ._dont_save': 'dontSaveHandler',
				'click ._save': 'saveHandler',
				'click ._cancel': 'cancelHandler',
				'keydown': 'keydownHandler'
			},

			initialize: function() {
			},

			show: function() {
				this.$el.modal('show');
				this.$('._save').focus();
			},

			hide: function() {
				this.$el.modal('hide');
			},

			keydownHandler: function(e) {
				if (e.keyCode == 9) {
					tabCnt++;

					switch(tabCnt % 3) {
						case 0 :
							this.$('._dont_save').focus();
						break;
						case 1 :
							this.$('._cancel').focus();
						break;
						case 2 :
							this.$('._save').focus();
						break;
					}
					e.preventDefault();
				}
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
			}
		});

		return View;
});