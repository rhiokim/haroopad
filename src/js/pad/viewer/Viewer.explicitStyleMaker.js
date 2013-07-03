define([
		'ui/file/File.opt',
		],function(FileOpt) {

		var fs = require('fs');

		var iframe = $('#haroo iframe')[0];
		var viewer = iframe.contentWindow;

		var htmlDoc = iframe.contentDocument;

		function cssRules(rules) {
			var i, j, selectorMatches, styleAttr;

			for (i = 0; i < rules.length; i++) {
				rule = rules[i];

				selectorMatches = htmlDoc.querySelectorAll(rule.selectorText);

				for (j = 0; j < selectorMatches.length; j++ ) {
					elem = selectorMatches[j];
					styleAttr = selectorMatches[j].getAttribute('style') || '';

					if (styleAttr && styleAttr.search(/;[\s]*$/) < 0) {
	          styleAttr += '; ';
	        }

	        styleAttr += rule.style.cssText;

	        selectorMatches[j].setAttribute('style', styleAttr);
				}
			}
		}

		function makeStylesExplicit(wrapperElem) {
		  var styleSheets, i;

		  styleSheets = htmlDoc.styleSheets;

		  for (i = 0; i < styleSheets.length; i++) {
		  	cssRules(styleSheets[i].cssRules);
		  }
	  }

	  function makeImageEncode() {
	  	var i, images;

	  	images = htmlDoc.querySelectorAll('img');

	  	for (i = 0; i < images.length; i++) {
	  		if(images[i].href.indexOf('://') < 0) {
	  			var img = fs.readFileSync(images);
	  			console.log(img.toString('base64'));
	  		}
	  	}
	  }

		window.ee.on('file.posts.tumblr', function() {
			makeStylesExplicit(htmlDoc);
			// makeImageEncode();
			FileOpt.set('html', iframe.contentDocument.body.innerHTML);
		});
});