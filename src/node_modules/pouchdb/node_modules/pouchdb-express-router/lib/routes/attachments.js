'use strict';

var rawBody = require('raw-body');

var utils = require('../utils.js');

function parseRawBody(req, res, next) {
  if (req.params.id === '_design' || req.params.id === '_local') {
    return next();
  }
  rawBody(req, {
    length: req.headers['content-length']
  }, function (err, string) {
    if (err) {
      return next(err)
    }
    req.rawBody = string
    next()
  });
}

function putAttachment(db, name, req, res) {
  var attachment = req.params.attachment
  var rev = req.query.rev;
  var type = req.get('Content-Type') || 'application/octet-stream';
  var body = new Buffer(req.rawBody || '', 'binary');
  var opts = req.query;

  req.db.putAttachment(name, attachment, rev, body,
                       type, opts, function (err, response) {
    if (err) return utils.sendError(res, err);
    utils.sendJSON(res, 201, response);
  });
}

// Retrieve a document attachment
function getAttachment(name, req, res) {
  var attachment = req.params.attachment;
  var opts = req.query;

  req.db.get(name, opts, function (err, info) {
    if (err) return utils.sendError(res, err);

    if (!info._attachments || !info._attachments[attachment]) {
      return utils.sendJSON(res, 404, {
        error:'not_found',
        reason:'missing'
      });
    };

    var type = info._attachments[attachment].content_type;
    var md5 = info._attachments[attachment].digest.slice(4);

    req.db.getAttachment(name, attachment, function (err, response) {
      if (err) return utils.sendError(res, err);
      res.setHeader('Content-Type', type);
      res.status(200).send(response);
    });
  });
}

// Delete a document attachment
function deleteAttachment(name, req, res) {
  var name = req.params.id;
  var attachment = req.params.attachment;
  var rev = req.query.rev;
  var opts = req.query;

  req.db.removeAttachment(name, attachment, rev, function (err, response) {
    if (err) return utils.sendError(res, err);
    utils.sendJSON(res, 200, response);
  });
}


module.exports = function(app, PouchDB) {

  app.put('/:db/_design/:id/:attachment(*)', parseRawBody, function (req, res, next) {
    putAttachment(req.params.db, '_design/' + req.params.id, req, res);
  });

  app.put('/:db/:id/:attachment(*)', parseRawBody, function (req, res, next) {
    // Be careful not to catch normal design docs or local docs
    if (req.params.id === '_design' || req.params.id === '_local') {
      return next();
    }
    putAttachment(req.params.db, req.params.id, req, res);
  });

  app.get('/:db/_design/:id/:attachment(*)', function (req, res, next) {
    getAttachment('_design/' + req.params.id, req, res);
  });

  app.get('/:db/:id/:attachment(*)', function (req, res, next) {
    // Be careful not to catch normal design docs or local docs
    if (req.params.id === '_design' || req.params.id === '_local') {
      return next();
    }
    getAttachment(req.params.id, req, res);
  });

  app.delete('/:db/_design/:id/:attachment(*)', function (req, res, next) {
    deleteAttachment('_design/' + req.params.id, req, res);
  });

  app.delete('/:db/:id/:attachment(*)', function (req, res, next) {
    // Be careful not to catch normal design docs or local docs
    if (req.params.id === '_design' || req.params.id === '_local') {
      return next();
    }
    deleteAttachment(req.params.id, req, res);
  });
};

