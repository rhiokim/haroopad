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

		function getBodyHtml() {
			contentDocument = Viewer.getContentDocument();
			return contentDocument.body.outerHTML;
		}

		function getTitle() {
			var contentDocument = Viewer.getContentDocument();
			var h1, h2
			h1 = contentDocument.querySelectorAll('body>h1');

			if (!h1[0]) {
				h2 = contentDocument.querySelectorAll('body>h2');
				return (h2[0]) ? h2[0].innerHTML : 'Untitle';
			} else {
				return h1[0].innerHTML;
			}
		}

		function getFooterHtml() {
			return _glo.exportHtmlFooter();
		}

		function saveHandler(e) {
			var file = $(e.target).val();

			save(file);

			$("#exportHTML").off('change', saveHandler);
			$("#exportHTML").val("");
		}

		window.ee.on('file.exports.html', function() {
			res = html.replace('@@style', getStyleSheets());
			res = res.replace('@@body', getBodyHtml());
			res = res.replace('</body>', getFooterHtml() +'\n</body>');
			res = res.replace('@@title', getTitle());
			res = res.replace('@@generator', getGenerator());
			// res = res.replace('@@author', os.hostname());

			$("#exportHTML").trigger("click");
			$("#exportHTML").on('change', saveHandler);
			/**
			 * 1. get html
			 * 2. load template
			 * 3. set css
			 * 4. set html
			 * 5. save html
			 */
		});
});