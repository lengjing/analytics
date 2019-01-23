import MA, { MA_HOOK } from './ma';
import MQ from './mq';
import {
  addEventListener, removeEventListener, isArray, inBrowser
} from './util';

const mq = new MQ();

function main() {
  let _ma = window[MA_HOOK];
  let _q = _ma && _ma.q;

  if (!_ma || 5117 !== _ma.answer) {
    // _ma.l 是在投放代码里面设置的时间，记录了投放代码执行的时间点
    MA.startTime = _ma && _ma.l;
    // 设置真正的 ma
    window[MA_HOOK] = MA;
    // _ma.q 保存着需要执行的代码
    if (isArray(_q)) {
      mq.run.apply(mq, _q);
    }
  }
}

function executeWithoutPrerender(fn) {
  if ('prerender' === document.visibilityState) {
    return false;
  }
  fn();
  return true;
}

if (inBrowser) {
  if (!executeWithoutPrerender(main)) {
    let executed = false;
    let cb = function () {
      if (!executed && executeWithoutPrerender(main)) {
        executed = true;
        removeEventListener(document, 'visibilitychange', cb)
      }
    };
    addEventListener(document, 'visibilitychange', cb)
  }
}
