const test       = require('tap').test
    , testCommon = require('abstract-leveldown/testCommon')
    , leveldown  = require('../')
    , fs         = require('fs')
    , path       = require('path')
    , testBuffer = fs.readFileSync(path.join(__dirname, 'data/testdata.bin'))
    , abstract   = require('abstract-leveldown/abstract/put-get-del-test')

if (require.main === module)
  abstract.all(leveldown, test, testCommon, testBuffer)
