
<pre style="font-family:courier">
 _   _           _        _____          _ 
| \ | |         | |      |  __ \        | |
|  \| | ___   __| | ___  | |__) |_ _  __| |
| . ` |/ _ \ / _` |/ _ \ |  ___/ _` |/ _` |
| |\  | (_) | (_| |  __/ | |  | (_| | (_| |
|_| \_|\___/ \__,_|\___| |_|   \__,_|\__,_| New BSD License
</pre>

Node Pad is a simple function to pad strings in the left and right directions.

`pad(text, size, [char])`: Left padding
---------------------------------------

Node Pad does left padding when the first argument is a string and the second 
argument is a number.

```javascript
var pad = require('pad');
pad('pad', 6).should.eql('pad   ');
```

`pad(size, text, [char])`: Right padding
----------------------------------------

Node Pad does right padding when the first argument is a number and the second 
argument is a string.

```javascript
var pad = require('pad');
pad(5, 'pad', '--').should.eql('--pad');
```

Installing
----------

Via git (or downloaded tarball), copy or link the project from a discoverable Node directory:

```bash
git clone http://github.com/wdavidw/node-pad.git
```

Via [npm](http://github.com/isaacs/npm):

```bash
npm install pad
```

Testing
-------

Clone the repo, install the development dependencies and run the suite:

```bash
git clone http://github.com/wdavidw/node-pad.git .
npm install
make test
```
