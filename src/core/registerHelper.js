export default function registerHelper(name, fn, inverse) {
  var Handlebars = this;

  var nestedFn = function() {
    var nestedArguments = [];

    for (var index = 0; index < arguments.length; index++) {
      var argument = arguments[index];

      if (argument && argument.hash) {
        for (var key in argument.hash) {
          argument.hash[key] = Handlebars.resolveNested(argument.hash[key], this);
        }

        nestedArguments.push(argument);
      } else {
        nestedArguments.push(Handlebars.resolveNested(argument, this));
      }
    }

    return fn.apply(this, nestedArguments);
  };

  this._registerHelper.apply(this, [name, nestedFn, inverse]);
};
