define([
		'vendors/text!tpl/modal-save.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var View = Backbone.View.extend({
			el: '#save-dialog',

			events: {
				'click ._dont_save': 'dontSaveHandler',
				'click ._save': 'saveHandler',
				'click ._cancel': 'cancelHandler'
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
			}
		});

		return View;
});