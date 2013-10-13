define([
		'viewer/Viewer',
		'vendors/text!tpl/exports.html'
	],
	function(Viewer, html) {
		var fs = require('fs'),
			path = require('path'),
			os = require('os'),
			cleanCss = require('clean-css');
		var gui = require('nw.gui');
		var manifest = global.package;
		var saveEl = $("#exportHTML");

		var res;
		
		function save(file) {
			if(path.extname(file).indexOf('.htm') < 0) {
				file += '.html';
			}
			
			if(fs.existsSync(file)) {
				//TODO overwriting confirm dialog
				fs.writeFileSync(file, res, 'utf8');
			} else {
				fs.writeFileSync(file, res, 'utf8');
			}
		}

		function getGenerator() {
			return manifest.name +' '+ manifest.version;
		}

		function getStyleSheets() {
			var href, cssText = '';
			var contentDocument = Viewer.getContentDocument();

			_.each(contentDocument.styleSheets, function(item) {
				href = item.href;
				href = href.split('?')[0];
				href = decodeURIComponent(href);
				href = href.replace('file:///', '');

				if (getPlatformName() !== 'windows') {
					href = '/' + href;
				}

				if (fs.existsSync(href)) {
					cssText += fs.readFileSync(href, 'utf8');
				}
			});
			
			cssText += '\n footer {position:fixed; font-size:.8em; text-align:right; bottom:0px; margin-left:-25px; height:20px; width:100%;}';
			cssText = cleanCss.process(cssText);

			return cssText;
		}

		function _replaceOriginalEmbed(html) {
			var str, type, provider, oembededs = contentDocument.body.querySelectorAll('.oembeded');
  			oembededs = Array.prototype.slice.call(oembededs, 0);

			_.each(oembededs, function(node) {
				str = node.getAttribute('data-replace');
				type = node.getAttribute('data-type');
				provider = node.getAttribute('data-provider');

				switch(provider) {
					case 'twitter':
						html = html.replace(node.innerHTML, str);
					break;
				}
			});

			return html;
		}

		function getBodyHtml() {
			var mdBody;
			contentDocument = Viewer.getContentDocument();
			mdBody = contentDocument.getElementById('root');
			return mdBody.innerHTML;
		}

		function getBodyClass() {
			return contentDocument.body.getAttribute('class');
		}

		function getTitle() {
			var title = nw.file.get('title');
			var basename = nw.file.get('basename');
			var extname = nw.file.get('extname');
			
			title = basename ? basename.replace(extname, '') : title;
			title = title || 'Untitled';
			title += '.html';

			return title;
		}

		function getFooterHtml() {
			return _glo.exportHtmlFooter();
		}

		function saveHandler(e) {
			var file = $(e.target).val();

			save(file);

			saveEl.off('change', saveHandler);
			saveEl.val("");
		}

		window.ee.on('file.exports.html', function() {
			var title = getTitle();

			res = html.replace('@@style', getStyleSheets());
			res = res.replace('@@body', getBodyHtml());
			res = res.replace('@@class', getBodyClass());
			res = res.replace('@@footer', getFooterHtml());
			res = res.replace('@@title', title);
			res = res.replace('@@generator', getGenerator());
			// res = res.replace('@@author', os.hostname());

      		saveEl.attr('nwsaveas', title );
			saveEl.trigger("click");
			saveEl.on('change', saveHandler);
			/**
			 * 1. get html
			 * 2. load template
			 * 3. set css
			 * 4. set html
			 * 5. save html
			 */
		});
});