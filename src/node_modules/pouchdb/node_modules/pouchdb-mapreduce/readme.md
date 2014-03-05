Map Reduce
=====

Map reduce plugin pulled out of pouchdb

Run tests with `npm test` and coverage of tests with `npm test --coverage` install dependencies with `npm install`

If you have mocha installed globally you can run single test with:
```
TEST_DB=local mocha --reporter spec --grep search_phrase
```
In TEST_DB environment variable specify database that PouchDB should use (see package.json)
