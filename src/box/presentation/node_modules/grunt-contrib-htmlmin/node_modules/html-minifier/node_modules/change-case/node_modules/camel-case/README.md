# Camel Case

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![Gittip][gittip-image]][gittip-url]

Camel case a string.

## Installation

### Node

```sh
npm install camel-case --save
```

## Usage

```javascript
var camelCase = require('camel-case');

camelCase('string');         //=> "string"
camelCase('dot.case');       //=> "dotCase"
camelCase('PascalCase');     //=> "pascalCase"
camelCase('version 1.2.10'); //=> "version1_2_10"
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/camel-case.svg?style=flat
[npm-url]: https://npmjs.org/package/camel-case
[travis-image]: https://img.shields.io/travis/blakeembrey/camel-case.svg?style=flat
[travis-url]: https://travis-ci.org/blakeembrey/camel-case
[coveralls-image]: https://img.shields.io/coveralls/blakeembrey/camel-case.svg?style=flat
[coveralls-url]: https://coveralls.io/r/blakeembrey/camel-case?branch=master
[gittip-image]: https://img.shields.io/gittip/blakeembrey.svg?style=flat
[gittip-url]: https://www.gittip.com/blakeembrey
