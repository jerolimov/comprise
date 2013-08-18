# Comprise add layout and partial support to consolidate.js!

Comprise add layout and partial support to the great
[consolidate.js](https://github.com/visionmedia/consolidate.js)
template engine.

* Add layout support to your templates, incl.
  * Default templates
  * Template hierarchies
  * "no template" option.
* Partials could use the origin and optional a new variable scope.

## API

```javascript
var Comprise = require('comprise').Comprise;

var comprise = new Comprise({ engine: 'jade', layout: 'default' });

comprise.render('your jade file', { user: user }, function(err, result) {
	if (err) {
		console.error(err);
	} else {
		console.log(result);
	}
});
```

More options for the constructor:

* ```templateDir```
* ```layoutDir```
* ```partialDir```


## Work in Process -- [express](http://expressjs.com/) integration

```javascript
var Comprise = require('comprise').Comprise;

var comprise = new Comprise({ engine: 'jade', layout: 'default' });

app.engine('comprise', comprise); // TODO not working yet :D
app.set('view engine', 'comprise');
```

More options see API above.

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
to the variable scope:

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
