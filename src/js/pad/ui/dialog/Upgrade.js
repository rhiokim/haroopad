define([
		'vendors/text!tpl/modal-new-version.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var View = Backbone.View.extend({
			el: '#new-version-dialog',

			events: {
				'click ._download': 'downloadHandler',
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

			downloadHandler: function() {
				this.trigger('download.haroopad');
				this.hide();
			},

			cancelHandler: function() {
				this.hide();
			}
		});

		return View;
});