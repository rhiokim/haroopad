# Usage Examples

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
