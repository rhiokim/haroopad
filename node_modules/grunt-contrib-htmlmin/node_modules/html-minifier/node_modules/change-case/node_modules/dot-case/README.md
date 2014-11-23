# Dot Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Dot case a string.

## Installation

```bash
npm install dot-case --save
```

## Usage

```javascript
var dotCase = require('dot-case');

dotCase('string');        //=> "string"
dotCase('camelCase');     //=> "camel.case"
dotCase('sentence case'); //=> "sentence.case"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/dot-case.svg?style=flat
[npm-url]: https://npmjs.org/package/dot-case
[travis-image]: https://img.shields.io/travis/blakeembrey/dot-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/dot-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/dot-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/dot-case?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
