import {isString} from './utils';
import {registerHelper, resolveNested} from './core';

function bindAll(object, parent) {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === "function") {
      object[key] = object[key].bind(parent);
    }
  })

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
    _registerHelper,
    registerHelper
  };
};

export default function HandlebarsNested(Handlebars) {
  Object.assign(Handlebars, bindAll({
    resolveNested,
    ...extendRegisterHelper(Handlebars)
  }, Handlebars));

  Object.assign(Handlebars.Utils, bindAll({
    isString
  }, Handlebars.Utils));

  return Handlebars;
}

if (typeof window !== "undefined" && window.Handlebars) {
  HandlebarsNested(window.Handlebars);
}
