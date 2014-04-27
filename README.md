handlebars.nested
=================

This library is an extension for Handlebars which allows nesting helpers or expressions within other helpers in one level deep. It was first created as a workaround to older versions, but after more issues came across it turned out to be an effective solution for those problems.

## Features

* Nesting helpers in one level deep.
* Nesting expressions with helpers in one level deep.

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
