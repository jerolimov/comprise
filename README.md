# comprise [![Build Status](https://travis-ci.org/jerolimov/comprise.png?branch=master)](https://travis-ci.org/jerolimov/comprise)

> Add layout and partial support to [consolidate.js](https://github.com/visionmedia/consolidate.js)!

This project was insprired by all the small projects which wraps a single ```template engine``` to
integratate these into the [express](http://expressjs.com/). Many of them exists only because they
add the missing layout and partial support which is not provided by
[consolidate.js](https://github.com/visionmedia/consolidate.js).

In many cases this is also fine because the most template engines includes already a simple
```extend``` and ```include``` mechanism. If not, or if you are interessted in mixing your templates
give this project a try.

Comprise add layout and partial support to the great [consolidate.js](https://github.com/visionmedia/consolidate.js)
template engine. Means in general that all template engines which could call functions from the template
ifself profits from the following functions:

* Add layout and partial support to your templates.
* Supports layout hierarchies (post extends default extends layout).
* Allow setting a default template and override/disable this default in the template itself.
* Partials use the origin variable by default. Supports also a new scope.
* Support for mixing template engines (include ejb in jade or vise versa).

Tested with:

* [jade](https://github.com/visionmedia/jade) 
* [ejs](https://github.com/visionmedia/ejs)
* [handlebars](https://github.com/wycats/handlebars.js)
* [underscore](https://github.com/jashkenas/underscore)
* [swig](https://github.com/paularmstrong/swig)

Doesn't work yet with:

* [haml](https://github.com/visionmedia/haml.js) -- ```! layout('default')``` and ```!= partial('partial1')``` does not work. Support welcome!
* [mustache](https://github.com/janl/mustache.js) -- ```{{{ layout 'default' }}}``` and ```{{ partial("partial1") }}``` does not work. Support welcome!


## API

```javascript
var Comprise = require('comprise').Comprise;

var comprise = new Comprise({
	engine: 'jade',
	layout: 'default',
	templateDir: __dirname + '/views'
});

comprise.render('your jade file', { user: user }, function(err, result) {
	if (err) {
		console.error(err);
	} else {
		console.log(result);
	}
});
```

**Available options:**

* ```engine``` - See [consolidate.js](https://github.com/visionmedia/consolidate.js) engine list
* ```layout``` - Optional default layout
* ```extension``` - file name extension, default is simular to ```engine```
* ```templateDir``` - Required
* ```layoutDir``` - Optional, default is ```$templateDir/_layout```
* ```partialDir``` - Optional, default is ```$templateDir/_partials```

## [express](http://expressjs.com/) framework integration

```javascript
var comprise = require('comprise');

app.engine('jade', comprise.express({
	engine: 'jade',
	layout: 'default'
}));
app.set('view engine', 'jade');
```

Available options see API section above.

```templateDir``` was automatically set based on the
[express setting](http://expressjs.com/api.html#app-settings) ```views``` (default ```./views```).

## Example

Just render ```content.jade```, but use the common ```default.jade```
template which extends the ```layout.jade```.

**```content.jade``` template:**

```jade
h1 This content use the standard layout!

div
	!= partial('partial1')
div
	!= partial('partial2.jade')
```

**```layout.jade``` layout:**

```jade
html
	head
		title comprise
	body
		!= content()
```

**```default.jade``` included layout:**

```jade
= layout('layout')

header
	nav navigation code

!= content()
```

## How it works

Comprise provides a simple wrapper around consolidate.js and add four small functions 
to the local template variables:

* ```layout(layout)``` adds a layout to the current template. Each call adds one to the layout hierachy. To replace a default layout call nolayout first.
* ```nolayout()``` removes a default layout for the current template. You could set another layout with layout.
* ```content()``` need to be called in a layout to insert the surrounded template.
* ```partial(partialTemplate[, partialVariables])``` could be used to include other templates. In the common case the partial template name don't need a file extension. If a extension is provided a different engine could be used.

## Installation

	npm install comprise --production

## Run the unit tests

	npm install --save-dev
	npm test
	
	# For code coverage
	npm run-script coverjs; open cover_html/index.html
	npm run-script istanbul; open coverage/lcov-report/index.html
