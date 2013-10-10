(function(Handlebars) {

  var registerHelper = Handlebars.registerHelper;

  Handlebars.registerHelper = function(name, fn, inverse) {
    var nestedFn = function() {
      var args = [];

      for (i in arguments) {
        var argument = arguments[i];

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
    if (toString.call(value) == '[object String]' && value.indexOf('{{') >= 0) {
      value = Handlebars.compile(value)(this);
    }
    
    return value;
  };

})(Handlebars);
