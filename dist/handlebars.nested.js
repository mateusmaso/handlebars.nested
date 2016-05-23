// handlebars.nested
// -----------------
// v0.2.1
//
// Copyright (c) 2012-2016 Mateus Maso
// Distributed under MIT license
//
// http://github.com/mateusmaso/handlebars.nested


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../deps":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUtils = getUtils;
var deps = {};

function getUtils() {
  return deps.Handlebars.Utils;
}

exports.default = deps;

},{}],3:[function(require,module,exports){
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

},{"./core":1,"./deps":2,"./utils":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = isString;
function isString(object) {
  return toString.call(object) == '[object String]';
}

},{}]},{},[3]);
