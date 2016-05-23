handlebars.nested [![Build Status](https://travis-ci.org/mateusmaso/handlebars.nested.svg?branch=master)](https://travis-ci.org/mateusmaso/handlebars.nested)
=================

This is a Handlebars plugin which allows nesting helpers and expressions in one level deep. For latest versions of Handlebars, please consider using [subexpressions](http://handlebarsjs.com/expressions.html) instead.

## Install

```
$ npm install --save handlebars.nested
```

## Usage

```javascript
var Handlebars = require("handlebars");
require("handlebars.nested").default(Handlebars);
```

## Examples

```html
<table>
  <tr>
    <td>{{autolink "{{breakline text}}"}}</td>
    <td>{{tooltip placeholder="{{t 'tooltip.placeholder'}}" title="{{user.name}} is following"}}</td>
  </tr>
</table>
```

## License

MIT © [Mateus Maso](http://www.mateusmaso.com)
