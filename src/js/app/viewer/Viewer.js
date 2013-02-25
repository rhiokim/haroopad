define([
		'preferences/Viewer.opt'
	], 
	function(option) {
		var viewer = $('#haroo iframe')[0].contentWindow;
		
		var config = option.toJSON();

		option.bind('change:viewStyle', function(model, value) {});
		
		option.bind('change:codeStyle', function(model, value) {});

		option.bind('change:clickableLink', function(model, value) {
			value ? viewer.allowLink() : viewer.blockLink() ;
		});


		return {
			update: function(contents) {
				viewer.update(contents);

				option.clickableLink ? viewer.allowLink() : viewer.blockLink();
			},

			scroll: function(top, per) {
				viewer.scrollTop(top * 100 / per);
			}
		};
	});