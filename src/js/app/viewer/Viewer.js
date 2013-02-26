define([
		'preferences/Viewer.opt'
	], 
	function(option) {
		var iframe = $('#haroo iframe')[0];
		var viewer = iframe.contentWindow;
		var content = '';
		
		var config = option.toJSON();

		option.bind('change:viewStyle', function(model, value) {
			config = model.toJSON();
			iframe.src = 'viewer.html?view='+ value +'&code='+ config.codeStyle;
		});
		
		option.bind('change:codeStyle', function(model, value) {
			config = model.toJSON();
			iframe.src = 'viewer.html?view='+ config.viewStyle +'&code='+ value;
		});

		option.bind('change:clickableLink', function(model, value) {
			value ? viewer.allowLink() : viewer.blockLink() ;
		});

		iframe.src = 'viewer.html?view='+ config.viewStyle +'&code='+ config.codeStyle;

		$(iframe).bind('load', function(e) {
			viewer.setViewStyle(config.viewStyle);
			viewer.setCodeStyle(config.codeStyle);
			viewer.update(content);
		});

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