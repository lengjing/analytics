export function isFunction(input) {
  return typeof input == 'function';
}

export function isArray(input) {
  return Object.prototype.toString.call(Object(input)) == '[object Array]';
}

export function isString(input) {
  return input != null && ((input.constructor + '').indexOf('String') > -1);
}

export function isPlanObject(input) {
  return input != null && Object == input.constructor;
}

export function startWith(str, part) {
  return str.indexOf(part) == 0;
}

export function trim(str) {
  return str ? str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, '') : ''
}

export function toArray(arr) {
  return Array.prototype.slice.call(arr, 0);
}

export function uuid() {
  return Math.round(2147483647 * Math.random());
}
