var marked = require('marked');
var watch = require('watch');
var path = require('path');
var fs = require('fs');
var marked = require('marked');

var opt = {
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: true,
  silent: false,
  langPrefix: 'language-'
};

marked.setOptions(opt);

var renderer = new marked.Renderer();

var parse = function(src, options) {
  options = options || opt;
  return marked.parser(marked.lexer(src, options), options, renderer);
}

function readFile(file) {
	return fs.readFileSync(file, 'utf8');
}

function tokenize(md) {
	var tokens = md.split('===');
	return tokens;
}

function monitor(file, options, next) {
	var dir = path.dirname(file);
	var tokens, md, steps = [];

	watch.createMonitor(dir, options, function(monitor) {
		monitor.files[file];
		monitor.on('changed', function(f, curr, prev) {
			md = readFile(file);
			steps.length = 0;

			tokens = tokenize(md);

			tokens.forEach(function(item, idx) {
				steps.push('<div class="step">\n\t' + parse(item) + '\n</div>');
			});

			next(steps.join('\n\n'));
		});
	});
}