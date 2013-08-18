
var fs = require('fs');

var should = require('should');
var sinon = require('sinon');

var cons = require('consolidate');
var Comprise = require('../lib').Comprise;

describe('ejs', function() {

	it('should render complex.ejs correct', function(done) {
		var comprise = new Comprise({
			engine: 'ejs',
			layout: 'default',
			templateDir: __dirname + '/../examples/ejs',
			layoutDir: __dirname + '/../examples/ejs',
			partialDir: __dirname + '/../examples/ejs'
		});

		comprise.render('complex', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/ejs/complex.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render nolayout.ejs correct', function(done) {
		var comprise = new Comprise({
			engine: 'ejs',
			layout: 'default',
			templateDir: __dirname + '/../examples/ejs',
			layoutDir: __dirname + '/../examples/ejs',
			partialDir: __dirname + '/../examples/ejs'
		});

		comprise.render('nolayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/ejs/nolayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render simple.ejs correct', function(done) {
		var comprise = new Comprise({
			engine: 'ejs',
			templateDir: __dirname + '/../examples/ejs',
			partialDir: __dirname + '/../examples/ejs'
		});

		comprise.render('simple', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/ejs/simple.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it('should render uselayout.ejs correct', function(done) {
		var comprise = new Comprise({
			engine: 'ejs',
			templateDir: __dirname + '/../examples/ejs',
			layoutDir: __dirname + '/../examples/ejs',
			partialDir: __dirname + '/../examples/ejs'
		});

		comprise.render('uselayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/ejs/uselayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
});
