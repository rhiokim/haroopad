PouchDB Collate
===

Collation functions for PouchDB map/reduce. Used by PouchDB map/reduce to maintain consistent [CouchDB collation ordering](https://wiki.apache.org/couchdb/View_collation).

The PouchDB Collate API is not exposed by PouchDB itself, but if you'd like to use it in your own projects, it's pretty small, and it has a few functions you may find useful.

Usage
-----

In Node:

```
$ npm install pouchdb-collate
```

```
var pouchCollate = require('pouchdb-collate');
```

In the browser you can install with Bower:

```
$ bower install pouchdb-collate
```

Or just download from the [releases page](https://github.com/pouchdb/collate/releases).

Then it will be available as `window.pouchCollate`.

API
----

### toIndexableString(obj)

This is probably the most useful function in PouchDB Collate. It converts any object to a serialized string that maintains proper CouchDB collation ordering in both PouchDB and CouchDB (ignoring some subtleties with ICU string ordering in CouchDB vs. ASCII string ordering in PouchDB).

So for example, if you want to sort your documents by many properties in an array, you can do e.g.:

```js
var pouchCollate = require('pouchdb-collate');
var myDoc = {
  firstName: 'Scrooge',
  lastName: 'McDuck',
  age: 67,
  male: true
};
// sort by age, then gender, then last name, then first name
myDoc._id = pouchCollate.toIndexableString(
  [myDoc.age, myDoc.male, mydoc.lastName, mydoc.firstName]);
```

The doc ID will be:

```js
'5323256.70000000000000017764\u000021\u00004McDuck\u00004Scrooge\u0000\u0000'
```

Which is of course totally not human-readable, but it'll sort everything correctly (floats, booleans, ints &ndash; you name it).  If you need a human-readable doc ID, check out the [DocURI](https://github.com/jo/docuri) project.

### collate(obj1, obj2)

Give it two objects, and it'll return a number comparing them.  For example:

```js
pouchCollate.collate('foo', 'bar'); // 1
pouchCollate.collate('bar', 'foo'); // -1
pouchCollate.collate('foo', 'foo'); // 0
```

Of course it sorts more than just strings - any valid JavaScript object is sortable.

### normalizeKey(obj)

You shouldn't need to use this, but this function will normalize the object and return what CouchDB would expect - e.g. `undefined` becomes `null`, and `Date`s become `date.toJSON()`.  It's basically what you would get if you called:

```js
JSON.parse(JSON.stringify(obj));
```

but a bit faster.