# grunt-contrib-coffee [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-coffee.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-coffee)

> Compile CoffeeScript files to JavaScript.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-coffee --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-coffee');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*


## Coffee task
_Run this task with the `grunt coffee` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### separator
Type: `String`
Default: linefeed

Concatenated files will be joined on this string.

#### bare
Type: `boolean`

Compile the JavaScript without the top-level function safety wrapper.
### Usage Examples

```js
coffee: {
  compile: {
    files: {
      'path/to/result.js': 'path/to/source.coffee', // 1:1 compile
      'path/to/another.js': ['path/to/sources/*.coffee', 'path/to/more/*.coffee'] // compile and concat into single file
    }
  },

  glob_to_multiple: {
    expand: true,
    cwd: 'path/to',
    src: ['*.coffee'],
    dest: 'path/to/dest/',
    ext: '.js'
  }
}
```

For more examples on how to use the `expand` API shown in the `glob_to_multiple` example, see "Building the files object dynamically" in the grunt wiki entry [Configuring Tasks](http://gruntjs.com/configuring-tasks).

## Release History

 * 2013-02-14   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-22   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions. Bump coffeescript dependency to 1.4.
 * 2013-01-08   v0.4.0rc5   Updating to work with grunt v0.4.0rc5. Switching to this.filesSrc api.
 * 2012-12-14   v0.4.0a   Conversion to grunt v0.4 conventions. Remove experimental destination wildcards.
 * 2012-10-11   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-24   v0.3.1   Don't fail when there are no files.
 * 2012-09-23   v0.3.0   Global options depreciated.
 * 2012-09-09   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [Eric Woroshow](http://ericw.ca/)

*This file was generated on Mon Feb 18 2013 08:35:48.*
