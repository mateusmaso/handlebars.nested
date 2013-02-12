Handlebars.registerHelper = function(name, fn, inverse) {
	var nestedFn = function() {
		_.each(arguments, function(arg) {
			if (_.isObject(arg) && arg.hash) {
				_.each(arg.hash, function(val, key) {
					arg.hash[key] = Handlebars.resolveNested.apply(this, [val])
				});
			} else {
				arg = Handlebars.resolveNested.apply(this, [arg])
			}
		});

		return fn.apply(this, arguments);
	}

  if(inverse) { nestedFn.not = inverse; }
  this.helpers[name] = nestedFn;
};

Handlebars.resolveNested = function(value) {
  if(_.isString(value) && value.indexOf('{{') >= 0) {
    value = Handlebars.compile(value)(this);
  }
	
  return value;
}