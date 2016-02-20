#!/usr/bin/env node
// Render doc/index.html from README.md using template doc/index.html.jst

var fs = require('fs')
var path = require('path')
var marked = require('marked')
var highlight = require('highlight.js')
var _ = require('lodash')

marked.setOptions({
  highlight: function(code) {
    return highlight.highlightAuto(code).value
  }
})

var readme = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf-8')
var template = fs.readFileSync(path.join(__dirname, '../doc/index.html.jst'), 'utf-8')

var html = _.template(template, { content: marked(readme) });

fs.writeFileSync(path.join(__dirname, '../doc/index.html'), html)
