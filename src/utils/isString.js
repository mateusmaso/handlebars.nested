export default function isString(object) {
  return toString.call(object) == '[object String]';
}
