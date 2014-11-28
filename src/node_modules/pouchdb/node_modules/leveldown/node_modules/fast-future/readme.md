# fast-future[![build status](https://secure.travis-ci.org/kesla/fast-future.png)](http://travis-ci.org/kesla/fast-future)

A really fast way to run a callback in the future

[![NPM](https://nodei.co/npm/fast-future.png?downloads&stars)](https://nodei.co/npm/fast-future/)

[![NPM](https://nodei.co/npm-dl/fast-future.png)](https://nodei.co/npm/fast-future/)

## Installation

```
npm install fast-future
```

## What? How does is work?

Since node.js v0.10.x the semantics of `process.nextTick` changed (see [docs](http://nodejs.org/docs/v0.10.12/api/process.html#process_process_nexttick_callback)). To get the old behaviour one can use setImmediate instead.

The good part about `process.nextTick` is that it's really really fast. The bad part is that event loop can be starved and if run for to long time it'll eventually die with a `RangeError: Maximum call stack size exceeded`.

What's good about `setImmediate` is that it won't starve the event loop. However, it's a bit slower than `process.nextTick`.

_fast-future_ uses the best from the both worlds - the callback will most of the times be called in a process.nextTick, but once in a while it'll get run in a `setImmediate` - so you'll get crazy performance, and the event loop won't get starved or crash or something sad like that.

For me running the benchmarks show the following result

```
# setImmediate
setImmediate: 2317ms
# fastFuture
fastFuture: 96ms
```

For node v0.8.x it'll fallback to using process.nextTick

## Example

```javascript
var fastFuture = require('./fast-future')()

fastFuture(function () {
  console.log('this is being run in the future')
})
```

## Kudos

Thanks @mafintosh for suggesting this!

## Licence
Copyright (c) 2014 David Björklund

This software is released under the MIT license:

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
