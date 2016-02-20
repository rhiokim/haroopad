var test = require('tap').test
var BackbonePouch = require('../backbone-pouch.js')

test('api', function(t) {
  t.type(BackbonePouch.defaults, 'object', 'should have a defaults property')
  t.type(BackbonePouch.sync, 'function', 'should be a function')
  t.type(BackbonePouch.sync(), 'function', 'should return a function')

  t.end()
})

test('defaults', function(t) {
  t.type(BackbonePouch.sync().defaults, 'object', 'should have a defaults property')
  t.equal(BackbonePouch.sync().defaults.fetch, BackbonePouch.defaults.fetch, 'should have set default fetch method')
  t.equal(BackbonePouch.sync({ foo: 'bar' }).defaults.foo, 'bar', 'should have merged foo property')
  t.equal(BackbonePouch.sync({ fetch: 'query' }).defaults.fetch, 'query', 'should have overwritten fetch method')

  t.end()
})

test('deep nested falsy defaults', function(t) {
  BackbonePouch.defaults.options.query.include_docs = true

  t.equal(BackbonePouch.sync({ options: { query: { include_docs: false } } }).defaults.options.query.include_docs, false, 'should have overwritten falsy value')

  t.end()
})

test('attachments api', function(t) {
  t.type(BackbonePouch.attachments, 'function', 'should be a function')
  t.type(BackbonePouch.attachments(), 'object', 'should return an object')
  t.type(BackbonePouch.attachments().attachments, 'function', 'should be a function')
  t.type(BackbonePouch.attachments().attachment, 'function', 'should be a function')
  t.type(BackbonePouch.attachments().attach, 'function', 'should be a function')

  t.end()
})
