var should = require('should');

//should.fail('failed');

should(true);

should.exist({});
should.not.exist(null);

true.should.be.true;
false.should.be.false;