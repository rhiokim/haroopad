# localstorage-down

localstorage implementation of leveldown for mobile and desktop browsers.

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

## Example 

At the command prompt in your chosen directory : 

```
npm install localstorage-down
npm install levelup 
npm install beefy -g
npm install browserify -g
```

Create a file called index.js and enter the following:

```
var leveldown = require('localstorage-down')
  , levelup = require('levelup')
  , factory = function (location) { return new leveldown(location) }
  , db = levelup('/does/not/matter', { db: factory })

db.put('name', 'Yuri Irsenovich Kim')
db.put('dob', '16 February 1941')
db.put('spouse', 'Kim Young-sook')
db.put('occupation', 'Clown')

db.readStream()
   .on('data', function (data) {
      if(typeof data.value !== 'undefined') 
         console.log(data.key, '=', data.value)
   })
   .on('error', function (err) {
      console.log('Oh my!', err)
   })
   .on('close', function () {
      console.log('Stream closed')
   })
   .on('end', function () {
     console.log('Stream ended')
   })
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
	beefy tests/test
```

Browse to http://localhost:9966/ 
View console logs in the browser to see test output. 

##  Contributors

Anton Whalley https://github.com/no9

Adam Shih https://github.com/adamshih
