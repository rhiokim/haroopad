define([
		'vendors/keyboard',
		'text!tpl/shortcut.html',
		'module'
	], 

	function(keyboard, html, module) {
		var fs = require('fs');
		var file, str;

		$('#fields').append(html);

		var View = Backbone.View.extend({
			el: '#fields',

			events: {
				'change #fileDialog': 'changeHandler'	
			},

			initialize: function(){

				keyboard.on('ctrl + o', function(e) {
					$('#fileDialog').trigger('click');
				});

			},

			changeHandler: function() {
				file = $('#fileDialog').val();
				
				if(!file) { return; }

				str = fs.readFileSync(file, 'utf8');

				this.trigger('open_file', str);
			}
		});

		module.exports = new View();

});