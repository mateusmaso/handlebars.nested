'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isString;
function isString(object) {
  return toString.call(object) == '[object String]';
}
