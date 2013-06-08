define([
		'vendors/text!tpl/modal-save-replace.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var View = Backbone.View.extend({
			el: '#save-replace-dialog',

			events: {
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
				this.hide();
			}
		});

		return View;
});