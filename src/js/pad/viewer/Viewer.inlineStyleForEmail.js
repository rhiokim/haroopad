define([
], function() {

	var fs = require('fs'),
		path = require('path');

	var gui = require('nw.gui'),
		clipboard = gui.Clipboard.get();

	var iframe = $('#viewer iframe')[0];
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

		nw.file.set({ emailHTML: wrapper.outerHTML }, { silent: true });
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
				console.log(img.toString('base64'));
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

	function _replaceOriginalEmbed() {
		var str, type, provider, 
				riches = htmlStyledDoc.querySelectorAll('[data-type=rich]'),
				videos = htmlStyledDoc.querySelectorAll('[data-type=video]');

  			riches = Array.prototype.slice.call(riches, 0);
  			videos = Array.prototype.slice.call(videos, 0);

		_.each(videos, function(video) {
			video.innerHTML = '<blockquote>'+ video.getAttribute('data-origin') +'</blockquote>';
		});
		 
		_.each(riches, function(rich) {
			provider = rich.getAttribute('data-provider');

			switch(provider) {
				case 'opengraph':
					return;
				break;
				case 'twitter':
					rich.innerHTML = rich.getAttribute('data-replace');
				break;
				default:
					rich.innerHTML = '<blockquote>'+ rich.getAttribute('data-origin') +'</blockquote>';
				break;
			}
		});
	}

	/**
	 * replace data-echo
	 */
	function _replaceLazyLoading() {
		var frags, data;
		frags = htmlStyledDoc.querySelectorAll('[data-echo]');
		frags = Array.prototype.slice.call(frags, 0);

		_.each(frags, function(frag) {
			data = frag.getAttribute('data-echo');
			frag.setAttribute('src', data);
			frag.removeAttribute('data-echo');
		});
	}

	function generateInlineStyle() {
		htmlStyledDoc = document.createElement('html');
		htmlStyledDoc.innerHTML = htmlDoc.documentElement.innerHTML;

		_replaceOriginalEmbed();
		_replaceLazyLoading();

		attachImage();
		makeStylesExplicit();
	}

	window.ee.on('menu.file.send.email', generateInlineStyle);

	return {
		generateInlineStyle: generateInlineStyle
	}
});