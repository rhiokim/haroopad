
/*
 * grunt-replace
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

module.exports = function (grunt) {

  'use strict';

  var path = require('path');
  var fs = require('fs');
  var util = require('util');
  var chalk = require('chalk');
  var _ = require('lodash');

  grunt.registerMultiTask('replace', 'Replace text patterns with a given replacement.', function () {

    var options = this.options({
      encoding: grunt.file.defaultEncoding,
      mode: false,
      patterns: [],
      prefix: '@@',
      usePrefix: true,
      preservePrefix: false,
      force: false,
      delimiter: '.',
      processContentExclude: []
    });
    var patterns = options.patterns;
    var locals = [];

    // add prefix

    if (options.usePrefix === false) {
      options.prefix =  '';
    }

    // backward compatibility

    var variables = options.variables;
    if (typeof variables !== 'undefined') {
      patterns.push({
        json: variables
      });
    }

    // intercept and transform json objects

    for (var i = patterns.length - 1; i >= 0; i -= 1) {
      var json = patterns[i].json;
      if (typeof json !== 'undefined') {
        if (_.isPlainObject(json)) {
          var items = flatten(json, options);
          // replace json with flatten data
          Array.prototype.splice.apply(patterns, [i, 1].concat(items));
        } else {
          grunt.fail.fatal('Unsupported type for json (plain object expected).');
          return;
        }
      }
    }

    // register processing patterns

    patterns.push({
      match: '__SOURCE_FILE__',
      replacement: function (match, offset, string, source, target) {
        return source;
      }
    }, {
      match: '__SOURCE_PATH__',
      replacement: function (match, offset, string, source, target) {
        return path.dirname(source);
      }
    }, {
      match: '__SOURCE_FILENAME__',
      replacement: function (match, offset, string, source, target) {
        return path.basename(source);
      }
    }, {
      match: '__TARGET_FILE__',
      replacement: function (match, offset, string, source, target) {
        return target;
      }
    }, {
      match: '__TARGET_PATH__',
      replacement: function (match, offset, string, source, target) {
        return path.dirname(target);
      }
    }, {
      match: '__TARGET_FILENAME__',
      replacement: function (match, offset, string, source, target) {
        return path.basename(target);
      }
    });

    // only sort non regex patterns (prevents replace issues like head, header)

    patterns.sort(function (a, b) {
      var x = a.match;
      var y = b.match;
      if (_.isString(x) && _.isString(y)) {
        return y.length - x.length;
      } else if (_.isString(x)) {
        return -1;
      }
      return 1;
    });

    // register patterns

    patterns.forEach(function (pattern) {
      registerPattern(pattern, locals, options);
    });

    // verbose

    grunt.verbose.writeln(util.inspect(locals));

    // replacements ?

    if (locals.length === 0 && options.force === false) {
      grunt.fail.warn('Not found valid patterns to be replaced.');
    }

    // took code from copy task

    var dest;
    var isExpandedPair;

    this.files.forEach(function (filePair) {
      isExpandedPair = filePair.orig.expand || false;
      filePair.src.forEach(function (src) {
        if (detectDestType(filePair.dest) === 'directory') {
          dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
        } else {
          dest = filePair.dest;
        }
        if (grunt.file.isDir(src)) {
          grunt.file.mkdir(dest);
        } else {
          replace(src, dest, locals, options);
          if (options.mode !== false) {
            fs.chmodSync(dest, (options.mode === true) ? fs.lstatSync(src).mode : options.mode);
          }
        }
      });
    });

  });

  var detectDestType = function (dest) {
    var lastChar = dest.slice(-1);
    if (lastChar === '/') {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var unixifyPath = function (filepath) {
    if (process.platform === 'win32') {
      return filepath.replace(/\\/g, '/');
    } else {
      return filepath;
    }
  };

  var registerPattern = function (pattern, locals, options) {
    var match = pattern.match;
    var replacement = pattern.replacement;
    var expression = pattern.expression === true;
    // match check
    if (_.isRegExp(match)) {
      expression = true;
    } else if (_.isString(match)) {
      if (match.length > 0) {
        if (expression === true) {
          var index = match.lastIndexOf('/');
          if (match[0] === '/' && index > 0) {
            try {
              match = new RegExp(match.slice(1, index), match.slice(index + 1));
            } catch (error) {
              grunt.log.error(error);
              return;
            }
          } else {
            grunt.fail.fatal('Invalid expression found for match: ' + match);
            return;
          }
        } else {
          // old school
          try {
            match = new RegExp(options.prefix + match, 'g');
          } catch (error) {
            grunt.fail.fatal(error);
            return;
          }
        }
      } else {
        // empty match
        return;
      }
    } else {
      grunt.fail.fatal('Unsupported type for match (RegExp or String expected).');
      return;
    }
    // replacement check
    if (!_.isFunction(replacement)) {
      if (!_.isString(replacement)) {
        // transform object to string
        replacement = JSON.stringify(replacement);
      } else {
        // easy way
        if (expression === false && options.preservePrefix === true) {
          replacement = options.prefix + replacement;
        }
      }
    } else {
      // replace using function return value
    }
    locals.push({
      match: match,
      replacement: replacement,
      expression: expression
    });
  };

  var replace = function (source, target, locals, options) {
    grunt.file.copy(source, target, {
      encoding: options.encoding,
      process: function (contents) {
        var updated = false;
        locals.forEach(function (pattern) {
          var re = pattern.match;
          var replacement = pattern.replacement;
          // wrap replacement function to add process arguments
          if (_.isFunction(replacement)) {
            replacement = function () {
              var args = Array.prototype.slice.call(arguments);
              args.push(source, target);
              return pattern.replacement.apply(this, args);
            };
          }
          updated = updated || contents.match(re);
          contents = contents.replace(re, replacement);
        });
        if (!updated && options.force === false) {
          return false;
        }
        grunt.log.writeln('Replace ' + chalk.cyan(source) + ' -> ' +
          chalk.cyan(target));
        return contents;
      },
      noProcess: options.noProcess || options.processContentExclude
    });
  };

  var flatten = function (data, options) {
    var delimiter = options.delimiter;
    var result = [];
    function recurse (cur, prop) {
      for (var key in cur) {
        if (cur.hasOwnProperty(key)) {
          var item = cur[key];
          result.push({
            match: prop ? prop + delimiter + key : key,
            replacement: item,
            expression: false
          });
          // deep scan
          if (typeof item === 'object') {
            recurse(item, prop ? prop + delimiter + key : key);
          }
        }
      }
    }
    recurse(data);
    return result;
  };

};
