# pouchdb-express-router

> An Express submodule with a CouchDB style REST interface to PouchDB.

## Introduction

**pouchdb-express-router** is an expressjs routing module that provides the
minimal API to allow PouchDB instance to replicate over HTTP, it is designed
to be mounted into expressjs web application to prove the an endpoint for
PouchDB applications to sync with.

The code is primarily forked from [https://github.com/pouchdb/express-pouchdb](https://github.com/pouchdb/express-pouchdb) to help users provide a minimal install.

## Example Usage

Here's a sample Express app, which we'll name `app.js`.

```javascript
var express = require('express');
var app = express();
var PouchDB = require('pouchdb');

app.use('/db', require('express-pouchdb')(PouchDB));

app.listen(3000);
```
