# lie
<a href="http://promises-aplus.github.com/promises-spec">
  <img src="http://promises-aplus.github.com/promises-spec/assets/logo-small.png"
       alt="Promises/A+ logo" title="Promises/A+ 1.1 compliant" align="right" />
</a> [![Build Status](https://travis-ci.org/calvinmetcalf/lie.svg)](https://travis-ci.org/calvinmetcalf/lie)

lie a small, performant, promise library implementing the [Promises/A+ spec Version 1.1](http://promises-aplus.github.com/promises-spec/).

A originally a fork of [Ruben Verborgh's](https://github.com/RubenVerborgh) library called [promiscuous](https://github.com/RubenVerborgh/promiscuous), version 2.6 and above are forked from [ayepromise](https://github.com/cburgmer/ayepromise) by [Chris Burgmer](https://github.com/cburgmer).


## API

by default adds a function called 'Promise' to the global scope (or if you grab the noConflict version than one called Lie)

### return a promise
```javascript
new Promise(function(resolve, reject){
    doSomething(function(err, result) {
        if (err) {
            reject(err);
        } else {
            resolve(result);
        }
    });
}).then(function (value) {
    //on success
}, function (reason) {
    //on error
}).catch(function (reason) {
    //short cut for error handling
});

Promise.all([
    //array of promises or values
]).then(function ([/* array of results */]));

```

##node

install with `npm install lie`, exactly the same as above but 

```javascript
var promise = require('lie');
```

