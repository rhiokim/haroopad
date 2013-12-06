# Introduction

[![Build Status](https://secure.travis-ci.org/jamuhl/i18next-node.png)](http://travis-ci.org/jamuhl/i18next-node)

Project goal is to provide the same easy way to translate a website on serverside like in 
[i18next](https://github.com/jamuhl/i18next) on the clientside:

- Translation inside your server code or template
- loading resourcefiles
- update resourcefiles with missing strings
- interpolation, plurals, nesting or resources
- serve the same resources to the clientside

# installation

	npm install i18next

# usage

First require the module and init i18next:

	var i18next = require('i18next');
	i18next.init(); // for options see i18next-node gh-page

Register the express middleware, so we can check current language settings:

	// Configuration
	app.configure(function() {
	    app.use(express.bodyParser());
	    app.use(i18next.handle);
	    app.use(app.router);

	    [...]
	});

Register AppHelper so you can use the translate function in your template:

	i18next.registerAppHelper(app)

Now you can (depending on your template language) do something like this in you template:

	// sample in jade
	body
        span= t('app.name')

To serve the clientside script and needed routes for resources and missing keys:

	i18next.serveClientScript(app)
	    .serveDynamicResources(app)
	    .serveMissingKeyRoute(app);

now you can add the script to you page and use i18next on the client like on the server:

	script(src='i18next/i18next.js', type='text/javascript')

    $.i18n.init([options], function() { 
        $('#appname').text($.t('app.name'));
    });

for more information on clientside usage have a look at [i18next](http://jamuhl.github.com/i18next/)

# sample

- [i18next-node_Sample](https://github.com/jamuhl/i18next-node/tree/master/sample)

# License

Copyright (c) 2011 Jan Mühlemann

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