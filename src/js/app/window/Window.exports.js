define([
		'window/Window.opt',
		'viewer/Viewer',
		'vendors/text!tpl/exports.html'
	],
	function(options, Viewer, html) {
		var fs = require('fs'),
				path = require('path');
		var gui = require('nw.gui'),
				win = gui.Window.get();

		var res;
		
		function save(file) {
			if(fs.existsSync(file)) {
				//TODO overwriting confirm dialog
				fs.writeFileSync(file, res, 'utf8');
			} else {
				fs.writeFileSync(file, res, 'utf8');
			}
		}

		function getStyleSheets() {
			var href, cssText = '';
			var contentDocument = Viewer.getContentDocument();

			_.each(contentDocument.styleSheets, function(item) {
				href = item.href;

				if(process.platform.indexOf('win32') < 0) {
					href = href.replace('file://', '');
				}

				cssText += fs.readFileSync(href, 'utf8');
			});

			return '<style>\n'+ cssText +'\n</style>';
		}

		function getBodyHtml() {
			contentDocument = Viewer.getContentDocument();
			return contentDocument.body.outerHTML;
		}

		function saveHandler(e) {
			var file = $(e.target).val();

			console.log(e.target)
			if(path.extname(file).indexOf('.htm') < 0) {
				file += '.html';
			}

			save(file);

			$("#saveHTMLFile").off('change', saveHandler);
			$("#saveHTMLFile").val("");
		}

		win.on('file.exports.html', function() {
			res = html.replace('@@style', getStyleSheets());
			res = res.replace('@@body', getBodyHtml());

			$("#saveHTMLFile").trigger("click");
			$("#saveHTMLFile").on('change', saveHandler);
			/**
			 * 1. get html
			 * 2. load template
			 * 3. set css
			 * 4. set html
			 * 5. save html
			 */
		});
});