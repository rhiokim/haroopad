var grunt = require('grunt');

exports['replace'] = {
  main: function(test) {

    'use strict';

    var expect, result, bool_result;

    test.expect(7);

    expect = 'value\n';
    result = grunt.file.read('tmp/simple.txt');
    test.equal(expect, result, 'should replace simple key with value');

    expect = 'value\n';
    result = grunt.file.read('tmp/prefix.txt');
    test.equal(expect, result, 'should replace simple key with value using custom prefix');

    expect = 'value\n';
    result = grunt.file.read('tmp/dynamic_key.txt');
    test.equal(expect, result, 'should replace templated key with defined value');

    expect = grunt.template.today('yyyy') + "\n";
    result = grunt.file.read('tmp/dynamic_value.txt');
    test.equal(expect, result, 'should replace simple key with templated value');

    expect = 'value\n';
    result = grunt.file.read('tmp/base_simple/foo.txt');
    bool_result = expect === result;
    result = grunt.file.read('tmp/base_simple/foo/bar.txt');
    bool_result = bool_result && expect === result;
    test.equal(true, bool_result, 'should replace simple key with value (in directory mode)');

    expect = 'value\n';
    result = grunt.file.read('tmp/flatten/foo.txt');
    bool_result = expect === result;
    result = grunt.file.read('tmp/flatten/bar.txt');
    bool_result = bool_result && expect === result;
    test.equal(true, bool_result, 'should replace simple key with value (in directory flatten mode)');

    expect = '@@key\n';
    result = grunt.file.read('tmp/force.txt');
    test.equal(expect, result, 'should force copy of files (dont have any replace token)');

    test.done();
  }
};
