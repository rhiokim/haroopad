
/*
 *  Copyright 2012 outaTiME.
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

  grunt.registerMultiTask('replace', 'Replace inline patterns with defined variables.', function () {

    var
      helpers = require('grunt-lib-contrib').init(grunt),
      options = helpers.options(this, {
        variables: {},
        prefix: '@@',
        basePath: false,
        flatten: false,
        minimatch: {},
        force: false
      }),
      variables = options.variables,
      locals = {},
      srcFiles,
      destType,
      basePath,
      filename,
      relative,
      destFile,
      srcFile;

    grunt.verbose.writeflags(options, 'Options');

    Object.keys(variables).forEach(function (variable) {
      var value = variables[variable];
      if (typeof value === 'string') {
        locals[grunt.template.process(variable)] = grunt.template.process(value);
      }
    });

    grunt.verbose.writeflags(locals, 'Locals');

    if (Object.keys(locals).length === 0 && options.force === false) {
      grunt.fail.warn('No valid variables for replace were found.');
    }

    this.files.forEach(function (file, index) {
      file.dest = path.normalize(file.dest);
      srcFiles = grunt.file.expand(options.minimatch, file.src);

      grunt.verbose.writeflags(file, 'File');

      if (srcFiles.length === 0) {
        grunt.fail.warn('Unable to replace, no valid source files were found.');
      }

      destType = detectDestType(file.dest);

      if (destType === 'file') {
        if (srcFiles.length === 1) {
          srcFile = path.normalize(srcFiles[0]);

          replace(srcFile, file.dest, options, locals);

          grunt.verbose.or.ok();
        } else {
          grunt.fail.warn('Unable to replace multiple files to the same destination filename, did you forget a trailing slash?');
        }
      } else if (destType === 'directory') {
        basePath = helpers.findBasePath(srcFiles, options.basePath);

        grunt.verbose.writeln('Base Path: ' + basePath.cyan);

        srcFiles.forEach(function(srcFile) {
          srcFile = path.normalize(srcFile);
          filename = path.basename(srcFile);
          relative = path.dirname(srcFile);

          if (options.flatten) {
            relative = '';
          } else if (basePath && basePath.length >= 1) {
            relative = grunt.util._(relative).strRight(basePath).trim(path.sep);
          }

          // make paths outside grunts working dir relative
          relative = relative.replace(/\.\.(\/|\\)/g, '');

          destFile = path.join(file.dest, relative, filename);

          replace(srcFile, destFile, options, locals);
        });

        grunt.verbose.or.ok();
      }
    });

  });

  var detectDestType = function (dest) {
    if (grunt.util._.endsWith(dest, path.sep)) {
      return 'directory';
    } else {
      return 'file';
    }
  };

  var replace = function (srcFile, destFile, options, locals) {
    grunt.file.copy(srcFile, destFile, {
      process: function (contents) {
        var updated = false;
        Object.keys(locals).forEach(function (local) {
          // TODO: create RegExp once ??
          var re = new RegExp(options.prefix + local, "g"), value = locals[local];
          updated = updated || contents.match(re);
          contents = contents.replace(re, value);
        });
        if (updated) {
          grunt.log.writeln('Replace ' + srcFile.cyan + ' to ' + destFile.cyan);
        } else if (options.force === false) {
          return false;
        }
        return contents;
      }
    });
  };

};
