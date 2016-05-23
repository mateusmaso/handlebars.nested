import {isString} from './utils';
import {registerHelper, resolveNested} from './core';
import deps from "./deps";

export default function HandlebarsNested(Handlebars) {
  if (!deps.Handlebars) {
    var {extend} = Handlebars.Utils;

    extend(deps, {Handlebars});

    extend(Handlebars, {
      resolveNested,
      registerHelper,
      _registerHelper: Handlebars.registerHelper
    });

    extend(Handlebars.Utils, {isString});
  }

  return Handlebars;
}

if (typeof window !== "undefined" && window.Handlebars) {
  HandlebarsNested(window.Handlebars);
}
