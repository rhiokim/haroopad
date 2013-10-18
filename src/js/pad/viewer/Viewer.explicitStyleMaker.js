define([
], function() {

	var fs = require('fs'),
		path = require('path');

	var gui = require('nw.gui'),
		clipboard = gui.Clipboard.get();

	var iframe = $('#haroo iframe')[0];
	var viewer = iframe.contentWindow;

	var htmlDoc = iframe.contentDocument;
	var htmlStyledDoc;

	function setInlineStyles(rules) {
		var i, j, selectorMatches, styleAttr;

		for (i = 0; i < rules.length; i++) {
			rule = rules[i];

			selectorMatches = htmlStyledDoc.querySelectorAll(rule.selectorText);

			for (j = 0; j < selectorMatches.length; j++) {
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

		var wrapper = document.createElement('div');
		wrapper.innerHTML = htmlStyledDoc.lastElementChild.innerHTML;
		wrapper.setAttribute('style', htmlStyledDoc.lastElementChild.getAttribute('style'));

		nw.file.set({ styledHTML: wrapper.outerHTML }, { silent: true });
	}

	function makeImageEncode() {
		var i, img, image, images;

		images = htmlDoc.querySelectorAll('img');

		for (i = 0; i < images.length; i++) {
			image = images[i];
			src = image.src;

			if (!src) {
				continue;
			}

			if (process.platform !== 'win32') {
				src = src.replace('file://', '');
			}

			if (src.indexOf('://') < 0) {
				src = decodeURIComponent(src);
				img = fs.readFileSync(src);
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

			if (!src) {
				continue;
			}

			if (process.platform !== 'win32') {
				src = src.replace('file://', '');
			}

			if (src.indexOf('://') < 0) {
				src = decodeURIComponent(src);
				src = path.normalize(src);
				name = path.basename(src);

				// src = src.replace(' ', '\ ');
				attachments.push({
					fileName: name,
					filePath: src,
					cid: name
				});

				image.src = 'cid:' + name;
			}
		}

		nw.file.set('attachments', attachments);
	}

	function generateInlineStyle() {
		htmlStyledDoc = document.createElement('html');
		htmlStyledDoc.innerHTML = htmlDoc.documentElement.innerHTML;

		attachImage();
		makeStylesExplicit();
	}

	return {
		generateInlineStyle: generateInlineStyle
	}
});