# Options

## process
Type: `Function(content, srcpath)`

This option is passed to `grunt.file.copy` as an advanced way to control the file contents that are copied.

*`processContent` has been renamed to `process` and the option name will be removed in the future.*

## noProcess
Type: `String`

This option is passed to `grunt.file.copy` as an advanced way to control which file contents are processed.

*`processContentExclude` has been renamed to `noProcess` and the option name will be removed in the future.*

## encoding
Type: `String`
Default: `grunt.file.defaultEncoding`

The file encoding to copy files with.
