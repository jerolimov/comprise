
var fs = require('fs');

var should = require('should');
var sinon = require('sinon');

var cons = require('consolidate');
var Comprise = require('../lib').Comprise;

describe('jade', function() {

	it('should render complex.jade correct', function(done) {
		var comprise = new Comprise({
			engine: 'jade',
			layout: 'default',
			templateDir: __dirname + '/../examples/jade',
			layoutDir: __dirname + '/../examples/jade',
			partialDir: __dirname + '/../examples/jade'
		});

		comprise.render('complex', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/jade/complex.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render nolayout.jade correct', function(done) {
		var comprise = new Comprise({
			engine: 'jade',
			layout: 'default',
			templateDir: __dirname + '/../examples/jade',
			layoutDir: __dirname + '/../examples/jade',
			partialDir: __dirname + '/../examples/jade'
		});

		comprise.render('nolayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/jade/nolayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render simple.jade correct', function(done) {
		var comprise = new Comprise({
			engine: 'jade',
			templateDir: __dirname + '/../examples/jade',
			partialDir: __dirname + '/../examples/jade'
		});

		comprise.render('simple', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/jade/simple.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it('should render uselayout.jade correct', function(done) {
		var comprise = new Comprise({
			engine: 'jade',
			templateDir: __dirname + '/../examples/jade',
			layoutDir: __dirname + '/../examples/jade',
			partialDir: __dirname + '/../examples/jade'
		});

		comprise.render('uselayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/jade/uselayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
});
