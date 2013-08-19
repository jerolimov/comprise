# Comprise add layout and partial support to consolidate.js!

Comprise add layout and partial support to the great
[consolidate.js](https://github.com/visionmedia/consolidate.js)
template engine.

* Add layout support to your templates, incl.
  * Default templates
  * Template hierarchies
  * "no template" option.
* Partials could use the origin and optional a new variable scope.

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

* ```layout(layout)```
* ```nolayout()```
* ```content()```
* ```partial(partialTemplate, partialVariables)```

## Installation

TODO As soon as there is a tagged version:

	npm install comprise --production

## Run the unit tests

	npm install --save-dev
	npm test
