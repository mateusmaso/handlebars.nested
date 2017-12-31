// handlebars.nested
// -----------------
// v0.2.3
//
// Copyright (c) 2012-2017 Mateus Maso
// Distributed under MIT license
//
// http://github.com/mateusmaso/handlebars.nested


(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolveNested = exports.registerHelper = undefined;

var _registerHelper = require('./registerHelper');

var _registerHelper2 = _interopRequireDefault(_registerHelper);

var _resolveNested = require('./resolveNested');

var _resolveNested2 = _interopRequireDefault(_resolveNested);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.registerHelper = _registerHelper2.default;
exports.resolveNested = _resolveNested2.default;

},{"./registerHelper":2,"./resolveNested":3}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = registerHelper;
function registerHelper(name, fn, inverse) {
  var Handlebars = this;

  var nestedFn = function nestedFn() {
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

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = resolveNested;
function resolveNested(value, context) {
  if (this.Utils.isString(value) && value.indexOf('{{') >= 0) {
    value = this.compile(value)(context);
  }

  return value;
};

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HandlebarsNested;

var _utils = require('./utils');

var _core = require('./core');

function bindAll(object, parent) {
  Object.keys(object).forEach(function (key) {
    if (typeof object[key] === "function") {
      object[key] = object[key].bind(parent);
    }
  });

  return object;
};

function extendRegisterHelper(Handlebars) {
  var _registerHelper;

  if (Handlebars._registerHelper) {
    _registerHelper = Handlebars._registerHelper;
  } else {
    _registerHelper = Handlebars.registerHelper;
  }

  return {
    _registerHelper: _registerHelper,
    registerHelper: _core.registerHelper
  };
};

function HandlebarsNested(Handlebars) {
  _extends(Handlebars, bindAll(_extends({
    resolveNested: _core.resolveNested
  }, extendRegisterHelper(Handlebars)), Handlebars));

  _extends(Handlebars.Utils, bindAll({
    isString: _utils.isString
  }, Handlebars.Utils));

  return Handlebars;
}

if (typeof window !== "undefined" && window.Handlebars) {
  HandlebarsNested(window.Handlebars);
}

},{"./core":1,"./utils":5}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = undefined;

var _isString = require('./isString');

var _isString2 = _interopRequireDefault(_isString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.isString = _isString2.default;

},{"./isString":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isString;
function isString(object) {
  return toString.call(object) == '[object String]';
}

},{}]},{},[4]);
