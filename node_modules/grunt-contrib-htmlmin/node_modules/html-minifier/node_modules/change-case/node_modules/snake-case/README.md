# Snake Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Snake case a string.

## Installation

```bash
npm install snake-case --save
```

## Usage

```javascript
var snakeCase = require('snake-case');

snakeCase('string');        //=> "string"
snakeCase('camelCase');     //=> "camel_case"
snakeCase('sentence case'); //=> "sentence_case"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/snake-case.svg?style=flat
[npm-url]: https://npmjs.org/package/snake-case
[travis-image]: https://img.shields.io/travis/blakeembrey/snake-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/snake-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/snake-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/snake-case?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
