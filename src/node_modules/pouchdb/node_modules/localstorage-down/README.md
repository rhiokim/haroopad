# localstorage-down

Localstorage implementation of leveldown for mobile and desktop browsers.

The idea is to be able to use the level stack on phone and desktops.

The scenarios envisaged are : 

1. Occasionally connected clients

2. Adhoc Networks where clients need to sync directly with each other.  

This project is intended for use with the [level eco-system](https://github.com/level/).

## Status 

[![browser support](https://ci.testling.com/no9/localstorage-down.png)](https://ci.testling.com/no9/localstorage-down)

## Install

```
npm install localstorage-down
```

## Browser support

Basically we support [any browser that has localStorage](http://caniuse.com/namevalue-storage), but since we also rely on an ES5 environment due to dependencies from abstract-leveldown, in practice you will need the following shims in order to work correctly on all browsers (e.g. IE 8/9):

* [typedarray](https://github.com/substack/typedarray) for binary storage
* [es5-shim](https://github.com/es-shims/es5-shim) for just about everything

## Example 

At the command prompt in your chosen directory : 

```
npm install localstorage-down
npm install levelup 
npm install browserify -g
npm install beefy -g
```

Create a file called index.js and enter the following:

```
var localstorage = require('localstorage-down');
var levelup = require('levelup');
var db = levelup('/does/not/matter', { db: localstorage });

db.put('name', 'Yuri Irsenovich Kim');
db.put('dob', '16 February 1941');
db.put('spouse', 'Kim Young-sook');
db.put('occupation', 'Clown');

db.readStream()
   .on('data', function (data) {
      if (typeof data.value !== 'undefined') {
         console.log(data.key, '=', data.value);
      }
   })
   .on('error', function (err) {
      console.log('Oh my!', err);
   })
   .on('close', function () {
      console.log('Stream closed');
   })
   .on('end', function () {
     console.log('Stream ended');
   });
```

Publish the site :

```
beefy index.js
```

See the output :

[http://localhost:9966](http://localhost:9966)

Listen to John Cage :

http://www.youtube.com/watch?v=ExUosomc8Uc 

## Tests

```
npm run test
```

Browse to [http://localhost:9966](http://localhost:9966). 
View console logs in the browser to see test output. 

##  Contributors

Anton Whalley https://github.com/no9

Adam Shih https://github.com/adamshih

Nolan Lawson https://github.com/nolanlawson
