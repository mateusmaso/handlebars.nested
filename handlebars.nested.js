(function(Handlebars) {

  Handlebars.registerHelper = function(name, fn, inverse) {
    var nestedFn = function() {
      var _this = this;
      var _arguments = [];

      _.each(arguments, function(argument, i) {
        if (_.isObject(argument) && argument.hash) {
          _arguments[i] = _.clone(argument)
          _.each(_arguments[i].hash, function(value, key) {
            _arguments[i].hash[key] = Handlebars.resolveNested.apply(_this, [value])
          });
        } else {
          _arguments[i] = Handlebars.resolveNested.apply(_this, [argument])
        }
      });

      return fn.apply(this, _arguments);
    }

    if (inverse) nestedFn.not = inverse;
    this.helpers[name] = nestedFn;
  };

  Handlebars.resolveNested = function(value) {
    if(_.isString(value) && value.indexOf('{{') >= 0) {
      value = Handlebars.compile(value)(this);
    }
    
    return value;
  };

})(Handlebars);
