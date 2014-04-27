(function(Handlebars) {

  var registerHelper = Handlebars.registerHelper;

  var isString = function(object) {
    return toString.call(object) == '[object String]';
  };

  Handlebars.registerHelper = function(name, fn, inverse) {
    var nestedFn = function() {
      var args = [];

      for (var index = 0; index < arguments.length; index++) {
        var argument = arguments[index];

        if (argument && argument.hash) {     
          for (key in argument.hash) {
            argument.hash[key] = Handlebars.resolveNested.apply(this, [argument.hash[key]]);
          }

          args.push(argument);
        } else {
          args.push(Handlebars.resolveNested.apply(this, [argument]));
        }
      }

      return fn.apply(this, args);
    };

    registerHelper.apply(this, [name, nestedFn, inverse]);
  };

  Handlebars.resolveNested = function(value) {
    if (isString(value) && value.indexOf('{{') >= 0) {
      value = Handlebars.compile(value)(this);
    }
    
    return value;
  };

})(Handlebars);