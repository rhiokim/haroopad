Plate.js -- A Template Library
=================================

Plate is a Django Template Language implementation in Javascript. Super exciting!

Plate
----------
* Plays nicely with the event loop and async code. Plate makes it easy to parallelize your view code!
* Aims to be compatible with the latest version of the Django Template Language. If you've got a template in Django, it should render just fine in Plate.
* Thoroughly tested using the [Platoon](http://github.com/chrisdickinson/platoon) testing framework.
* Designed to work nicely in a Node.js environment
* Extensible -- It makes use of plugins to provide capabilities (e.g., template loading).

Can I use it in my browser?
---------------------------

Yes. Plate was designed to work well in the standard suite of browsers. Each minor point release will target
compatibility with IE7+, FF3+, Chrome, and Safari 4+.

How do I use it?
----------------

The most basic case:

    var plate = require('plate'),
        sys = require('sys');
    var template = new plate.Template('hello {{ world }}');

    template.render({world:'everyone'}, function(err, data) {
        sys.puts(data);
    });

    // outputs "hello everyone"

Plate follows the Node.js style of taking callbacks that receive an error object and a data object. If there's no
error, `err` will be null.

Documentation
-------------

Plate is documented on [it's github wiki](https://github.com/chrisdickinson/plate/wiki). There are "Getting Started"
guides for both in-browser as well as in-node environments.

Contributing
------------

Got a feature you'd like to add? I'd love to see it. The workflow is pretty standard Github fare:

* Fork this repository.
* Create a branch -- title it descriptively, please :)
* Work, work, work. 
* Push your changes and submit a pull request.

The minimum requirements for a pull request to be merged are:

* You've added (passing) tests for your new code.
* The existing tests still pass.
* You've added (or changed, as appropriate) documentation to the `docs/` folder in Markdown format.

Run the tests
-------------

In node:

````

$ npm install plate
$ npm test plate

````

### In browser:

* [Your current browser](http://chrisdickinson.github.com/plate/test.html)

### Using Browserling:

* **Internet Explorer**
  * [IE7](http://browserling.com/explorer/7.0/http%3A//chrisdickinson.github.com/plate/test.html)
  * [IE8](http://browserling.com/explorer/8.0/http%3A//chrisdickinson.github.com/plate/test.html)
  * [IE9](http://browserling.com/explorer/9.0/http%3A//chrisdickinson.github.com/plate/test.html)
* **Firefox**
  * [3.6](http://browserling.com/firefox/3.6/http%3A//chrisdickinson.github.com/plate/test.html)
  * [8.0](http://browserling.com/firefox/8.0/http%3A//chrisdickinson.github.com/plate/test.html)
  * [nightly](http://browserling.com/firefox/nightly/http%3A//chrisdickinson.github.com/plate/test.html)
* **Chrome**
  * [10](http://browserling.com/chrome/10.0/http%3A//chrisdickinson.github.com/plate/test.html)
  * [latest](http://browserling.com/chrome/canary/http%3A//chrisdickinson.github.com/plate/test.html)
* **Safari**
  * [4.0](http://browserling.com/safari/4.0/http%3A//chrisdickinson.github.com/plate/test.html)
  * [5.0](http://browserling.com/safari/5.1/http%3A//chrisdickinson.github.com/plate/test.html)
* **Opera**
  * [10.0](http://browserling.com/opera/10.0/http%3A//chrisdickinson.github.com/plate/test.html)
  * [11.0](http://browserling.com/opera/11.0/http%3A//chrisdickinson.github.com/plate/test.html)

### Locally, in browser:

````bash

$ git clone git@github.com:chrisdickinson/plate.git
$ cd plate
$ make browsertest
$ python -m SimpleHTTPServer &
$ open http://localhost:8000/test.html

````

License
-----------------
Licensed new BSD.
