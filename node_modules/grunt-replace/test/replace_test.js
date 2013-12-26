var grunt = require('grunt');

exports['replace'] = {
  main: function(test) {

    'use strict';

    var expect, result, bool_result, re;

    test.expect(22);

    expect = 'value\n';
    result = grunt.file.read('tmp/simple.txt');
    test.equal(expect, result, 'should replace simple key with value');

    expect = 'value\n';
    result = grunt.file.read('tmp/prefix.txt');
    test.equal(expect, result, 'should replace simple key with value using custom prefix');

    expect = 'value\n';
    result = grunt.file.read('tmp/template_key.txt');
    test.equal(expect, result, 'should replace templated key with value');

    expect = grunt.template.today('yyyy') + "\n";
    result = grunt.file.read('tmp/template_value.txt');
    test.equal(expect, result, 'should replace simple key with templated value');

    expect = 'value\n';
    result = grunt.file.read('tmp/cwd/foo.txt');
    bool_result = expect === result;
    result = grunt.file.read('tmp/cwd/foo/bar.txt');
    bool_result = bool_result && expect === result;
    test.equal(true, bool_result, 'should replace simple key with value (in directory cwd mode)');

    expect = 'value\n';
    result = grunt.file.read('tmp/flatten/foo.txt');
    bool_result = expect === result;
    result = grunt.file.read('tmp/flatten/bar.txt');
    bool_result = bool_result && expect === result;
    test.equal(true, bool_result, 'should replace simple key with value (in directory flatten mode)');

    expect = '@@key\n';
    result = grunt.file.read('tmp/force.txt');
    test.equal(expect, result, 'should force copy of files (dont have any replace token)');

    expect = 'foobar\n';
    result = grunt.file.read('tmp/sort.txt');
    test.equal(expect, result, 'should sort the locals to prevent bad replaces');

    expect = 2;
    result = grunt.file.read('tmp/cache.html');
    re = new RegExp("\\?rel=" + grunt.template.today('yyyy'), "g");
    test.equal(expect, result.match(re).length, 'should expect two replaces in html cache file');

    expect = "$'\n";
    result = grunt.file.read('tmp/escape.txt');
    test.equal(expect, result, 'should escape the dollar sign ($)');

    expect = "detta är en sträng\n";
    result = grunt.file.read('tmp/special_chars.txt');
    test.equal(expect, result, 'should replace special characters');

    expect = 'foo\n\n';
    result = grunt.file.read('tmp/include.txt');
    test.equal(expect, result, 'should include the content file');

    expect = 'value\n';
    result = grunt.file.read('tmp/function.txt');
    test.equal(expect, result, 'should replace simple key with function return value');

    expect = 'value\n';
    result = grunt.file.read('tmp/new_way.txt');
    test.equal(expect, result, 'should replace simple key with value in the new way');

    expect = 'value\n';
    result = grunt.file.read('tmp/regexp.txt');
    test.equal(expect, result, 'should replace regexp key with value');

    expect = 'value\n';
    result = grunt.file.read('tmp/regexp_template.txt');
    test.equal(expect, result, 'should replace templated regexp key with value');

    expect = 'Smith, John\n';
    result = grunt.file.read('tmp/username.txt');
    test.equal(expect, result, 'should replace "John Smith" for "Smith, John"');

    expect = 'value\n';
    result = grunt.file.read('tmp/json.txt');
    test.equal(expect, result, 'should read from json and replace simple key with value');

    expect = 'value_1 value_2\n';
    result = grunt.file.read('tmp/json_external.txt');
    test.equal(expect, result, 'should read from external json file an make multiple replaces');

    expect = 'value_3 value_4\n';
    result = grunt.file.read('tmp/json_external_nested.txt');
    test.equal(expect, result, 'should read external json file and make multiple replaces in nested context');

    expect = 'value\n';
    result = grunt.file.read('tmp/json_external_template_key.txt');
    test.equal(expect, result, 'should read external json file and replace templated key with value');

    expect = grunt.template.today('yyyy') + "\n";
    result = grunt.file.read('tmp/json_external_template_value.txt');
    test.equal(expect, result, 'should read external json file and replace simple key with templated value');

    test.done();
  }
};
