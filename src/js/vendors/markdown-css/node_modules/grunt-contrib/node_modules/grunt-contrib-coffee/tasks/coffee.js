/*
 * grunt-contrib-coffee
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Eric Woroshow, contributors
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  grunt.registerMultiTask('coffee', 'Compile CoffeeScript files into JavaScript', function() {
    var path = require('path');

    var options = this.options({
      bare: false,
      separator: grunt.util.linefeed
    });

    if (options.basePath || options.flatten) {
      grunt.fail.warn('Experimental destination wildcards are no longer supported. please refer to README.');
    }

    grunt.verbose.writeflags(options, 'Options');

    this.files.forEach(function(f) {
      var output = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        return compileCoffee(filepath, options);
      }).join(grunt.util.normalizelf(options.separator));

      if (output.length < 1) {
        grunt.log.warn('Destination not written because compiled files were empty.');
      } else {
        grunt.file.write(f.dest, output);
        grunt.log.writeln('File ' + f.dest + ' created.');
      }
    });
  });

  var compileCoffee = function(srcFile, options) {
    options = grunt.util._.extend({filename: srcFile}, options);

    var srcCode = grunt.file.read(srcFile);

    try {
      return require('coffee-script').compile(srcCode, options);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('CoffeeScript failed to compile.');
    }
  };
};
