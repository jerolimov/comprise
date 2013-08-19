/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Christoph Jerolimov
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

var cons = require('consolidate');
var path = require('path');

var Comprise = function(options) {
	this.defaultEngine = options.engine;
	this.defaultExtension = options.extension || options.engine;
	this.defaultLayout = options.layout;

	this.templateDir = options.templateDir || '';
	this.layoutDir = options.layoutDir || options.templateDir + '/_layout';
	this.partialDir = options.partialDir || options.templateDir + '/_partials';

	this.layouts = [];
	this.partialIndex = 0;
	this.partials = {};

	// This is a workaround for rendering engine which make problems with
	// parallel rendernig of the main layout and the partial.
	this.renderSequential = options.engine == 'swig';
};

Comprise.prototype.engine = function(template) {
	var ext = path.extname(template);
	if (ext.length > 1) {
		if (ext.substring(1) == this.defaultExtension) {
			return this.defaultEngine;
		} else {
			return ext.substring(1);
		}
	} else {
		return this.defaultEngine;
	}
};

Comprise.prototype.templateFile = function(template) {
	var ext = path.extname(template);
	if (ext.length > 1) {
		return path.resolve(this.templateDir, template);
	} else {
		return path.resolve(this.templateDir, template + '.' + this.defaultExtension);
	}
};

Comprise.prototype.layoutFile = function(template) {
	var ext = path.extname(template);
	if (ext.length > 1) {
		return path.resolve(this.layoutDir, template);
	} else {
		return path.resolve(this.layoutDir, template + '.' + this.defaultExtension);
	}
};

Comprise.prototype.partialFile = function(template) {
	var ext = path.extname(template);
	if (ext.length > 1) {
		return path.resolve(this.partialDir, template);
	} else {
		return path.resolve(this.partialDir, template + '.' + this.defaultExtension);
	}
};

Comprise.prototype.render = function(template, variables, callback) {
	if (this.defaultLayout) {
		this.layouts.push(this.defaultLayout);
	}

	this.renderImpl(this.templateFile(template), variables, function(err, response) {
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

Comprise.prototype.renderImpl = function(template, variables, callback) {
	var self = this;

	this.finish = function() {
		if (!self.response) {
			return;
		}

		if (self.renderSequential) {
			///
			/// Render one partial after another until there is no more to replace.
			///
			if (Object.keys(self.partials).length) {
				var partialKey = Object.keys(self.partials)[0];
				var partialTemplate = self.partials[partialKey];
				delete self.partials[partialKey];

				var engine = cons[this.engine(partialTemplate)];
				var filename = this.partialFile(partialTemplate);
				engine(filename, variables, function(err, response) {
//					console.log('finish rendering', partialTemplate, response);
					if (err) {
						callback(err);
					} else {
//						console.log('Search and replace partial', partialKey, self.partials[partialKey]);
						self.response = self.response.replace(partialKey, response);
						self.finish();
					}
				});

			} else {
				callback(null, self.response);
			}
		} else {
			///
			/// Replace the parallel rendered partials into the result:
			///
//			console.log('Pre replacement', self.response);

			for (var partialKey in self.partials) {
				if (self.partials[partialKey]) {
//					console.log('Search and replace partial', partialKey, self.partials[partialKey]);
					self.response = self.response.replace(partialKey, self.partials[partialKey]);
					delete self.partials[partialKey];
				}
			}

			if (!Object.keys(self.partials).length) {
				callback(null, self.response);
			}

//			console.log('Post replacement', self.response);
		}
	};

	variables.layout = function(layout) {
//		console.log('add layout', layout);
		self.layouts.push(layout);
		return ''; // Force no output
	};

	variables.nolayout = function() {
		self.layouts = [];
		return ''; // Force no output
	};

	variables.content = function() {
		return self.content;
	};

	variables.partial = function(partialTemplate, partialVariables) {
//		console.log('include partial', partialTemplate);

		var partialKey = '## ComprisePartial ' + self.partialIndex++ + ' ##';
		partialVariables = partialVariables || variables;

		if (self.renderSequential) {
			self.partials[partialKey] = partialTemplate;
		} else {
			self.partials[partialKey] = null;

			var engine = cons[self.engine(partialTemplate)];
			var filename = self.partialFile(partialTemplate);
			engine(filename, partialVariables, function(err, response) {
//				console.log('partial result for ' + partialKey + ':', err, response);
				if (err) {
					callback(err);
					delete self.partials[partialKey];
				} else {
					self.partials[partialKey] = response;
					self.finish();
				}
			});
		}

		return partialKey;
	};

	// TODO: Could we simplify this?
	if (this.engine(template) == 'handlebars') {
		var helpers = variables.helpers || {};
		helpers.layout = variables.layout;
		helpers.nolayout = variables.nolayout;
		helpers.content = variables.content;
		helpers.partial = variables.partial;
		variables.helpers = helpers;
	}

	var engine = cons[this.engine(template)];
	engine(template, variables, function(err, response) {
//		console.log('finish rendering', template, response);
		if (err) {
			callback(err);
		} else if (self.layouts.length) {
			var layout = self.layouts.shift();
//			console.log('run next layout', layout);
			self.content = response;
			self.renderImpl(self.layoutFile(layout), variables, callback);
		} else {
			self.response = response;
			self.finish();
		}
	});
};

exports.Comprise = Comprise;

/** Yeah, express 3.0 support */
exports.express = function(options) {
	return function(filename, variables, cb) {
		options.templateDir = variables.settings.views || options.templateDir;
		new Comprise(options).render(filename, variables, cb);
	};
};
