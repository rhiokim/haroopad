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
				'change #openFile': 'changeHandler'	
			},

			changeHandler: function() {
				file = $('#openFile').val();
				if(!file) { return; }
				
				this.trigger('open_file', file);
			},

			pop: function() {
				$('#openFile').trigger('click');
			}
		});

		module.exports = new View();

});