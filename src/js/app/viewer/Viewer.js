define([
		'preferences/Viewer.opt'
	], 
	function(option) {
		var viewer = $('#haroo iframe')[0].contentWindow;
		
		var config = option.toJSON();

		option.bind('change:viewStyle', function(model, value) {});
		
		option.bind('change:codeStyle', function(model, value) {});

		option.bind('change:clickableLink', function(model, value) {
			value ? viewer.blockLink() : viewer.allowLink();
		});

		return {
			update: function(contents) {
				viewer.update(contents);
			},

			scroll: function(top, per) {
				viewer.scrollTop(top * 100 / per);
			}
		};
	});