'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = HandlebarsNested;

var _utils = require('./utils');

var _core = require('./core');

var _deps = require('./deps');

var _deps2 = _interopRequireDefault(_deps);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HandlebarsNested(Handlebars) {
  if (!_deps2.default.Handlebars) {
    var extend = Handlebars.Utils.extend;


    extend(_deps2.default, { Handlebars: Handlebars });

    extend(Handlebars, {
      resolveNested: _core.resolveNested,
      registerHelper: _core.registerHelper,
      _registerHelper: Handlebars.registerHelper
    });

    extend(Handlebars.Utils, { isString: _utils.isString });
  }

  return Handlebars;
}

if (typeof window !== "undefined" && window.Handlebars) {
  HandlebarsNested(window.Handlebars);
}
