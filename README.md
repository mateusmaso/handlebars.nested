handlebars.nested [![Build Status](https://travis-ci.org/mateusmaso/handlebars.nested.svg?branch=master)](https://travis-ci.org/mateusmaso/handlebars.nested)
=================

This library is an extension for Handlebars which allows nesting helpers and expressions in one level deep. It was first created as a workaround but turned out to be an simple and effective solution for many issues.

## Features

* Nesting helpers and expressions.

## Dependencies

* handlebars.js (>= 1.0.0)

## Node

```javascript
var Handlebars = global.Handlebars = require("handlebars");
require("handlebars.nested");
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

Copyright (c) 2012-2014 Mateus Maso. Released under an MIT license.
