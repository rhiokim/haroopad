# Options

## compress
Type: `Boolean`
Default: true

Specifies if we should compress the compiled css. Compression is always disabled when `--debug` flag is passed to grunt.

## paths
Type: `String` `Array`

Specifies directories to scan for @import directives when parsing.

## define
Type: `Object`

Allows you to define global variables in Gruntfile that will be accessible in Stylus files.

## urlfunc
Type: `String`

Specifies function name that should be used for embedding images as Data URI.

#### [use](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#usefn)
Type: `Array`

Allows passing of stylus plugins to be used during compile.

#### [import](https://github.com/LearnBoost/stylus/blob/master/docs/js.md#importpath)
Type: `Array`

Import given stylus packages into every compiled `.styl` file, as if you wrote `@import '...'`
in every single one of said files.
