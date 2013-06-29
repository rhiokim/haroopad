readdir.js
===========

A Node.js utility module to read the contents of a directory with support for Ant style filtering to easily order the results - particularly useful for any order specific build system.


Node.js
=======

Install using npm `npm install readdir` then use with require:

    var directoryContents = require('readdir').readSync('some_path/');


Usage
=====

The `readSync( path, [filters, [options]])` method can accept a path that is either absolute or relative to the current working directory.

Filters can be supplied as an array of strings that are Ant style expressions that any file found in the `path` directory must satisfy, use a `*` to signify any file in the current directory or `**` to signify any file in the current or any sub directory. If the filter contains a `/` then the file path must also include a path, so `*/*` would mean any file of a directory that is a direct sub-directory of the path directory and `*/**` would be any file that is in any subdirectory of the path directory.

To select just one type of file, add a file extension suffix to the filter (eg: `**.js` to pick any JavaScript file in the path directory).

If the options argument is supplied, it should be a number representing the sum of any options you want to apply:

`ABSOLUTE_PATHS` changes the return value so that each item in the array is an absolute path instead of relative to the path directory.

`CASE_SORT` sort the return array as a case sensitive sort

`CASELESS_SORT` sort the return array as a case insensitive sort

Examples
========

With filters:

    var readDir = require('readdir');
    
    // an array of all JavaScript files in some_path/
    readDir.readSync( 'some_path/', ['**.js'] );

With ordering of results using filters:

    var readDir = require('readdir');
    
    // an array of all JavaScript files in some_path/ with base.js first, then all core then anything else
    readDir.readSync( 'some_path/', ['base.js', 'core/**.js', '**.js'] );

With options

    var readDir = require('readdir');
    
    // an array of all files in some_path/ as absolute file paths
    readDir.readSync( 'some_path/', null, readDir.ABSOLUTE_PATHS );

    // an array of all files in some_path/ as absolute file paths sorted without case
    readDir.readSync( 'some_path/', null, readDir.ABSOLUTE_PATHS + readDir.CASELESS_SORT );





