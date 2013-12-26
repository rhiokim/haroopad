# grunt-contrib-jasmine [![Build Status](https://secure.travis-ci.org/gruntjs/grunt-contrib-jasmine.png?branch=master)](http://travis-ci.org/gruntjs/grunt-contrib-jasmine)

> Run jasmine specs headlessly through PhantomJS.



## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-contrib-jasmine --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-contrib-jasmine');
```




## Jasmine task
_Run this task with the `grunt jasmine` command._

Automatically builds and maintains your spec runner and runs your tests headlessly through phantomjs.

Substantial credit goes to [Camille Reynders](http://creynders.be/) (@creynders) for the first decent implementation
of jasmine through grunt which served as motivation for all the future work.

#### Run specs locally or on an ad hoc server

Run your tests on your local filesystem or via a server task like [grunt-contrib-connect][].

#### AMD Support

Supports AMD tests via the [grunt-template-jasmine-requirejs](https://github.com/jsoverson/grunt-template-jasmine-requirejs) module

#### Customize your SpecRunner with your own template

Supply your templates that will be used to automatically build the SpecRunner.

#### Example application usage

- [Pivotal Labs' sample application](https://github.com/jsoverson/grunt-contrib-jasmine-example)

[grunt-contrib-connect]: https://github.com/gruntjs/grunt-contrib-connect


### Options

#### src
Type: `String|Array`

*Minimatch* - This defines your source files. These are the files that you are testing.

#### options.specs
Type: `String|Array`

*Minimatch* - These are your Jasmine specs.

#### options.vendor
Type: `String|Array`

*Minimatch* - These are third party libraries, generally loaded before anything else happens in your tests. You'll likely add things
like jQuery and Backbone here.

#### options.helpers
Type: `String|Array`

*Minimatch* - These are non-source, non-spec helper files. In the default runner these are loaded after `vendor` files

#### options.outfile
Type: `String`
Default: `_SpecRunner.html`

This is the auto-generated specfile that phantomjs will use to run your tests.
This is automatically deleted upon normal runs

#### options.junit.path
Type: `String`
Default: undefined

Path to output JUnit xml

#### options.junit.consolidate
Type: `Boolean`
Default: `false`

Consolidate the JUnit XML so that there is one file per top level suite.

#### options.host
Type: `String`
Default: ''

This is the host you want phantomjs to connect against to run your tests.

e.g. if using an ad hoc server from within grunt

```js
host : 'http://127.0.0.1:8000/'
```

Or, using templates

```js
host : 'http://127.0.0.1:<%= connect.port %>/'
```

Not defining a host will mean your specs will be run from the local filesystem.

#### options.template
Type: `String` `Object`
Default: undefined

Specify a custom template used to generate your Spec Runner. Templates are parsed as underscore templates and provided
the expanded list of files needed to build a specrunner.

You can specify an object with a `process` method that will be called as a template function.
See the [Template API Documentation](https://github.com/gruntjs/grunt-contrib-jasmine/wiki/Jasmine-Templates) for more details.

#### options.templateOptions
Type: `Object`
Default: `{}`

These options will be passed to your template as an 'options' hash so that you can provide settings to your template.

### Flags

Name: `build`

Turn on this flag in order to rebuild the specrunner without deleting it. This is useful when troublshooting templates,
running in a browser, or as part of a watch chain e.g.

```js
watch: {
  pivotal : {
    files: ['src/**/*.js', 'specs/**/*.js'],
    tasks: 'jasmine:pivotal:build'
  }
}
```

#### Basic Use

Sample configuration to run Pivotal Labs' example Jasmine application.

```js
// Example configuration
grunt.initConfig({
  jasmine: {
    pivotal: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js'
      }
    }
  }
});
```

#### Supplying a custom template

Supplying a custom template to the above example

```js
// Example configuration
grunt.initConfig({
  jasmine: {
    customTemplate: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/*Spec.js',
        helpers: 'spec/*Helper.js'
        template: 'custom.tmpl'
      }
    }
  }
});
```

#### Sample RequireJS/NPM Template usage

```js
// Example configuration
grunt.initConfig({
  jasmine: {
    yourTask: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/*Spec.js',
        template: require('grunt-template-jasmine-requirejs')
      }
    }
  }
});
```

NPM Templates are just node modules, so you can write and treat them as such.

Please see the [grunt-template-jasmine-requirejs](https://github.com/jsoverson/grunt-template-jasmine-requirejs) documentation
for more information on the RequireJS template.


## Release History

 * 2013-02-23   v0.3.3   Added better console output (via Gabor Kiss @Neverl)
 * 2013-02-16   v0.3.2   Ensure Gruntfile.js is included on npm.
 * 2013-02-14   v0.3.1   First official release for Grunt 0.4.0.
 * 2013-01-21   v0.3.1rc7   Exposed phantom and sendMessage to templates
 * 2013-01-21   v0.3.0rc7   Updated dependencies for grunt v0.4.0rc6/rc7
 * 2013-01-07   v0.3.0rc5   Updating to work with grunt v0.4.0rc5. Switching to this.filesSrc api. Added JUnit xml output (via Kelvin Luck @vitch) Passing console.log from browser to verbose grunt logging Support for templates as separate node modules Removed internal requirejs template (see grunt-template-jasmine-requirejs)
 * 2012-12-02   v0.2.0   Generalized requirejs template config Added loader plugin Tests for templates Updated jasmine to 1.3.0
 * 2012-11-23   v0.1.2   Updated for new grunt/grunt-contrib apis
 * 2012-11-06   v0.1.1   Fixed race condition in requirejs template
 * 2012-11-06   v0.1.0   Ported grunt-jasmine-runner and grunt-jasmine-task to grunt-contrib

---

Task submitted by [Jarrod Overson](http://jarrodoverson.com)

*This file was generated on Sun Feb 24 2013 08:04:44.*
