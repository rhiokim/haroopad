/**
 * reload changed file
 */
define([
		'vendors/text!tpl/modal-changed-file.html'
	], 
	function(html) {
		$('#dialogs').append(html);

		var View = Backbone.View.extend({
			el: '#file-changed-dialog',

			events: {
				'click ._reload': 'reloadHandler',
				'click ._cancel': 'cancelHandler'
			},

			initialize: function() {
				this.$el.i18n();
			},

			show: function(file) {
				this.$el.find('._filename').html(file);
				this.$el.modal('show');
			},

			hide: function() {
				this.$el.modal('hide');
			},

			reloadHandler: function() {
				this.trigger('reload');
				this.hide();
			},

			cancelHandler: function() {
				this.hide();
			}
		});

		return View;
});