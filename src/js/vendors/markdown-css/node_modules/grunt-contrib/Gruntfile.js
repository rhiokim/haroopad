/*
 * grunt-contrib
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-contrib/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerTask('build', function () {
    var _ = grunt.util._;
    var path = require('path');
    var deps = require('./package.json').dependencies;
    var authors = [];
    var plugins = Object.keys(deps).map(function(plugin) {
      var dir = path.dirname(require.resolve(plugin));
      authors.push(grunt.file.read(path.join(dir, 'AUTHORS')).split('\n'));
      return require(path.join(dir, 'package.json'));
    });
    authors = _.unique(
      _.compact(
        _.map(_.flatten(authors),function(author){return author.trim()})
      )
    ).sort().join("\n");
    grunt.file.write("AUTHORS","Tyler Kellen (http://goingslowly.com)\n"+authors);
    var tmpl = grunt.file.read('docs/overview.tmpl');
    var readme = grunt.template.process(tmpl, {data:{plugins:plugins}});
    grunt.file.write('docs/overview.md', readme);
  });

  grunt.loadNpmTasks('grunt-contrib-internal');
  grunt.registerTask('default', ['build', 'build-contrib']);

};