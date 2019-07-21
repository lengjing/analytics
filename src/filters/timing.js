import { inBrowser } from "../util";
import { PLT, PDT, DNS, TCP, SRT, RRT, DIT, CLT, HIT_TYPE, BIZ } from "../hooks";
import { addEventListener } from '../util';

export default function timingTask(model, cb) {
  if (!inBrowser || model.get(HIT_TYPE) !== 'pageview') return cb();
  innerTimingTask(model, cb);
}

function innerTimingTask(model, cb) {
  let timing = {};

  if (calcPagePerf(timing)) {
    let plt = timing[PLT];
    if (plt > 0) {
      removeUselessValue(timing)
      model.set(BIZ, timing, true);
      cb();
    } else {
      addEventListener(window, 'load', function () {
        innerTimingTask(model, cb);
      }, false);
    }
  } else {
    cb();
  }
}

function calcPagePerf(t) {
  let perf = window.performance || window.webkitPerformance;
  let timing = perf && perf.timing;
  let navigationStart = timing && timing.navigationStart;

  if (navigationStart === 0 || navigationStart === undefined) {
    return false;
  }

  // https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters?hl=zh-cn
  t[PLT] = timing.loadEventStart - navigationStart;
  t[DNS] = timing.domainLookupEnd - timing.domainLookupStart;
  t[TCP] = timing.connectEnd - timing.connectStart;
  t[SRT] = timing.responseStart - timing.requestStart;
  t[PDT] = timing.responseEnd - timing.responseStart;
  t[RRT] = timing.fetchStart - navigationStart;
  t[DIT] = timing.domInteractive - navigationStart;
  t[CLT] = timing.domContentLoadedEventStart - navigationStart;

  return true;
}

function removeUselessValue(t) {
  for (let k in t) {
    if (t[k] === Infinity || isNaN(t[k]) || t[k] < 0) {
      delete t[k];
    }
  }
}
