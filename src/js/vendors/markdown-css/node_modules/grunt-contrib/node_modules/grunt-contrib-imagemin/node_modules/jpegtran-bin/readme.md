# node-jpegtran-bin [![Build Status](https://secure.travis-ci.org/yeoman/node-jpegtran-bin.png?branch=master)](http://travis-ci.org/yeoman/node-jpegtran-bin)

jpegtran 1.2.1 (part of [libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/)) Node.js wrapper that makes it seamlessly available as a local dependency on OS X, Linux and Windows. Most commonly used to losslessly minify JPEG images.

> libjpeg-turbo is a derivative of libjpeg that uses SIMD instructions (MMX, SSE2, NEON) to accelerate baseline JPEG compression and decompression on x86, x86-64, and ARM systems. On such systems, libjpeg-turbo is generally 2-4x as fast as the unmodified version of libjpeg, all else being equal.


## Example usage

```js
var execFile = require('child_process').execFile;
var jpegtranPath = require('jpegtran-bin').path;

execFile(jpegtranPath, ['-outfile', 'output.jpg', 'input.jpg'], function(err, stdout, stderr) {
	console.log('Image minified');
});
```

You can also run directly from `./node_modules/.bin/jpegtran-bin`


## Dev

Note to self on how to update the binaries.

### OS X

- [Download source](http://sourceforge.net/projects/libjpeg-turbo/files/)
- Extract and `cd` into that folder
- Run `./configure --disable-shared --host i686-apple-darwin CFLAGS='-O3 -m32' LDFLAGS=-m32 && make`

### Linux

- [Download source](http://sourceforge.net/projects/libjpeg-turbo/files/)
- Extract and `cd` into that folder
- Run `./configure --disable-shared --host i686-pc-linux-gnu CFLAGS='-O3 -m32' LDFLAGS=-m32 && make`

### Windows

- Download the [Windows files 32/64-bit](http://sourceforge.net/projects/libjpeg-turbo/files/) on a Windows machine
- Run the downloaded file to extract
- Go to the `bin` folder at the destination and copy jpegtran.exe


## License

Everything excluding the binaries licensed under the [BSD license](http://opensource.org/licenses/bsd-license.php) and copyright Google.

libjpeg-turbo licensed under the BSD license and copyright dcommander.
