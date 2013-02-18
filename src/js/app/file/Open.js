define([
		'module',
		'text!tpl/file.html'
	], 

	function(module, html) {
		var file;

		$('#fields').append(html);

		var View = Backbone.View.extend({
			el: '#fields',

			events: {
				'change #fileDialog': 'changeHandler'	
			},

			changeHandler: function() {
				file = $('#fileDialog').val();
				if(!file) { return; }
				
				this.trigger('open_file', file);
			},

			open: function() {
				$('#fileDialog').trigger('click');
			}
		});

		module.exports = new View();

});