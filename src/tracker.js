import Model from './model';
import Queue from './queue';
import {
  NAME, PLATFORM, LANGUAGE, APP_NAME, SCREEN, VERSION_SDK, PROTOCOL,
  DOMAIN, ALLOW_ANCHOR, ALLOW_LINKER, HIT_TYPE, BUILD_HIT_TASK,
  SEND_HIT_TASK, BIZ, CLIENT_ID, COOKIE_DOMAIN,
  COOKIE_NAME, CHECK_COOKIE_TASK, COOKIE_PATH, COOKIE_EXPIRES,
  CHECK_STORAGE_TASK, VERSION_OS, CONTAINER, DEVICE_PIXEL_RATIO,
  TIMING_TASK
} from './hooks';
import { isString, platform, version, transformInput, inBrowser, uuid, OS, container } from './util';
import buildHitTask from './filters/build-hit';
import sendHitTask from './filters/send-hit';
import checkCookieTask from './filters/check-cookie';
import checkStorageTask from './filters/check-storage';
import timingTask from './filters/timing';

const PARAMS_NAMES = {
  pageview: [],
  // event: [EVENT_CATEGORY, EVENT_ACTION],
  // biz: [BIZ],
  // 兼容老的埋点方式
  event: [BIZ]
};
export default class Tracker {
  constructor(opts) {
    let model = this.model = new Model();
    let filters = this.filters = new Queue();

    function addFilter(name, filter) {
      model.set(name, filter)
      filters.add(name, filter);
    }

    // readonly
    model.data.set(NAME, opts[NAME]);
    model.data.set(COOKIE_NAME, opts[COOKIE_NAME]);
    model.data.set(COOKIE_DOMAIN, opts[COOKIE_DOMAIN]);
    model.data.set(COOKIE_PATH, opts[COOKIE_PATH]);
    model.data.set(COOKIE_EXPIRES, opts[COOKIE_EXPIRES]);
    model.data.set(ALLOW_ANCHOR, opts[ALLOW_ANCHOR]);
    model.data.set(ALLOW_LINKER, opts[ALLOW_LINKER]);

    model.set(VERSION_SDK, version);
    model.set(PLATFORM, platform);

    if (inBrowser) {
      model.set(APP_NAME, window.location.host);
      model.set(LANGUAGE, (window.navigator.language || window.navigator.browserLanguage || '').toLowerCase());
      model.set(SCREEN, window.screen.width + 'x' + window.screen.height);
      model.set(PROTOCOL, window.location.protocol);
      model.set(DOMAIN, window.location.hostname);
      // removed to hooks
      // model.set(PATH_WEB, window.location.pathname);
      // model.set(HASH, window.location.hash);
      OS.version && model.set(VERSION_OS, OS.version);
      model.set(DEVICE_PIXEL_RATIO, window.devicePixelRatio);
      model.set(CONTAINER, container);
    }

    addFilter(CHECK_COOKIE_TASK, checkCookieTask);
    addFilter(TIMING_TASK, timingTask);
    addFilter(CHECK_STORAGE_TASK, checkStorageTask);
    addFilter(BUILD_HIT_TASK, buildHitTask);
    addFilter(SEND_HIT_TASK, sendHitTask);

    // clientid 用来生成 cookie
    if (!model.get(CLIENT_ID)) {
      model.data.set(CLIENT_ID, uuid() & 2147483647)
    }
  }
  get(fieldName) {
    return this.model.get(fieldName);
  }
  set(fieldName, value) {
    this.model.set(fieldName, value);
  }
  // send({hitType: 'event', eventCategory: 1, eventAction: 2})
  // send('event', 1, 2)
  send(...args) {
    if (args.length >= 1) {
      let hitType, opts;
      if (isString(args[0])) {
        hitType = args[0];
        opts = args.slice(1);
      } else {
        hitType = args[0][HIT_TYPE];
        opts = args;
      }

      if (hitType) {
        opts = transformInput(PARAMS_NAMES[hitType], opts);
        // todo:
        // 如果 hitType 是 event 则把 fieldObj 赋值给 biz
        if (hitType === 'event') {
          delete opts.hitType;
          // 
          opts = { [BIZ]: Object.assign({}, this.get(BIZ), opts) };
        }

        opts[HIT_TYPE] = hitType;
        this.model.set(opts, undefined, true);
        // this.filters.exec(this.model);
        this.filters.execAsync(this.model, () => {
          this.model.clearTmpData();
        });
      }
    }
  }
}
