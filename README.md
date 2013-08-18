# Comprise add layout and partial support to consolidate.js!

Comprise add layout and partial support to the great
[consolidate.js](https://github.com/visionmedia/consolidate.js)
template engine.

* Add layout support to your templates, incl.
  * Default templates
  * Template hierarchies
  * "no template" option.
* Partials could use the origin and optional a new variable scope.

***TODO***

* [express](http://expressjs.com/) integration
* (maybe also an simple [Connect](http://www.senchalabs.org/connect/) integration?)

## Work in Process -- Express Integration

```javascript
app.engine('html', require('Comprise').express); // TODO
app.set('views', __dirname + '/app/views');
app.set('view engine', 'html');
```

## Example

Just render ```content.jade```, but use the common ```default.jade```
template which extends the ```layout.jade```.

### Template ```content.jade```

```jade
h1 This content use the standard layout!

div
	!= partial('partial1')
div
	!= partial('partial2.jade')
```

### Layout ```layout.jade```

```jade
html
	head
		title comprise
	body
		!= content()
```

### Included layout ```default.jade```

```jade
= layout('layout')

header
	nav navigation code

!= content()
```

### API calls ```example.js```

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

## Installation

TODO As soon as there is a tagged version:

	npm install comprise --production

## Run the unit tests

	npm install --save-dev
	npm test
