
var Assert = require('assert');
var readdir = require('../lib/readdir');

(function() {
   var readSync = readdir.readSync;
   Assert.deepEqual(readSync('example_dir', null, readdir.CASELESS_SORT), [
      'AAA/aaa.js',
      'AAA/aaa.txt',
      'abc.js',
      'abc.txt',
      'BBB/bbb.js',
      'BBB/bbb.txt',
      'CCC/ccc.js',
      'CCC/ccc.txt',
      'CCC/DDD/ddd.js',
      'CCC/DDD/ddd.txt' ], 'Not supplying a filter selects every file');
}());

(function() {
   var readSync = readdir.readSync;
   Assert.deepEqual(readSync('example_dir', ['**/**.js'], readdir.CASELESS_SORT), [
      'AAA/aaa.js',
      'BBB/bbb.js',
      'CCC/ccc.js',
      'CCC/DDD/ddd.js' ], 'double star slash requires sub-directory, js suffix requires file type');
}());

(function() {
   var readSync = require('../lib/readdir.js').readSync;
   Assert.deepEqual(readSync('example_dir', ['**.js'], readdir.CASELESS_SORT), [
      'AAA/aaa.js',
      'abc.js',
      'BBB/bbb.js',
      'CCC/ccc.js',
      'CCC/DDD/ddd.js' ], 'double star can have any number of sub-directories and a suffix requires file type');
}());

(function() {
   var readSync = require('../lib/readdir.js').readSync;
   Assert.deepEqual(readSync('example_dir', ['BBB/*'], readdir.CASELESS_SORT), [
      'BBB/bbb.js',
      'BBB/bbb.txt' ], 'path prefix requires that directory, trailing star allows any file type');
}());

(function() {
   var readSync = require('../lib/readdir.js').readSync;
   Assert.deepEqual(readSync(process.cwd() + '/example_dir/', ['CCC/*']), [
      'CCC/ccc.js',
      'CCC/ccc.txt'], 'Path prefix requires that directory, trailing single star ignores subsequent sub-directories');
}());

(function() {
   var readSync = require('../lib/readdir.js').readSync;
   var everyFile = readSync('../test/example_dir', ['CCC/**'], readdir.ABSOLUTE_PATHS + readdir.CASELESS_SORT),
       cwd = process.cwd();

   Assert.deepEqual(everyFile, [
      cwd + '/example_dir/CCC/ccc.js',
      cwd + '/example_dir/CCC/ccc.txt',
      cwd + '/example_dir/CCC/DDD/ddd.js',
      cwd + '/example_dir/CCC/DDD/ddd.txt'], 'Double star will include sub-directories');
}());

(function() {
   var readSync = require('../lib/readdir.js').readSync;
   Assert.deepEqual(readSync('./example_dir', ['*.txt'], readdir.CASELESS_SORT), [
      'abc.txt'], 'Single star ignores sub-directories and filename is a suffix');
}());

(function() {
   var readSync = require('../lib/readdir.js').readSync,
       everyFile;

   everyFile = readSync('./case_sensitive_dir', null, readdir.CASELESS_SORT);
   Assert.deepEqual(everyFile, ['aBC.xml', 'Abc.xsl']);

   everyFile = readSync('./case_sensitive_dir', null, readdir.CASE_SORT);
   Assert.deepEqual(everyFile, ['Abc.xsl', 'aBC.xml']);
}());

(function() {
   var readSync = require('../lib/readdir.js').readSync;
   Assert.deepEqual(readSync('./example_dir', null, readdir.INCLUDE_DIRECTORIES + readdir.CASELESS_SORT), [
      'AAA/',
      'AAA/aaa.js',
      'AAA/aaa.txt',
      'abc.js',
      'abc.txt',
      'BBB/',
      'BBB/bbb.js',
      'BBB/bbb.txt',
      'CCC/',
      'CCC/ccc.js',
      'CCC/ccc.txt',
      'CCC/DDD/',
      'CCC/DDD/ddd.js',
      'CCC/DDD/ddd.txt'], 'Not supplying a filter selects every file, directories are listed after their contents');
}());

(function() {
   var readSync = require('../lib/readdir.js').readSync;
   Assert.deepEqual(readSync('./example_dir', null, readdir.INCLUDE_DIRECTORIES + readdir.CASELESS_SORT + readdir.NON_RECURSIVE), [
      'AAA/',
      'abc.js',
      'abc.txt',
      'BBB/',
      'CCC/'], 'Not supplying a filter selects every file, directories are listed after their contents');
}());

(function() {
   var readdir = require('../lib/readdir.js'),
       read = readdir.read;

   read('./example_dir', readdir.INCLUDE_DIRECTORIES + readdir.CASELESS_SORT, function (error, everyFile) {
      process.nextTick(function () {
         Assert.equal(error, null, 'Should not have thrown an error while scanning directory');
         Assert.deepEqual(everyFile, [
            'AAA/',
            'AAA/aaa.js',
            'AAA/aaa.txt',
            'abc.js',
            'abc.txt',
            'BBB/',
            'BBB/bbb.js',
            'BBB/bbb.txt',
            'CCC/',
            'CCC/ccc.js',
            'CCC/ccc.txt',
            'CCC/DDD/',
            'CCC/DDD/ddd.js',
            'CCC/DDD/ddd.txt' ], 'Not supplying a filter selects every file, directories are listed after their contents');
      });
   });

}());

(function() {
   var readdir = require('../lib/readdir.js'),
       read = readdir.read;

   read('./example_dir', readdir.CASELESS_SORT + readdir.NON_RECURSIVE, function (error, everyFile) {
      process.nextTick(function () {
         Assert.equal(error, null, 'Should not have thrown an error while scanning directory');
         Assert.deepEqual(everyFile, [
            'abc.js',
            'abc.txt' ], 'Only current directory should be scanned, only files returned');
      });
   });

}());

(function() {
   var readdir = require('../lib/readdir.js'),
       read = readdir.read;

   read('./example_dir', readdir.CASELESS_SORT + readdir.INCLUDE_DIRECTORIES + readdir.NON_RECURSIVE, function (error, everyFile) {
      process.nextTick(function () {
         Assert.equal(error, null, 'Should not have thrown an error while scanning directory');
         Assert.deepEqual(everyFile, [
            'AAA/',
            'abc.js',
            'abc.txt',
            'BBB/',
            'CCC/' ], 'Only current directory should be scanned, both files and directory names returned');
      });
   });

}());

(function() {
   var readdir = require('../lib/readdir.js'),
       read = readdir.read;

   read('./example_dir', ['*/'], readdir.CASELESS_SORT + readdir.INCLUDE_DIRECTORIES + readdir.NON_RECURSIVE, function (error, everyFile) {
      process.nextTick(function () {
         Assert.equal(error, null, 'Should not have thrown an error while scanning directory');
         Assert.deepEqual(everyFile, [
            'AAA/',
            'BBB/',
            'CCC/' ], 'Current directories scanned and returned when all four arguments supplied');
      });
   });

}());

(function() {
   var readdir = require('../lib/readdir.js'),
       read = readdir.read;

   read('./example_dir/missing', readdir.IGNORE_ERRORS, function (error, everyFile) {
      process.nextTick(function () {
         Assert.equal(error, null, 'Should not have thrown an error while scanning non-existent directory');
         Assert.deepEqual(everyFile, [], 'No files given that the directory does not exist');
      });
   });

}());

(function() {
   var readdir = require('../lib/readdir.js'),
       read = readdir.readSync;

   Assert.deepEqual(
       read('./example_dir/missing', null, readdir.IGNORE_ERRORS), [],
       'No files given that the directory does not exist');

}());
