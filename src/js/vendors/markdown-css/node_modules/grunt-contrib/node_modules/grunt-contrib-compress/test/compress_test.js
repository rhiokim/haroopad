var grunt = require('grunt');
var fs = require('fs');

var getSize = function(filename) {
  'use strict';

  try {
    return fs.statSync(filename).size;
  } catch (e) {
    return 0;
  }
};

exports.compress = {
  main: function(test) {
    'use strict';

    test.expect(4);

    // Zip
    var actual = getSize('tmp/compress_test_files.zip');
    var expected = getSize('test/expected/compress_test_files.zip');
    test.equal(expected, actual, 'should compress files into zip');

    // Tar
    actual = getSize('tmp/compress_test_files.tar');
    expected = getSize('test/expected/compress_test_files.tar');
    test.equal(expected, actual, 'should add files into tar');

    // Tar (gzip)
    actual = getSize('tmp/compress_test_files.tgz') >= 195;
    expected = true;
    test.equal(expected, actual, 'should add files into tar. compressing the tar with gzip.');

    // gzip
    actual = getSize('tmp/compress_test_file.js.gz');
    expected = getSize('test/expected/compress_test_file.js.gz');
    test.equal(expected, actual, 'should gzip file');

    test.done();
  }
};