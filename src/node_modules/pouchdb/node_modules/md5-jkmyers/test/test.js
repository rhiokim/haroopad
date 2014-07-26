should = require('should');

describe('The MD5 function when loaded with "require"',function(){
	var md5;
	
	it('should be loadable',function(){
		(function(){
			md5 = require('../md5');			
		}).should.not.throw();
	})
	
	it('should be available as a function',function(){
		md5.should.be.type('function')
	})
	
	it('md5("testvalue") should return "e9de89b0a5e9ad6efd5e5ab543ec617c"',function(){
		md5("testvalue").should.equal ("e9de89b0a5e9ad6efd5e5ab543ec617c");
	})
});