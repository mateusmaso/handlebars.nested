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
