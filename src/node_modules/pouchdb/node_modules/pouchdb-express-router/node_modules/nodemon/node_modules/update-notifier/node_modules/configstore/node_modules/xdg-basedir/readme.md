# xdg-basedir [![Build Status](https://travis-ci.org/sindresorhus/xdg-basedir.svg?branch=master)](https://travis-ci.org/sindresorhus/xdg-basedir)

> Get [XDG Base Directory](http://standards.freedesktop.org/basedir-spec/basedir-spec-latest.html) paths


## Install

```sh
$ npm install --save xdg-basedir
```


## Usage

```js
var xdgBasedir = require('xdg-basedir');

xdgBasedir.data;
//=> /home/sindresorhus/.local/share

xdgBasedir.config;
//=> /home/sindresorhus/.config

xdgBasedir.dataDirs
//=> ['/home/sindresorhus/.local/share', '/usr/local/share/', '/usr/share/']
```


## API

### .data

Directory for user specific data files.

### .config

Directory for user specific configuration files.

### .cache

Directory for user specific non-essential data files.

### .runtime

Directory for user-specific non-essential runtime files and other file objects (such as sockets, named pipes, etc).

### .dataDirs

Preference-ordered array of base directories to search for data files in addition to `.data`.

### .configDirs

Preference-ordered array of base directories to search for configuration files in addition to `.config`.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
