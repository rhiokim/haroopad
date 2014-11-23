# Lower Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Lower case a string. Also handles non-string entities, such as objects with a `toString` property, numbers and booleans. Empty values (`null` and `undefined`) will come out as an empty string.

## Installation

```sh
npm install lower-case --save
```

## Usage

```js
var lowerCase = require('lower-case');

lowerCase(null);     //=> ""
lowerCase('STRING'); //=> "string"

upperCase({ toString: function () { return 'TEST'; } }); //=> "test"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/lower-case.svg?style=flat
[npm-url]: https://npmjs.org/package/lower-case
[travis-image]: https://img.shields.io/travis/blakeembrey/lower-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/lower-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/lower-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/lower-case?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
