import Data from './data';
import { noop } from './util';

export default class Hook {
  constructor(name, paramName, defaultValue, getter, setter) {
    this.name = name;
    this.paramName = paramName;
    this.defaultValue = defaultValue;
    this.getter = getter;
    this.setter = setter;
  }
}

export const hookMap = new Data();

export function setHook(name, paramName, defaultValue, getter, setter) {
  let hook = new Hook(name, paramName, defaultValue, getter, setter);
  hookMap.set(hook.name, hook);
  return hook.name;
}

export function setReadonlyHook(name, paramName, defaultValue) {
  return setHook(name, paramName, defaultValue, undefined, noop);
}

export function getHook(fieldName) {
  return hookMap.get(fieldName);
}
