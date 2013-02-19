define([
		'module',
		'text!tpl/file.html'
	], 

	function(module, html) {
		
		var View = Backbone.View.extend({

			changeHandler: function() {
				this.trigger('open_file', file);
			},

			do: function() {
				$("#saveFile").trigger("click");
			}
		});

		module.exports = new View();

});