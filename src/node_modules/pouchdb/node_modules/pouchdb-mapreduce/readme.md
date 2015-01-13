Map Reduce
=====

Map/reduce plugin pulled out of PouchDB.  A PouchDB plugin that, like [PouchDB Collate](https://github.com/pouchdb/collate), is bundled directly with PouchDB.

Building
----

    npm install
    npm run build

Testing
----

### In Node

    npm test

To run coverage tests:

    npm run coverage

To run individual tests:

    GREP=my_search_term npm test

### In the browser

Run 

    npm run dev
    
and then point your favorite browser to [http://127.0.0.1:8001/test/index.html](http://127.0.0.1:8001/test/index.html).

To run individual tests, load e.g.:

    http://127.0.0.1:8001/test/index.html?grep=my_search_term
