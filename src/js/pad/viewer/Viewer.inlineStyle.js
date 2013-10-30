define([
], function() {

	var fs = require('fs'),
		path = require('path');

	var gui = require('nw.gui'),
		clipboard = gui.Clipboard.get();

	var iframe = $('#haroo iframe')[0];
	var viewer = iframe.contentWindow;

	var htmlDoc = iframe.contentDocument;
	var shadow = document.createElement('html');

	function setInlineStyles(rules) {
		var i, j, selectorMatches, styleAttr;

		for (i = 0; i < rules.length; i++) {
			rule = rules[i];

			selectorMatches = shadow.querySelectorAll(rule.selectorText);

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

	function _replaceOriginalEmbed() {
		var str, type, provider, 
			tweets = shadow.querySelectorAll('[data-provider=twitter]');
  			tweets = Array.prototype.slice.call(tweets, 0);

		_.each(tweets, function(tweet) {
			tweet.innerHTML = tweet.getAttribute('data-replace');
		});
	}

	function _removeDataProperties() {
		var frags, attrs, dataAttr = /^data-/;

		frags = shadow.querySelectorAll('#root>*');
		frags = Array.prototype.slice.call(frags, 0);

		_.each(frags, function(el) {
			attrs = el.attributes;

			el.removeAttribute('class');
			el.removeAttribute('data-url');
			el.removeAttribute('data-prop');
			el.removeAttribute('data-replace');
			el.removeAttribute('data-type');
			el.removeAttribute('data-provider');
			el.removeAttribute('data-origin');
		});
	}

	function makeStylesExplicit() {
		var styleSheets, i;
		var wrapper = document.createElement('div');

		styleSheets = htmlDoc.styleSheets;

		for (i = 0; i < styleSheets.length; i++) {
			setInlineStyles(styleSheets[i].cssRules);
		}

		_replaceOriginalEmbed();
		_removeDataProperties();

		wrapper.innerHTML = shadow.querySelector('#root').innerHTML;
		wrapper.setAttribute('style', shadow.lastElementChild.getAttribute('style'));

		nw.file.set({ styledHTML: wrapper.outerHTML }, { silent: true });
	}

	function generateInlineStyle() {
		shadow.innerHTML = htmlDoc.documentElement.innerHTML;

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