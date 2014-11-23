# Param Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Param case a string.

## Installation

```bash
npm install param-case --save
```

## Usage

```javascript
var paramCase = require('param-case');

paramCase('string');        //=> "string"
paramCase('camelCase');     //=> "camel-case"
paramCase('sentence case'); //=> "sentence-case"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/param-case.svg?style=flat
[npm-url]: https://npmjs.org/package/param-case
[travis-image]: https://img.shields.io/travis/blakeembrey/param-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/param-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/param-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/param-case?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
