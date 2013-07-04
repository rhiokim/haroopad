define([
		'ui/file/File.opt',
		],function(FileOpt) {

		var fs = require('fs'),
				path = require('path');

		var iframe = $('#haroo iframe')[0];
		var viewer = iframe.contentWindow;

		var htmlDoc = iframe.contentDocument;
		var htmlStyledDoc;

		function setInlineStyles(rules) {
			var i, j, selectorMatches, styleAttr;
			
			for (i = 0; i < rules.length; i++) {
				rule = rules[i];

				selectorMatches = htmlStyledDoc.querySelectorAll(rule.selectorText);

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

		function makeStylesExplicit() {
		  var styleSheets, i;

		  styleSheets = htmlDoc.styleSheets;

		  for (i = 0; i < styleSheets.length; i++) {
		  	setInlineStyles(styleSheets[i].cssRules);
		  }

		  var wrapper = $('<div>').html(htmlStyledDoc.innerHTML);
		  wrapper.attr('style', $(htmlStyledDoc.body).attr('style'));

		  FileOpt.set('html', wrapper[0].outerHTML);
	  }

	  function makeImageEncode() {
	  	var i, img, image, images;

	  	images = htmlDoc.querySelectorAll('img');

	  	for (i = 0; i < images.length; i++) {
	  		image = images[i];
	  		src = image.src;

	  		if(!src) {
	  			continue;
	  		}
				
				if (process.platform !== 'win32') {
					src = src.replace('file://', '');
				}
	  		
	  		if(src.indexOf('://') < 0) {
	  			src = decodeURIComponent(src);
	  			img = fs.readFileSync(src);

	  			// image.src = 'data:image/png;base64,'+ img.toString('base64');
	  			// image.src = 'data:image/png;base64,';
	  		}
	  	}
	  }

	  function attachImage() {
	  	var i, name, img, image, images;
	  	var attachments = [];

	  	images = htmlStyledDoc.querySelectorAll('img');

	  	for (i = 0; i < images.length; i++) {
	  		image = images[i];
	  		src = image.src;

	  		if(!src) {
	  			continue;
	  		}
				
				if (process.platform !== 'win32') {
					src = src.replace('file://', '');
				}
	  		
	  		if(src.indexOf('://') < 0) {
	  			src = decodeURIComponent(src);
	  			src = path.normalize(src);
	  			name = path.basename(src);

	  			// src = src.replace(' ', '\ ');
	  			attachments.push({
	  				fileName: name,
	  				// streamSource: fs.createReadStream(src)
	  				// contentType: "image/png"
	  				filePath: src,
	  				cid: name
	  			});

	  			// image.src = 'data:image/png;base64,'+ img.toString('base64');
	  			// image.src = 'data:image/png;base64,';
	  			image.src = 'cid:'+ name;
	  		}
	  	}

	  	// attachments.push(
    //     {   // use URL as an attachment
    //         fileName: "license.txt",
    //         filePath: "https://raw.github.com/andris9/Nodemailer/master/LICENSE"
    //     });

	  	FileOpt.set('attachments', attachments);
	  }

		window.ee.on('file.posts.tumblr', function() {

			htmlStyledDoc = $(htmlDoc.body).clone()[0];
			
			// makeImageEncode();
			attachImage();
			makeStylesExplicit();
		});
});