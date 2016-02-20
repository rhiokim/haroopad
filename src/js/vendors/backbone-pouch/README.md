# backbone-pouch [![Build Status](https://secure.travis-ci.org/jo/backbone-pouch.png?branch=master)](http://travis-ci.org/jo/backbone-pouch)
[Backbone](http://backbonejs.org/) [PouchDB](http://pouchdb.com/) Sync Adapter


## Getting Started
You can use backbone-pouch on the server with node or in the browser:

### On the Server
Install the module with: `npm install backbone-pouch`

```javascript
var Backbone = require('backbone');
var BackbonePouch = require('backbone-pouch');
Backbone.sync = BackbonePouch.sync();
```

### In the Browser
1. Download [jQuery][jquery], [Underscore][underscore], [Backbone][backbone] and [PouchDB][pouchdb]
2. Download [backbone-pouch][backbone-pouch].
3. In your web page:

```html
<script src="jquery-2.0.0.min.js"></script>
<script src="underscore-min.js"></script>
<script src="backbone-min.js"></script>
<script src="pouchdb-nightly.min.js"></script>
<script src="backbone-pouch.js"></script>
<script>
  Backbone.sync = BackbonePouch.sync();
</script>
```

[jquery]: http://code.jquery.com/jquery-2.0.0.min.js
[underscore]: http://underscorejs.org/underscore-min.js
[backbone]: http://backbonejs.org/backbone-min.js
[pouchdb]: http://download.pouchdb.com/pouchdb-nightly.min.js
[backbone-pouch]: https://raw.githubusercontent.com/jo/backbone-pouch/master/backbone-pouch.js

## Setup backbone-pouch
You can configure Backbone to persist via backbone-pouch per model:

```javascript
var MyModel = Backbone.Model.extend({
  sync: BackbonePouch.sync(options)
});
```
    
Or you might want to set backbone-pouch sync globally:

```javascript
Backbone.sync = BackbonePouch.sync(defaults);

var MyModel = Backbone.Model.extend({
  pouch: options
});
```

### `BackbonePouch.attachments()`
You can mixin attachment support into a single model:

```javascript
var MyModel = Backbone.Model.extend(BackbonePouch.attachments());
```

Or you may want to mixin attachment support globally:

```javascript
_.extend(Backbone.Model.prototype, BackbonePouch.attachments());
```

Note that you have to call the attachments function - don't forget the braces.

You can also pass the PouchDB adapter to `BackbonePouch.attachments`:

```javascript
_.extend(Backbone.Model.prototype, BackbonePouch.attachments({
  db: new PouchDB('mydb')
}));
```

### `idAttribute`
You should adjust the `idAttribute`, because CouchDB (and therefore PouchDB)
uses `_id` instead of the default `id` attribute:

```javascript
Backbone.Model.prototype.idAttribute = '_id';
```


<p id=usage></p>
## Usage
```javascript
var MyModel = Backbone.Model.extend({
  idAttribute: '_id',
  sync: BackbonePouch.sync({
    db: new PouchDB('mydb')
  })
});
```

### Query documents of type `post`
Retrieve single documents with all conflicts.
Retrieve collections via Map Reduce, filtering all documents of type `post`, ordered by `position`.
Limit results to `10`.

```javascript
var Post = Backbone.Model.extend({
  idAttribute: '_id',
  sync: BackbonePouch.sync({
    db: new PouchDB('mydb')
  })
});
var Posts = Backbone.Collection.extend({
  model: Post,
  sync: BackbonePouch.sync({
    db: new PouchDB('mydb'),
    fetch: 'query',
    options: {
      query: {
        include_docs: true,
        fun: {
          map: function(doc, emit) {
            if (doc.type === 'post') {
              emit(doc.position, null)
            }
          }
        },
        limit: 10
      },
      changes: {
        include_docs: true,
        filter: function(doc) {
          return doc._deleted || doc.type === 'post';
        }
      }
    }
  }),
  parse: function(result) {
    return _.pluck(result.rows, 'doc');
  }
});
```

### Global Backbone Sync Configuration
Use `mydb` as default for all databases.
Setup Map Reduce as default query method.
Limit resultset to `10`.
Authors are returnd by `name`, Posts by `date`.

```javascript
Backbone.sync =  BackbonePouch.sync({
  db: new PouchDB('mydb'),
  fetch: 'query',
  options: {
    query: {
      include_docs: true,
      limit: 10
    }
  }
});
Backbone.Model.prototype.idAttribute = '_id';
```

Then you can define your models and collections as usual
and overwrite backbone-pouchdb settings via the `pouch` property:

```javascript
var Author = Backbone.Model.extend();
var Authors = Backbone.Collection.extend({
  model: Author,
  pouch: {
    options: {
      query: {
        include_docs: true,
        fun: {
          map: function(doc, emit) {
            if (doc.type === 'author') {
              emit(doc.name, null)
            }
          }
        }
      },
      changes: {
        include_docs: true,
        filter: function(doc) {
          return doc._deleted || doc.type === 'author';
        }
      }
    }
  },
  parse: function(result) {
    return _.pluck(result.rows, 'doc');
  }
});
var Post = Backbone.Model.extend();
var Posts = Backbone.Collection.extend({
  model: Post,
  pouch: {
    options: {
      query: {
        include_docs: true,
        fun: {
          map: function(doc, emit) {
            if (doc.type === 'post') {
              emit(doc.date, null)
            }
          }
        }
      },
      changes: {
        include_docs: true,
        filter: function(doc) {
          return doc._deleted || doc.type === 'post';
        }
      }
    }
  },
  parse: function(result) {
    return _.pluck(result.rows, 'doc');
  }
});
```

### Attachments
```javascript
Backbone.sync =  BackbonePouch.sync({
  db: new PouchDB('mydb')
});
Backbone.Model.prototype.idAttribute = '_id';
var MyModel = Backbone.Model.extend(BackbonePouch.attachments());
var model = new MyModel();
model.attach(blob);     // store file
model.attachments();    // list files
model.attachment(name); // retrieve file
```

backbone-pouch helps you with binary attachments by providing convenient methods
for retrieving, storing and listing files.

#### `attach(blob, name, type, callback)`
Store an attachment.

`blob` must be a `Blob` in the browser or a `Buffer` in node.
You can omit `name` if the blob has a `filename` property.
You can omit `type` if the blob has a `type` property.

The callback is invoked with `err` and `result` callbacks.
After the file is stored, the models `_rev` property is updated.
If the model wasn't saved before, an `id` will be assigned and it will be created.

#### `attachments(filter)`
List attachment names.

The optional `filter` argument can be used to list only attachments of a certain type.

If the `filter` argument is a string or a RegExp,
it will be matched against the `content_type` of each attachment
and only the matching attachment names will be returned.

If `filter` is a function, it will be called with the attachments name and its stub.

#### `attachment(name, callback)`
Retrieve an attachment blob by name.

`callback` is called with `error` and `blob` arguments.

In the browser a `Blob` object is returned, a `Buffer` in node.

<p id=configuration></p>
## Configuration
You can configure every option passed to PouchDB.

### Option Inheritance
Options are merged (using Underscores [extend](http://underscorejs.org/#extend)) in the following order:

1. BackbonePouch defaults
2. BackbonePouch sync options
3. pouch object
4. save / get / destroy / fetch options

### backbone-pouch Options
These options control the behaviour of backbone-pouch.

#### `db`: PouchDB Adapter
Setup a database. This option is mendatory. Must be a PouchDB adapter:

```javascript
PouchDB('dbname')
```

See [Create a database](http://pouchdb.com/api.html#create_a_database).

#### `fetch`: Fetch Method
Specify the fetch method. Can be either `allDocs` (default), `query` or `spatial`.

Use the default `allDocs` if you want all documents.

Using `query` you can use Map-Reduce to query the database.

`spatial` requires the Spatial query plugin.

#### `listen`: Listen for Changes
When this is checked, backbone-pouchdb will listen for changes in the database
and update the model / collection on every change.
Default is true.

_Note that you will need to setup a `filter` function when used in combination with `query` fetch method._

#### `options`: PouchDB Options
Those options are passed directly to PouchDB.

The keys are PouchDB methods. Possible keys are `post`, `put`, `remove`, `get`, `query`, `allDocs` and `spatial`.

Refer to the [PouchDB API Documentation](http://pouchdb.com/api.html) for more options.

##### `post`: Create
Options for document creation. Currently no options supported.

See [Create a Document](http://pouchdb.com/api.html#create_a_document).

##### `put`: Update
Options for document update. Currently no options supported.

See [Update a Document](http://pouchdb.com/api.html#update_a_document).

##### `remove`: Delete
Options for document delete. Currently no options supported.

See [Delete a Document](http://pouchdb.com/api.html#delete_a_document).

##### `get`: Retrieve Model
Options for fetching a single document.

* `attachments`: Include attachment data.
* `conflicts`: If specified conflicting leaf revisions will be attached in _conflicts array.
* `open_revs`: Fetch all leaf revisions if open_revs='all'.
* `rev`: Fetch specific revision of a document. Defaults to winning revision.
* `revs_info`: Include a list of revisions of the document, and their availability.
* `revs`: Include revision history of the document.

See [Fetch a Document](http://pouchdb.com/api.html#fetch_a_document).

##### Fetch Collections
When fetching collections from views, one might want to parse the result, eg:

```javascript
parse: function(result) {
  return _.pluck(result.rows, 'doc');
}
```

###### `allDocs`: Retrieve Collection
Options for fetching all documents. This is a built in view which outputs all documents by id.

* `attachments`: Include attachment data.
* `conflicts`: If specified conflicting leaf revisions will be attached in _conflicts array.
* `descending`: Return result in descending order. Default is ascending order.
* `endkey`: Endkey of the query.
* `include_docs`: Whether to include the document in `doc` property.
* `key`: Key of the query.
* `keys`: Multiple keys.
* `limit`: Limit the resultset. Default is to return all documents.
* `startkey`: Startkey of the query.

See [Fetch Documents](http://pouchdb.com/api.html#fetch_documents).

###### `query`: Retrieve Collection via Map Reduce
Query options for Map Reduce queries.

* `attachments`: Include attachment data.
* `conflicts`: If specified conflicting leaf revisions will be attached in _conflicts array.
* `descending`: Return result in descending order. Default is ascending order.
* `endkey`: Endkey of the query.
* `fun`: Map Reduce Function: can be a string addressing a view in a design document or an object with a `map` and optional `reduce` property. A map function is _required_, if you use the query fetch method.
* `include_docs`: Whether to include the document in `doc` property.
* `key`: Key of the query.
* `keys`: Multiple keys.
* `limit`: Limit the resultset. Default is to return all documents.
* `reduce`: Whether to include the document in `doc` property. Default is to reduce if there is a reduce function.
* `startkey`: Startkey of the query.

See [Query the Database](http://pouchdb.com/api.html#query_the_database).

###### `spatial`: Retrieve Collection via Spatial Index
Options for Spatial query. The spatial query has not been tested.
You have to use a PouchDB build with included [Spatial](https://github.com/daleharvey/pouchdb/blob/master/src/plugins/pouchdb.spatial.js) plugin.

* `conflicts`: If specified conflicting leaf revisions will be attached in _conflicts array.
* `end_range`: End range of query
* `include_docs`: Whether to include the document on each change. Default is true.
* `start_range`: Start range of query

##### `changes`: Listen for changes
Options passed to changes feed.

* `filter`: Reference a filter function from a design document or define a function to selectively get updates.
* `descending`: Return result in descending order. Default is ascending order.
* `conflicts`: If specified conflicting leaf revisions will be attached in _conflicts array.
* `continuous`: Continuously listen to changes. Default is true.
* `include_docs`: Whether to include the document on each change. Default is true.

See [Listen to Database Changes](http://pouchdb.com/api.html#changes).

<p id=examples></p>
## Examples
Check out the [TODO Application](http://jo.github.io/backbone-pouch/examples/todos)
in the `doc/examples` folder.

It`s the standard [Backbone TODO example](http://backbonejs.org/examples/todos/index.html),
extended to use backbone-pouch.

### Advanced TODO Sync Example
[TODO Sync Application](http://jo.github.io/backbone-pouch/examples/todos-sync)
is also in the `doc/examples` folder.

You can setup external CouchDB (with [CORS](http://wiki.apache.org/couchdb/CORS) enabled)
to sync your local TODO database.


## Contributing
* Install dependencies via `npm install`
* Edit `backbone-pouch.js`
* Write [tap](https://github.com/isaacs/node-tap) tests
* Run the tests with `npm test`
* Generate the docs with `npm run docs`. This will render `README.md` using `doc/index.html.jst`

To update the Github page, change to the `gh-pages` branch and merge the `doc` subtree:

```bash
git pull -s subtree origin master
```

## Versioning
backbone-pouch follows [semver-ftw](http://semver-ftw.org/).
Dont think 1.0.0 means production ready yet.
There were some breaking changes, so had to move up the major version.


## Release History
* `1.5.0`: Remove Grunt in favour of purism and switch to tap
* `1.4.0`: Update Backbone and Underscore
* `1.3.0`: Do not parse view results, leave that up to the user
* `1.2.1`: Improve option inheritance
* `1.2.0`: Change defaults: do not listen and include_docs
* `1.1.1`: Adapt PouchDB attachment API change with seperate docId and attachment name
* `1.1`: Attachment support
* `1.0`: New chained api, Node support, tests. Support listen to changes feed. Use Grunt.
* `prior 1.0`: Experimental version with example TODO apps

## License
Copyright (c) 2013-2014 Johannes J. Schmidt, TF  
Licensed under the MIT license.
