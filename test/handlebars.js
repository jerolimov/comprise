
var fs = require('fs');

var should = require('should');
var sinon = require('sinon');

var cons = require('consolidate');
var Comprise = require('../lib').Comprise;

describe('handlebars', function() {

	it('should render complex.handlebars correct', function(done) {
		var comprise = new Comprise({
			engine: 'handlebars',
			extension: 'hbs',
			layout: 'default',
			templateDir: __dirname + '/../examples/handlebars',
			layoutDir: __dirname + '/../examples/handlebars',
			partialDir: __dirname + '/../examples/handlebars'
		});

		comprise.render('complex', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/handlebars/complex.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render nolayout.handlebars correct', function(done) {
		var comprise = new Comprise({
			engine: 'handlebars',
			extension: 'hbs',
			layout: 'default',
			templateDir: __dirname + '/../examples/handlebars',
			layoutDir: __dirname + '/../examples/handlebars',
			partialDir: __dirname + '/../examples/handlebars'
		});

		comprise.render('nolayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/handlebars/nolayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
	it('should render simple.handlebars correct', function(done) {
		var comprise = new Comprise({
			engine: 'handlebars',
			extension: 'hbs',
			templateDir: __dirname + '/../examples/handlebars',
			partialDir: __dirname + '/../examples/handlebars'
		});

		comprise.render('simple', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/handlebars/simple.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});

	it('should render uselayout.handlebars correct', function(done) {
		var comprise = new Comprise({
			engine: 'handlebars',
			extension: 'hbs',
			templateDir: __dirname + '/../examples/handlebars',
			layoutDir: __dirname + '/../examples/handlebars',
			partialDir: __dirname + '/../examples/handlebars'
		});

		comprise.render('uselayout', { user: 'me' }, function(err, result) {
			try {
				if (err) throw err;
				var expectedResult = fs.readFileSync(__dirname + '/../examples/handlebars/uselayout.html').toString();

				result.should.eql(expectedResult);
				done();
			} catch (e) {
				done(e);
			}
		});
	});
	
});
