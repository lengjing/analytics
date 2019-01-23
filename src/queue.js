import { isFunction, noop } from './util';
import { HIT_CALLBACK } from './hooks';

export default class Queue {
  constructor() {
    this.queue = [];
  }
  add(methodName) {
    this.queue.push(methodName);
  }
  exec(model) {
    try {
      for (let i = 0; i < this.queue.length; i++) {
        let filter = model.get(this.queue[i]);
        filter && isFunction(filter) && filter.call(null, model);
      }
    } catch (e) { }
    let hitCb = model.get(HIT_CALLBACK);
    if (isFunction(hitCb)) {
      model.set(HIT_CALLBACK, noop, true);
      setTimeout(hitCb, 10);
    }
  }
  // 异步执行 err 不处理
  execAsync(model, cb) {
    let queue = this.queue;
    let index = 0;

    const next = () => {
      if (index >= queue.length) {
        let hitCb = model.get(HIT_CALLBACK);

        if (isFunction(hitCb)) {
          model.set(HIT_CALLBACK, noop, true);
          setTimeout(hitCb, 10);
        }
        cb()
      } else {
        let filter = model.get(queue[index++]);

        if (isFunction(filter)) {
          try {
            filter.call(null, model, next);
          } catch (e) { }
        }
      }
    }

    next();
  }
}
