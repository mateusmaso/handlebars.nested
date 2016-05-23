"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerHelper = registerHelper;
exports.resolveNested = resolveNested;

var _deps = require("../deps");

var _deps2 = _interopRequireDefault(_deps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerHelper(name, fn, inverse) {
  var nestedFn = function nestedFn() {
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

  _deps2.default.Handlebars._registerHelper.apply(this, [name, nestedFn, inverse]);
};

function resolveNested(value) {
  if ((0, _deps.getUtils)().isString(value) && value.indexOf('{{') >= 0) {
    value = _deps2.default.Handlebars.compile(value)(this);
  }

  return value;
};
