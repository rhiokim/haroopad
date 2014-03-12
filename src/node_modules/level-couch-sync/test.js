
var follow = require('follow')

follow({
  db: "http://isaacs.couchone.com/registry",
  include_docs: true, since:625434,
  feed: 'continuous'
}, function (err, data) {
  console.log(err, data)
})
