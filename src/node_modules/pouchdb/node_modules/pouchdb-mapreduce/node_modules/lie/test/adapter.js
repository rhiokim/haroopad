var promise = require('../lib/lie');
var promisesAplusTests = require("promises-aplus-tests");
var adapter = {};
//based off rsvp's adapter
adapter.pending = function () {
  var pending = promise();
  pending.promise = pending;
  return pending;
};
module.exports = function(callback){
    promisesAplusTests(adapter, { reporter: "nyan" }, callback);
};