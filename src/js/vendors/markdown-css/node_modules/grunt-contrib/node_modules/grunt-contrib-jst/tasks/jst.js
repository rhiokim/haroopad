/*
 * grunt-contrib-jst
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var _ = require('lodash');

  // filename conversion for templates
  var defaultProcessName = function(name) { return name; };

  grunt.registerMultiTask('jst', 'Compile underscore templates to JST file', function() {
    var lf = grunt.util.linefeed;
    var helpers = require('grunt-lib-contrib').init(grunt);
    var options = this.options({
      namespace: 'JST',
      templateSettings: {},
      processContent: function (src) { return src; },
      separator: lf + lf
    });

    // assign filename transformation functions
    var processName = options.processName || defaultProcessName;

    grunt.verbose.writeflags(options, 'Options');

    var nsInfo = helpers.getNamespaceDeclaration(options.namespace);

    this.files.forEach(function(f) {
      var output = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      .map(function(filepath) {
        var src = options.processContent(grunt.file.read(filepath));
        var compiled, filename;

        try {
          compiled = _.template(src, false, options.templateSettings).source;
        } catch (e) {
          grunt.log.error(e);
          grunt.fail.warn('JST failed to compile.');
        }

        if (options.prettify) {
          compiled = compiled.replace(new RegExp('\n', 'g'), '');
        }
        filename = processName(filepath);

        return nsInfo.namespace+'['+JSON.stringify(filename)+'] = '+compiled+';';
      });

      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        output.unshift(nsInfo.declaration);
        if (options.amdWrapper) {
          if (options.prettify) {
            output.forEach(function(line, index) {
              output[index] = "  " + line;
            });
          }
          output.unshift("define(function(){");
          output.push("  return " + nsInfo.namespace + ";" + lf + "});");
        }
        grunt.file.write(f.dest, output.join(grunt.util.normalizelf(options.separator)));
        grunt.log.writeln('File "' + f.dest + '" created.');
      }
    });

  });
};
