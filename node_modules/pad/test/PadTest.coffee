
should = require 'should'
pad = if process.env.PAD_COV then require '../lib-cov/pad' else require '../lib/pad'

describe 'pad', ->
  it 'should pad right', (next) ->
    pad('abc', 6).should.eql 'abc   '
    next()
  it 'should pad left', (next) ->
    pad(6, 'abc').should.eql '   abc'
    next()
  it 'should pad right', (next) ->
    pad('yeah', 6, '-').should.eql 'yeah--'
    next()
  it 'should pad left', (next) ->
    pad(6, '234', '0').should.eql '000234'
    next()
