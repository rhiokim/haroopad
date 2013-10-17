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
		wrapper.innerHTML = htmlStyledDoc.querySelector('#root').innerHTML;
		wrapper.setAttribute('style', htmlStyledDoc.lastElementChild.getAttribute('style'));

		nw.file.set({ styledHTML: wrapper.outerHTML }, { silent: true });
	}

	function generateInlineStyle() {
		htmlStyledDoc = document.createElement('html');
		htmlStyledDoc.innerHTML = htmlDoc.documentElement.innerHTML;

		makeStylesExplicit();
	}

	window.ee.on('menu.file.exports.clipboard.styled', function() {
		generateInlineStyle();
		clipboard.set(nw.file.get('styledHTML'), 'text');
	});

	return {
		generateInlineStyle: generateInlineStyle
	}
});