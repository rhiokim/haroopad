# Path Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Path case a string.

## Installation

```bash
npm install path-case --save
```

## Usage

```javascript
var pathCase = require('path-case');

pathCase('string');        //=> "string"
pathCase('camelCase');     //=> "camel/case"
pathCase('sentence case'); //=> "sentence/case"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/path-case.svg?style=flat
[npm-url]: https://npmjs.org/package/path-case
[travis-image]: https://img.shields.io/travis/blakeembrey/path-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/path-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/path-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/path-case?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
