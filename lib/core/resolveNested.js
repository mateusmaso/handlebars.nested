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
