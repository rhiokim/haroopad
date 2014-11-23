# Pascal Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Pascal case a string.

## Installation

```bash
npm install pascal-case --save
```

## Usage

```javascript
var pascalCase = require('pascal-case');

pascalCase('string');        //=> "String"
pascalCase('camelCase');     //=> "CamelCase"
pascalCase('sentence case'); //=> "SentenceCase"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/pascal-case.svg?style=flat
[npm-url]: https://npmjs.org/package/pascal-case
[travis-image]: https://img.shields.io/travis/blakeembrey/pascal-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/pascal-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/pascal-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/pascal-case?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
