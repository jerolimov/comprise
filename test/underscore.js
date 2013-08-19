
var fs = require('fs');

var should = require('should');
var sinon = require('sinon');

var cons = require('consolidate');
var Comprise = require('../lib').Comprise;

describe('underscore', function() {

	it('should render complex.underscore correct', function(done) {
		var comprise = new Comprise({
			engine: 'underscore',
			layout: 'default',
			templateDir: __dirname + '/../examples/underscore',
			layoutDir: __dirname + '/../examples/underscore',
			partialDir: __dirname + '/../examples/underscore'
		});

		comprise.render('complex', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/underscore/complex.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render nolayout.underscore correct', function(done) {
		var comprise = new Comprise({
			engine: 'underscore',
			layout: 'default',
			templateDir: __dirname + '/../examples/underscore',
			layoutDir: __dirname + '/../examples/underscore',
			partialDir: __dirname + '/../examples/underscore'
		});

		comprise.render('nolayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/underscore/nolayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render simple.underscore correct', function(done) {
		var comprise = new Comprise({
			engine: 'underscore',
			templateDir: __dirname + '/../examples/underscore',
			partialDir: __dirname + '/../examples/underscore'
		});

		comprise.render('simple', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/underscore/simple.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it('should render uselayout.underscore correct', function(done) {
		var comprise = new Comprise({
			engine: 'underscore',
			templateDir: __dirname + '/../examples/underscore',
			layoutDir: __dirname + '/../examples/underscore',
			partialDir: __dirname + '/../examples/underscore'
		});

		comprise.render('uselayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/underscore/uselayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
});
