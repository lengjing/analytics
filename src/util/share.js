import { isPlanObject } from "./lang";

export const version = '__VERSION__';

// noop
export function noop() { }
/**
 * [{a: 1}] => {a: 1}
 * []
 * @param {*} params 
 * @param {*} opts 
 */
export function transformInput(params, opts) {
  if (1 === opts.length && null !== opts[0] && isPlanObject(opts[0])) {
    // opts === [{}]
    return opts[0];
  }
  for (var ret = {}, len = Math.min(params.length + 1, opts.length), i = 0; i < len; i++) {
    if ('object' === typeof opts[i]) {
      for (let g in opts[i]) {
        opts[i].hasOwnProperty(g) && (ret[g] = opts[i][g]);
      }
      break;
    } else {
      len <= params.length && (ret[params[i]] = opts[i]);
    }
  }
  return ret;
}
