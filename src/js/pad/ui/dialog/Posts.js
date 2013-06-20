define([
		'vendors/text!tpl/modal-post-tumblr.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var View = Backbone.View.extend({
			el: '#post-tumblr-dialog',

			events: {
				// 'click ._dont_save': 'dontSaveHandler',
				'click ._save': 'postHandler',
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

			postHandler: function() {
				this.trigger('post');
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