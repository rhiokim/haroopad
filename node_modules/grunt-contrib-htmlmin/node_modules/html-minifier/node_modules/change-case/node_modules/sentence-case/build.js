var fs      = require('fs');
var join    = require('path').join;
var XRegExp = require('xregexp').XRegExp;

/**
 * Write the regular expressions to a file for reuse without needing to rely on
 * XRegExp to be loaded every time.
 *
 * @param {String} file
 * @param {RegExp} regexp
 */
var write = function (file, regexp) {
  var content  = 'module.exports = ' + regexp.toString() + ';';
  var filename = join(__dirname, 'vendor', file);

  return fs.writeFileSync(filename, content);
};

// Write regexps.
write('non-word-regexp.js', new XRegExp('[^\\p{L}\\p{N}]+', 'g'));
write('camel-case-regexp.js', new XRegExp('(\\p{Ll})([\\p{Lu}\\p{N}])', 'g'));
write('trailing-digit-regexp.js', new XRegExp('(\\p{N})(\\p{^N})', 'g'));
