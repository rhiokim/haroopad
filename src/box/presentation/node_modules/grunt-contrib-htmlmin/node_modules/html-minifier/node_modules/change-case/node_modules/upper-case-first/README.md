# Upper Case First

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Upper case the first character of a string. Also handles non-string entities, such as objects with a `toString` property, numbers and booleans. Empty values (`null` and `undefined`) will come out as an empty string.

## Installation

```sh
npm install upper-case-first --save
```

## Usage

```js
var upperCaseFirst = require('upper-case-first');

upperCaseFirst(null);     //=> ""
upperCaseFirst('string'); //=> "String"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/upper-case-first.svg?style=flat
[npm-url]: https://npmjs.org/package/upper-case-first
[travis-image]: https://img.shields.io/travis/blakeembrey/upper-case-first.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/upper-case-first
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/upper-case-first.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/upper-case-first?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
