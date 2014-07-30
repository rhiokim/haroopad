Map Reduce
=====

Map/reduce plugin pulled out of PouchDB.  A PouchDB plugin that, like [PouchDB Collate](https://github.com/pouchdb/collate), is bundled directly with PouchDB.

Building
----

    npm run build

Testing
----

### In Node

Run tests with `npm test` and coverage of tests with `npm test --coverage` install dependencies with `npm install`

If you have mocha installed globally you can run single test with:
```
TEST_DB=local mocha --reporter spec --grep search_phrase
```
In TEST_DB environment variable specify database that PouchDB should use (see package.json)

### In the browser

Run `npm run dev` and then point your favorite browser to [http://127.0.0.1:8001/test/index.html](http://127.0.0.1:8001/test/index.html).