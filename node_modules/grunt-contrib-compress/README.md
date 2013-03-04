# grunt-contrib-compress [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-compress.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-compress)

> Compress files and folders.


## Getting Started
If you haven't used [grunt][] before, be sure to check out the [Getting Started][] guide, as it explains how to create a [gruntfile][Getting Started] as well as install and use grunt plugins. Once you're familiar with that process, install this plugin with this command:

```shell
npm install grunt-contrib-compress --save-dev
```

[grunt]: http://gruntjs.com/
[Getting Started]: https://github.com/gruntjs/grunt/blob/devel/docs/getting_started.md


## Compress task
_Run this task with the `grunt compress` command._

_This task is a [multi task][] so any targets, files and options should be specified according to the [multi task][] documentation._
[multi task]: https://github.com/gruntjs/grunt/wiki/Configuring-tasks


_Version `0.4.x` of this plugin is compatible with Grunt `0.4.x`. Version `0.3.x` of this plugin is compatible with Grunt `0.3.x`._

Node Libraries Used:
[archiver](https://github.com/ctalkington/node-archiver) (for zip/tar)
[zlib](http://nodejs.org/api/zlib.html#zlib_options) (for gzip).

### Options

#### archive
Type: `String`

This is used to define where to output the archive. Each target can only have one output file.

#### mode
Type: `String`

This is used to define which mode to use, currently supports `gzip`, `tar`, `tgz` (tar gzip) and `zip`.

Automatically detected per dest:src pair, but can be overridden per target if desired.

#### level (zip only)
Type: `Integer`
Default: 1

Sets the level of archive compression.

*Currently, gzip compression related options are not supported due to deficiencies in node's zlib library.*

### Usage Examples

```js
compress: {
  main: {
    options: {
      archive: 'archive.zip'
    },
    files: [
      {src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, // includes files in path
      {src: ['path/**'], dest: 'internal_folder2/'}, // includes files in path and its subdirs
      {expand: true, cwd: 'path/', src: ['**'], dest: 'internal_folder3/'}, // makes all src relative to cwd
      {flatten: true, src: ['path/**'], dest: 'internal_folder4/', filter: 'isFile'} // flattens results to a single level
    ]
  }
}
```


## Release History

 * 2013-01-13   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Conversion to grunt v0.4 conventions. Replace basePath with cwd.
 * 2012-10-11   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-10-08   v0.3.1   Replace zipstream package with archiver.
 * 2012-09-23   v0.3.0   General cleanup. Options no longer accepted from global config key.
 * 2012-09-17   v0.2.2   Test refactoring. No valid source check. Automatic mode detection.
 * 2012-09-09   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Chris Talkington](http://christalkington.com/)

*This file was generated on Mon Jan 14 2013 23:11:30.*
