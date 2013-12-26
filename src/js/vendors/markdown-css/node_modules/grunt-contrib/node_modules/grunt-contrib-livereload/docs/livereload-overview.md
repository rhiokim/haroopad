grunt-contrib-livereload is composed of two tasks:

* `livereload-start`: sets up a local server that will serve the needed js file and the wesocket that will control your browser
* `livereload`: triggers the browser reload

Additionally a Connect middleware is available to inject a JS snippet into the page to that will connect the browser to the livereload server.

This task support multiple browsers, which means all the browsers listening on the livereload port will be reloaded at the same time.

Note that grunt-contrib-livereload is designed to use [grunt-regarde](https://github.com/yeoman/grunt-regarde) instead grunt-contrib-watch (mainly due to shortcomings in the `watch` task which doesn't give access to changed files because it spawns tasks in subprocesses.)


## The livereload-start task

This task starts a server ([tiny-lr](https://github.com/mklabs/tiny-lr)) in the background, which will:
* serve the `livereload.js`
* act as a websocket server: each browser that opens a websocket to this server will be refreshed

By default the server listens on port 35729, but this can be changed through the `port` options.


## The livereload task

This task needs to be called to trigger a reload. It must be passed the list of files that have changed (i.e. `livereload:foo.txt:bar.txt`)


## The middleware

A connect middleware (`livereloadSnippet`) is delivered as an helper (located in `grunt-contrib-livereload/lib/utils`). This middleware must be the first one inserted.

It will be inserted on the fly in your HTML and will connect back to the livereload server.

```html
<!-- livereload snippet -->
<script>document.write('<script src=\"http://'
+ (location.host || 'localhost').split(':')[0]
+ ':" + port + "/livereload.js?snipver=1\"><\\/script>')
</script>
```
