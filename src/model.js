import Data from './data';
import { getHook } from './hook';
import { isFunction, isString } from './util';

export default class Model {
  constructor() {
    this.data = new Data();
  }
  get(fieldName) {
    let hook = getHook(fieldName);
    let value = this.data.get(fieldName);

    if (hook && undefined === value) {
      value = isFunction(hook.defaultValue) ? hook.defaultValue() : hook.defaultValue;
    }

    return hook && hook.getter ? hook.getter(this, fieldName, value) : value;
  }
  // set('a', 'c') || set({a: 'c'})
  set(fieldName, fieldValue, temporary) {
    if (!fieldName) return;

    let model = this;
    if (isString(fieldName)) {
      innerSet(model, fieldName, fieldValue, temporary);
    } else {
      for (let key in fieldName) {
        if (fieldName.hasOwnProperty(key)) {
          innerSet(model, key, fieldName[key], temporary);
        }
      }
    }
  }
  clearTmpData() {
    this.data.tmpData = {};
  }
}

function innerSet(model, fieldName, fieldValue, temporary) {
  let hook = getHook(fieldName);

  if (hook && hook.setter) {
    hook.setter(model, fieldName, fieldValue, temporary);
  } else {
    model.data.set(fieldName, fieldValue, temporary);
  }
}
