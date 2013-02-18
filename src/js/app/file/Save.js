define([
		'module',
		'text!tpl/file.html'
	], 

	function(module, html) {
		
		$('#dialog').append(html);

		var View = Backbone.View.extend({
			el: '#dialog',

			events: {
				'change #fileDialog': 'changeHandler'	
			},

			changeHandler: function() {
				this.trigger('open_file', file);
			},

			open: function() {
				$('#fileDialog').trigger('click');
			}
		});

		module.exports = new View();

});