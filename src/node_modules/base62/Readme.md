# Base62.js
[![build status](https://secure.travis-ci.org/andrew/base62.js.svg)](http://travis-ci.org/andrew/base62.js)
[![npm version](https://badge.fury.io/js/base62.svg)](http://badge.fury.io/js/base62)
[![Dependency Status](https://david-dm.org/andrew/base62.js.svg?theme=shields.io)](https://david-dm.org/andrew/base62.js)
[![devDependency Status](https://david-dm.org/andrew/base62.js/dev-status.svg?theme=shields.io)](https://david-dm.org/andrew/base62.js#info=devDependencies)
[![Gitter chat](http://img.shields.io/badge/gitter-andrew/base62.js-brightgreen.svg)](https://gitter.im/andrew/base62.js)

A javascript Base62 encode/decoder for node.js

## Install

```bash
npm install base62
```

## Usage

```javascript
Base62 = require('base62')
Base62.encode(999)  // 'g7'
Base62.decode('g7') // 999
```

## Development

Source hosted at [GitHub](http://github.com/andrew/base62.js).
Report Issues/Feature requests on [GitHub Issues](http://github.com/andrew/base62.js).

### Note on Patches/Pull Requests

 * Fork the project.
 * Make your feature addition or bug fix.
 * Add tests for it. This is important so I don't break it in a future version unintentionally.
 * Send me a pull request. Bonus points for topic branches.

## Copyright

Copyright (c) 2014 Andrew Nesbitt. See [LICENSE](https://github.com/andrew/base62.js/blob/master/LICENSE) for details.
