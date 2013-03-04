# grunt-replace [![Build Status](https://secure.travis-ci.org/outaTiME/grunt-replace.png?branch=master)](http://travis-ci.org/outaTiME/grunt-replace)

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-replace`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-replace');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

### Overview

Inside your `grunt.js` file add a section named `replace`. This section specifies the files to replace.

#### Parameters

##### files ```object```

This defines what files this task will copy and should contain key:value pairs.

The key (destination) should be an unique path (supports [grunt.template](https://github.com/cowboy/grunt/blob/master/docs/api_template.md)) and the value (source) should be a filepath or an array of filepaths (supports [minimatch](https://github.com/isaacs/minimatch)).

As of v0.3.0, when copying to a directory you must add a trailing slash to the destination due to added support of single file copy.

##### options ```object```

This controls how this task operates and should contain key:value pairs, see options below.

#### Options

##### variables ```object```

This option is used to define patterns that will be used to replace the contents of source files.

```javascript
options: {
  variables: {
    'foo': 'bar'
  }
}
```

##### prefix ```string```

This option is used to create the real pattern for lookup in source files (Defaults `@@`).

##### basePath ```string```

This option adjusts the folder structure when copied to the destination directory. When not explicitly set, best effort is made to locate the basePath by comparing all source filepaths left to right for a common pattern.

##### flatten ```boolean```

This option performs a flat copy that dumps all the files into the root of the destination directory, overwriting files if they exist.

##### minimatch ```object```

These options will be forwarded on to expandFiles, as referenced in the [minimatch options section](https://github.com/isaacs/minimatch/#options)

##### force ```boolean```

This option force the copy of files even when those files don't have any replace token. Useful when copying a directory.

#### Config Example

```javascript
replace: {
  dist: {
    options: {
      variables: {
        'key': 'value'
      },
      prefix: '@@'
    },
    files: {
      'tmp/': ['test/fixtures/dist.txt']
    }
  }
}
```

#### Example usage

##### Variable pattern in source

Define the place where variable will be injected:

```
// build/manifest.appcache

CACHE MANIFEST
# @@timestamp

CACHE:

favicon.ico
index.html

NETWORK:
*
```

##### Gruntfile

Define timestamp variable and destination of the source files:

```javascript
replace: {
  dist: {
    options: {
      variables: {
        'timestamp': '<%= grunt.template.today() %>'
      }
    },
    files: {
      'public/': ['build/manifest.appcache']
    }
  }
}
```

#### Usage variations

##### Replace over source files (deploy in one target)

```javascript
replace: {
  dist: {
    options: {
      variables: {
        version: '<%= pkg.version %>',
        timestamp: '<%= grunt.template.today() %>'
      }
    },
    files: {
      'public/': [
        'build/manifest.appcache',
        'build/humans.txt'
      ]
    }
  }
}
```

##### Easy cache busting

In app/assets/index.html:

```html
<head>
  <link rel="stylesheet" href="/css/style.css?rel=@@timestamp">
  <script src="/js/app.js?rel=@@timestamp"></script>
</head>
```

In gruntfile:

```javascript
replace: {
  dist: {
    options: {
      variables: {
        'timestamp': '<%= new Date().getTime() %>'
      }
    },
    files: {
      'build/index.html': [
        'app/assets/index.html'
      ]
    }
  }
}
```

##### Include file contents inplace

In build/index.html:

```html
<body>
  @@include
</body>
```

In gruntfile:

```javascript
replace: {
  dist: {
    options: {
      variables: {
        'include': '<%= grunt.file.read("includes/content.html") %>'
      }
    },
    files: {
      'public/': [
        'build/index.html'
      ]
    }
  }
}
```

## Contribute

In lieu of a formal styleguide, take care to maintain the existing coding style.

## Release History

* 2012/09/25 - v0.3.0 - general cleanup and consolidation. test refactoring. global options depreciated. revert normalize linefeeds for now.
* 2012/09/25 - v0.3.1 - update to grunt-lib-contrib, add force flag.
* 2012/11/20 - v0.3.2 - add new examples.
