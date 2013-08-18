# Comprise add layout and partial support to consolidate.js!

Comprise add layout and partial support to the great
[consolidate.js](https://github.com/visionmedia/consolidate.js)
template engine.

* Add layout support to your templates, incl.
  * Default templates
  * Template hierarchies
  * "no template" option.
* Partials could use the origin and optional a new variable scope.

## Example

**content.jade:**

```jade
h1 use standard layout

div
	!= partial('partial1')
div
	!= partial('partial2.jade')
```

**layout.jade:**

```jade
html
	head
		title comprise
	body
		!= content()
```

**default.jade:**

```jade
= layout('layout')

header
	nav navigation code

!= content()
```



## Installation

TODO As soon as there is a tagged version:

	npm install comprise --production

## API

```javascript
var comprise = new Comprise({
	engine: 'jade',
	layout: 'default',
	templateDir: __dirname + '/../examples/jade',
	layoutDir: __dirname + '/../examples/jade',
	partialDir: __dirname + '/../examples/jade'
});

comprise.render('complex', { user: 'me' }, function(err, result) {
	if (err) {
		console.error(err);
	} else {
		console.log(result);
	}
});
```

## Run the unit tests

	npm install --save-dev
	npm test
