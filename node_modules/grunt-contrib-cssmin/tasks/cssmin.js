/*
 * grunt-contrib-cssmin
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tim Branyen, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  var helper = require('grunt-lib-contrib').init(grunt);

  grunt.registerMultiTask('cssmin', 'Minify CSS files', function() {
    this.files.forEach(function(f) {
      var max = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      })
      .map(grunt.file.read)
      .join(grunt.util.normalizelf(grunt.util.linefeed));

      var min = minifyCSS(max);
      if (min.length < 1) {
        grunt.log.warn('Destination not written because minified CSS was empty.');
      } else {
        grunt.file.write(f.dest, min);
        grunt.log.writeln('File ' + f.dest + ' created.');
        helper.minMaxInfo(min, max);
      }
    });
  });

  var minifyCSS = function(source) {
    try {
      return require('clean-css').process(source);
    } catch (e) {
      grunt.log.error(e);
      grunt.fail.warn('css minification failed.');
    }
  };
};
