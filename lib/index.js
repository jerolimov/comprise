
var cons = require('consolidate');
var path = require('path');

var Comprise = function(options) {
	this.defaultEngine = options.engine;
	this.defaultLayout = options.layout;

	this.templateDir = options.templateDir || '';
	this.layoutDir = options.layoutDir || options.templateDir + '/_layout';
	this.partialDir = options.partialDir || options.templateDir + '/_partials';

	this.layouts = [];
	this.partialIndex = 0;
	this.partials = {};
};

Comprise.prototype.engine = function(template) {
	var ext = path.extname(template);
	if (ext.length > 1) {
		return ext.substring(1);
	} else {
		return this.defaultEngine;
	}
};

Comprise.prototype.filename = function(template) {
	var ext = path.extname(template);
	if (ext.length > 1) {
		return this.templateDir + '/' + template;
	} else {
		return this.templateDir + '/' + template + '.' + this.defaultEngine;
	}
};

Comprise.prototype.render = function(template, options, callback) {
	if (this.defaultLayout) {
		this.layouts.push(this.defaultLayout);
	}

	this.renderImpl(template, options, function(err, response) {
		if (callback) {
			var _callback = callback;
			callback = null;

			if (err) {
				console.error('err', err);
			}
			try {
				_callback(err, response);
			} catch (e) {
				console.error('Error in callback', e);
			}
		}
	});
};

Comprise.prototype.renderImpl = function(template, options, callback) {
	var self = this;

	this.finish = function() {
		if (self.response) {
//			console.log('Pre replacement: ', self.response);

			for (var partialKey in self.partials) {
//				console.log('Search and replace partial', partialKey, self.partials[partialKey]);
				self.response = self.response.replace(partialKey, self.partials[partialKey]);
				delete self.partials[partialKey];
			}

			if (!Object.keys(self.partials).length) {
				callback(null, self.response);
			}

//			console.log('Post replacement', self.response);
		}
	};

	options.layout = function(layout) {
//		console.log('add layout', layout);
		self.layouts.push(layout);
		return ''; // Force no output
	};

	options.nolayout = function() {
		self.layouts = [];
	};

	options.content = function() {
		return self.content;
	};

	options.partial = function(partialTemplate, partialOptions) {
//		console.log('include partial', partialTemplate);

		var partialKey = '## ComprisePartial ' + self.partialIndex++ + ' ##';
		partialOptions = partialOptions || options;
		self.partials[partialKey] = null;

		cons[self.engine(partialTemplate)](self.filename(partialTemplate), partialOptions, function(err, response) {
			if (err) {
				callback(err);
				delete self.partials[partialKey];
			} else {
				self.partials[partialKey] = response;
				self.finish();
			}
		});

		return partialKey;
	};

	cons[this.engine(template)](this.filename(template), options, function(err, response) {
		if (err) {
			callback(err);
		} else if (self.layouts.length) {
			var layout = self.layouts.shift();
//			console.log('run next layout', layout);
			self.content = response;
			self.renderImpl(layout, options, callback);
		} else {
			self.response = response;
			self.finish();
		}
	});
};

exports.Comprise = Comprise;
