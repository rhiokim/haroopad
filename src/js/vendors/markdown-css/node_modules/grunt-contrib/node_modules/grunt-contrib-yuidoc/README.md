# grunt-contrib-yuidoc [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-yuidoc.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-yuidoc)

> Compile YUIDoc Documentation.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-yuidoc --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-yuidoc');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-yuidoc/tree/grunt-0.3-stable).*



## Yuidoc task
_Run this task with the `grunt yuidoc` command._

[Visit the YUIDoc project home](http://yui.github.com/yuidoc/) for more information on YUIDocs and commenting syntax.
### Options

Settings mirror [YUIDoc config](http://yui.github.com/yuidoc/args/index.html).
### Usage Examples

```js
yuidoc: {
  pkg: grunt.file.readJSON('package.json'),
  compile: {
    name: '<%= pkg.name %>'
    description: '<%= pkg.description %>',
    version: '<%= pkg.version %>',
    url: '<%= pkg.homepage %>',
    options: {
      paths: 'path/to/source/code/',
      outdir: 'where/to/save/docs/'
    }
  }
}
```


## Release History

 * 2013-02-14   v0.4.0   First official release for Grunt 0.4.0.
 * 2013-01-22   v0.4.0rc7   Updating grunt/gruntplugin dependencies to rc7. Changing in-development grunt/gruntplugin dependency versions from tilde version ranges to specific versions.
 * 2013-01-08   v0.4.0rc5   Updating to work with grunt v0.4.0rc5.
 * 2012-10-11   v0.3.2   Rename grunt-contrib-lib dep to grunt-lib-contrib.
 * 2012-09-30   v0.3.1   Project options are parsed as templates.
 * 2012-09-22   v0.3.0   Options no longer accepted from global config key.
 * 2012-09-09   v0.2.0   Refactored from grunt-contrib into individual repo.

---

Task submitted by [George Pantazis](http://georgepantazis.com/)

*This file was generated on Mon Feb 18 2013 09:01:08.*
