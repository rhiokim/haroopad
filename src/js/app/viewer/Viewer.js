define([
		'preferences/Viewer.opt'
	], 
	function(option) {
		var iframe = $('#haroo iframe')[0];
		var viewer = iframe.contentWindow;
		var content = '';
		
		var config = option.toJSON();

		option.bind('change:viewStyle', function(model, value) {
			iframe.src = 'viewer.html?view='+ value +'&code='+ config.codeStyle;
			viewer.update(content);
		});
		
		option.bind('change:codeStyle', function(model, value) {
			iframe.src = 'viewer.html?view='+ config.viewStyle +'&code='+ value;
			viewer.update(content);
		});

		option.bind('change:clickableLink', function(model, value) {
			value ? viewer.allowLink() : viewer.blockLink() ;
		});

		iframe.src = 'viewer.html?view='+ config.viewStyle +'&code='+ config.codeStyle;

		return {
			update: function(text) {
				content = text;
				viewer.update(content);

				option.clickableLink ? viewer.allowLink() : viewer.blockLink();
			},

			scroll: function(top, per) {
				viewer.scrollTop(top * 100 / per);
			}
		};
	});