#WhereTo

  Express middlewere wrapper for handling .all() requests for [node](http://nodejs.org).

  [![NPM Version][npm-image]][npm-url]
  [![NPM Downloads][downloads-image]][downloads-url]

```js
var express = require('express');
var whereTo = require('whereto');
var app = express();

app.all('/form', whereTo({
    get: function(req, res) {
        //display a form here
    },
    post: function(req, res) {
        //process form data here
    }
})

app.listen(8080)
```

You can also add an additional options object to your whereTo call. These options will get passed as the 4th parameter in your express middleware.

WhereTo allows you to pass in a functions as well. If you pass in a function it will be called directly, any options you provided will be delivered to the 4th paramter.

```js
var express = require('express');
var whereTo = require('whereto');
var app = express();

app.get('/test', whereTo(function(req, res, next, options) {
        //do something here
        res.send('option1 = '+options.option1);
    },{ option1: 123 });

app.listen(8080)
```

## Installation

```bash
$ npm install whereto
```
