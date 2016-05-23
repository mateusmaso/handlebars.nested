import deps, {getUtils} from "../deps";

export function registerHelper(name, fn, inverse) {
  var nestedFn = function() {
    var nestedArguments = [];

    for (var index = 0; index < arguments.length; index++) {
      var argument = arguments[index];

      if (argument && argument.hash) {
        for (var key in argument.hash) {
          argument.hash[key] = resolveNested.apply(this, [argument.hash[key]]);
        }

        nestedArguments.push(argument);
      } else {
        nestedArguments.push(resolveNested.apply(this, [argument]));
      }
    }

    return fn.apply(this, nestedArguments);
  };

  deps.Handlebars._registerHelper.apply(this, [name, nestedFn, inverse]);
};

export function resolveNested(value) {
  if (getUtils().isString(value) && value.indexOf('{{') >= 0) {
    value = deps.Handlebars.compile(value)(this);
  }

  return value;
};
