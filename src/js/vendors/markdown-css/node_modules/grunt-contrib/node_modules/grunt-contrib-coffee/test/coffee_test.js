var grunt = require('grunt');
var fs = require('fs');

function readFile(file) {
  'use strict';

  var contents = grunt.file.read(file);

  if (process.platform === 'win32') {
    contents = contents.replace(/\r\n/g, '\n');
  }

  return contents;
}

exports.coffee = {
  compile: function(test) {
    'use strict';

    test.expect(2);

    var actual = readFile('tmp/coffee.js');
    var expected = readFile('test/expected/coffee.js');
    test.equal(expected, actual, 'should compile coffeescript to javascript');

    actual = readFile('tmp/concat.js');
    expected = readFile('test/expected/concat.js');
    test.equal(expected, actual, 'should compile multiple coffeescript files to a single javascript file');

    test.done();
  }
};