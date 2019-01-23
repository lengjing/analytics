import Tracker from './tracker';
import MQ from './mq';
import { transformInput, trim, version, inBrowser } from './util';
import { NAME } from './hooks';

const mq = new MQ();
// mwee analytic hook
export const MA_HOOK = (inBrowser && window.MweeAnalyticsObject) ? trim(window.MweeAnalyticsObject) : 'ma';

// mwee analytic
export default function MA(...args) {
  mq.run([...args])
}

MA.trackerMap = {};
MA.trackers = [];
MA.startTime = 0;
MA.answer = 5117;     // 用于确定这是一个真正的 MA 对象

const CREATE_PARAMS_NAMES = [];
// 创建一个 tracker
MA.create = function (...args) {
  let opts = transformInput(CREATE_PARAMS_NAMES, args);
  if (!opts[NAME]) {
    opts[NAME] = 't0';
  }

  let trackerName = '' + opts[NAME];
  if (MA.trackerMap[trackerName]) {
    return MA.trackerMap[trackerName];
  }

  let tracker = new Tracker(opts);

  MA.trackerMap[trackerName] = tracker;
  MA.trackers.push(tracker);

  return tracker;
};

// 移除一个 tracker
MA.remove = function (trackerName) {
  for (let i = 0; i < MA.trackers.length; i++)
    if (MA.trackers[i].get(NAME) === trackerName) {
      MA.trackers.splice(i, 1);
      MA.trackerMap[trackerName] = null;
      break;
    }
};

MA.getByName = function (name) {
  return MA.trackerMap[name];
};

MA.getAll = function () {
  return MA.trackers.slice(0);
};

MA.version = version;

MA.startTime = Date.now();

MA.loaded = true;

// init tracker 
if (MA.trackers.length <= 0) {
  MA.create();
}
