'use strict';

module.exports.sendError = function(res, err, baseStatus) {
  var status = err.status || baseStatus || 500;
  if (err.name && err.message) {
    err = {
      error: err.name,
      reason: err.message
    };
  }
  module.exports.sendJSON(res, status, err);
};

module.exports.sendJSON = function(res, status, body) {
  res.status(status);
  res.setHeader('Content-Type', 'application/json');
  res.send(new Buffer(JSON.stringify(body) + "\n", 'utf8'));
}
