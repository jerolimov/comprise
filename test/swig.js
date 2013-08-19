
var fs = require('fs');

var should = require('should');
var sinon = require('sinon');

var cons = require('consolidate');
var Comprise = require('../lib').Comprise;

describe('swig', function() {

	it('should render complex.swig correct', function(done) {
		var comprise = new Comprise({
			engine: 'swig',
			layout: 'default',
			templateDir: __dirname + '/../examples/swig',
			layoutDir: __dirname + '/../examples/swig',
			partialDir: __dirname + '/../examples/swig'
		});

		comprise.render('complex', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/swig/complex.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render nolayout.swig correct', function(done) {
		var comprise = new Comprise({
			engine: 'swig',
			layout: 'default',
			templateDir: __dirname + '/../examples/swig',
			layoutDir: __dirname + '/../examples/swig',
			partialDir: __dirname + '/../examples/swig'
		});

		comprise.render('nolayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/swig/nolayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render simple.swig correct', function(done) {
		var comprise = new Comprise({
			engine: 'swig',
			templateDir: __dirname + '/../examples/swig',
			partialDir: __dirname + '/../examples/swig'
		});

		comprise.render('simple', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/swig/simple.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it('should render uselayout.swig correct', function(done) {
		var comprise = new Comprise({
			engine: 'swig',
			templateDir: __dirname + '/../examples/swig',
			layoutDir: __dirname + '/../examples/swig',
			partialDir: __dirname + '/../examples/swig'
		});

		comprise.render('uselayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/swig/uselayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
});
