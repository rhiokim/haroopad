
/*
 *  Copyright 2013 outaTiME.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

module.exports = function (grunt) {

  'use strict';

  var path = require('path');
  var fs = require('fs');
  var flatten = require('flat').flatten;

  grunt.registerMultiTask('replace', 'Replace text patterns with a given string.', function () {

    var
      _ = grunt.util._,
      options = this.options({
        variables: {},
        patterns: [],
        prefix: '@@',
        force: false,
        mode: false
      }),
      variables = options.variables,
      patterns = options.patterns,
      locals = [],
      registerPattern = function (pattern) {
        var match = pattern.match, replacement = pattern.replacement,
          expression = pattern.expression === true;
        if (_.isRegExp(match)) {
          if (expression === false) {
            expression = true;
          }
        } else if (_.isString(match)) {
          // force process templating
          match = grunt.template.process(match);
          if (match.length > 0) {
            if (expression === true) {
              var index = match.lastIndexOf('/');
              if (match[0] === '/' && index > 0) {
                try {
                  match = new RegExp(match.slice(1, index), match.slice(index + 1));
                } catch (error) {
                  grunt.fail.fatal(error);
                  return;
                }
              } else {
                grunt.fail.fatal('Invalid expression found for match: ' + match);
                return;
              }
            } else {
              // old school
              try {
                match = new RegExp(options.prefix + match, "g");
              } catch (error) {
                grunt.fail.fatal(error);
                return;
              }
            }
          } else {
            // invalid match, ignore rule
            return;
          }
        } else {
          grunt.fail.fatal('Unsupported type for match (RegExp or String expected).');
          return;
        }
        // replacement check
        if (_.isString(replacement)) {
          // force process templating
          replacement = grunt.template.process(replacement);
        }
        locals.push({
          match: match,
          replacement: replacement,
          expression: expression
        });
      };

    grunt.verbose.writeflags(options, 'Options');

    // backward compatible support

    Object.keys(variables).sort(function (a, b) {
      // sort variables (prevents replace issues like head, header)
      return b.length - a.length;
    }).forEach(function (variable) {
      patterns.push({
        match: variable,
        replacement: variables[variable],
        expression: false
      });
    });

    // process patterns

    patterns.forEach(function (pattern) {
      var json = pattern.json;
      if (typeof json !== "undefined") {
        // json
        if (_.isObject(json)) {
          _.forOwn(flatten(json), function(value, key) {
            registerPattern({
              match: key,
              replacement: value
            });
          });
        } else {
          grunt.fail.fatal('Unsupported type for json (Object expected).');
          return;
        }
      } else {
        // match
        registerPattern(pattern);
      }
    });

    if (locals.length === 0 && options.force === false) {
      grunt.fail.warn('Not found valid patterns to be replaced.');
    }

    // took code from copy task

    var dest;
    var isExpandedPair;

    this.files.forEach(function(filePair) {
      isExpandedPair = filePair.orig.expand || false;
      filePair.src.forEach(function(src) {
        if (detectDestType(filePair.dest) === 'directory') {
          dest = (isExpandedPair) ? filePair.dest : unixifyPath(path.join(filePair.dest, src));
        } else {
          dest = filePair.dest;
        }
        if (grunt.file.isDir(src)) {
          grunt.file.mkdir(dest);
        } else {
          replace(src, dest, options, locals);
          if (options.mode !== false) {
            fs.chmodSync(dest, (options.mode === true) ? fs.lstatSync(src).mode : options.mode);
          }
        }
      });
    });

  });

  var detectDestType = function (dest) {
    if (grunt.util._.endsWith(dest, '/')) {
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

  var replace = function (srcFile, destFile, options, patterns) {
    grunt.file.copy(srcFile, destFile, {
      process: function (contents) {
        var updated = false;
        patterns.forEach(function (pattern) {
          var re = pattern.match, replacement = pattern.replacement;
          updated = updated || contents.match(re);
          contents = contents.replace(re, replacement);
        });
        if (!updated && options.force === false) {
          return false;
        }
        grunt.log.writeln('Replace ' + srcFile.cyan + ' -> ' + destFile.cyan);
        return contents;
      }
    });
  };

};
