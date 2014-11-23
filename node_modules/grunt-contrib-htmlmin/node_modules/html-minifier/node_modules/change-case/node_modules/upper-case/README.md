# Upper Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Upper case a string. Also handles non-string entities, such as objects with a `toString` property, numbers and booleans. Empty values (`null` and `undefined`) will come out as an empty string.

## Installation

```sh
npm install upper-case --save
```

## Usage

```js
var upperCase = require('upper-case');

upperCase(null);     //=> ""
upperCase('string'); //=> "STRING"

upperCase({ toString: function () { return 'test'; } }); //=> "TEST"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/upper-case.svg?style=flat
[npm-url]: https://npmjs.org/package/upper-case
[travis-image]: https://img.shields.io/travis/blakeembrey/upper-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/upper-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/upper-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/upper-case?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
