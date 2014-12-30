/* global describe, it */
var assert   = require('assert');
var swapCase = require('./');

describe('swap case', function () {
  it('should swap the case of strings', function () {
    assert.equal(swapCase(null), '');
    assert.equal(swapCase('test'), 'TEST');
    assert.equal(swapCase('TEST'), 'test');
    assert.equal(swapCase('PascalCase'), 'pASCALcASE');
    assert.equal(swapCase('Iñtërnâtiônàlizætiøn'), 'iÑTËRNÂTIÔNÀLIZÆTIØN');
  });
});
