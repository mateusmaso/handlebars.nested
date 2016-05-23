'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isString = isString;
function isString(object) {
  return toString.call(object) == '[object String]';
}
