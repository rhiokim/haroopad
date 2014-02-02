# grunt-contrib-copy v0.4.1 [![Build Status](https://travis-ci.org/gruntjs/grunt-contrib-copy.png?branch=master)](https://travis-ci.org/gruntjs/grunt-contrib-copy)

> Copy files and folders.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-copy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-copy');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-copy/tree/grunt-0.3-stable).*



## Copy task
_Run this task with the `grunt copy` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### processContent
Type: `Function(content, srcpath)`

This option is passed to `grunt.file.copy` as an advanced way to control the file contents that are copied.

#### processContentExclude
Type: `String`

This option is passed to `grunt.file.copy` as an advanced way to control which file contents are processed.

### Usage Examples

```js
copy: {
  main: {
    files: [
      // includes files within path
      {expand: true, src: ['path/*'], dest: 'dest/', filter: 'isFile'},

      // includes files within path and its sub-directories
      {expand: true, src: ['path/**'], dest: 'dest/'},

      // makes all src relative to cwd
      {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},

      // flattens results to a single level
      {expand: true, flatten: true, src: ['path/**'], dest: 'dest/', filter: 'isFile'}
    ]
  }
}
```

This task supports all the file mapping format Grunt supports. Please read [Globbing patterns](http://gruntjs.com/configuring-tasks#globbing-patterns) and [Building the files object dynamically](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically) for additional details.

Here are some additional examples, given the following file tree:
```shell
$ tree -I node_modules
.
├── Gruntfile.js
└── src
    ├── a
    └── subdir
        └── b

2 directories, 3 files
```

**Copy a single file tree:**
```js
copy: {
  main: {
    src: 'src/*',
    dest: 'dest/',
  },
},
```

```shell
$ grunt copy
Running "copy:main" (copy) task
Created 1 directories, copied 1 files

Done, without errors.
$ tree -I node_modules
.
├── Gruntfile.js
├── dest
│   └── src
│       ├── a
│       └── subdir
└── src
    ├── a
    └── subdir
        └── b

5 directories, 4 files
```

**Flattening the filepath output:**

```js
copy: {
  main: {
    expand: true,
    cwd: 'src/',
    src: '**',
    dest: 'dest/',
    flatten: true,
    filter: 'isFile',
  },
},
```

```shell
$ grunt copy
Running "copy:main" (copy) task
Copied 2 files

Done, without errors.
$ tree -I node_modules
.
├── Gruntfile.js
├── dest
│   ├── a
│   └── b
└── src
    ├── a
    └── subdir
        └── b

3 directories, 5 files
```


## Release History

 * 2013-03-26   v0.4.1   Output summary by default ("Copied N files, created M folders"). Individual transaction output available via `--verbose`.
 * 2013-02-15   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-23   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-14   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Conversion to grunt v0.4 conventions. Replace basePath with cwd. Empty directory support.
 * 2012-10-18   v0.3.2   Pass copyOptions on single file copy.
 * 2012-10-12   v0.3.1   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-24   v0.3.0   General cleanup and consolidation. Global options depreciated.
 * 2012-09-18   v0.2.4   No valid source check.
 * 2012-09-17   v0.2.3   Path.sep fallback for node <= 0.7.9.
 * 2012-09-17   v0.2.2   Single file copy support. Test refactoring.
 * 2012-09-07   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Chris Talkington](http://christalkington.com/)

*This file was generated on Sun Oct 27 2013 22:22:39.*
