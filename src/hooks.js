import { setHook, setReadonlyHook } from './hook';
import { inBrowser, isString } from './util';

// 平台
export const PLATFORM = setHook('platform', 'platform');
// 载体
export const CONTAINER = setHook('container', 'container');
// 应用名称
export const APP_NAME = setHook('appName', 'app_name');
// 系统语言
export const LANGUAGE = setHook('language', 'language');
// app 语言
export const LANGUAGE_APP = setHook('languageApp', 'language_app');
export const TIMESTAMP = setHook('timestamp', 'timestamp', undefined, () => Date.now());
export const LOCATION = setHook('location', 'location');
export const CITY_ID = setHook('cityId', 'city_id');
export const VERSION = setHook('version', 'version');
// 编译版本号
export const BUILD = setHook('build', 'build');
export const CHANNEL = setHook('channel', 'channel');
export const DISTINCT_ID = setHook('distinctId', 'distinct_id');
// 系统版本
export const VERSION_OS = setHook('versionOS', 'version_os');
// 系统名称
export const SYS_NAME = setHook('sysName', 'sys_name');
// 设备型号
export const MODEL = setHook('model', 'model');
// 分辨率
export const SCREEN = setHook('screen', 'screen');
export const DEVICE_PIXEL_RATIO = setHook('devicePixelRatio', 'devicePixelRatio');
export const NET = setHook('net', 'net');
// sdk 版本号
export const VERSION_SDK = setHook('versionSDK', 'version_sdk');
export const USER_ID = setHook('userId', 'userid');
export const PHONE = setHook('phone', 'phone');
// APP 视图路径
export const PATH_APP = setHook('pathApp', 'path_app');
export const PROTOCOL = setHook('protocol', 'protocol');
export const DOMAIN = setHook('domain', 'domain');
// web 页面中的 path
export const PATH_WEB = setHook('pathWeb', 'path_web', () => inBrowser && window.location.pathname);
export const HASH = setHook('hash', 'hash', () => inBrowser && window.location.hash);
// referrer
export const REFERRER = setHook('referrer', 'referrer', () => {
  let referrer = undefined;
  if (inBrowser) {
    referrer = window.referrer || document.referrer;
    // #3
    return isString(referrer) ? referrer : '';
  }
});

// biz ------------ 
export const BIZ = setHook('biz', 'biz');
// ----------------

// event -----------
// 事件标识
export const EVENT_CATEGORY = setHook('eventCategory', 'event');
// 事件类型
export const EVENT_ACTION = setHook('eventAction', 'event_type');
// ------------------

// 兼容老 api 
// oneOf(['page', 'action']) pageview => Page event => Action
const __MAP = { 'pageview': 'Page', 'event': 'Action' };
export const __EVENT = setHook('__eventType', 'event_type', undefined, (model) => __MAP[model.get(HIT_TYPE)]);
export const __EVENT_CATEGORY = setHook('__eventCategory', 'event');

// 事件类型 oneOf(['event', 'preview'])
export const HIT_TYPE = setHook('hitType');
// 参数
export const HIT_PAYLOAD = setHook('hitPayload');
// 回调方法
export const HIT_CALLBACK = setHook('hitCallback');

// tracker name
export const NAME = setReadonlyHook('name');
// 
export const CLIENT_ID = setReadonlyHook('clientId');
// storage
export const STORAGE = setReadonlyHook('storage', undefined, 'localStorage');
// cookie
export const COOKIE_NAME = setReadonlyHook('cookieName', undefined, '__ma');
export const COOKIE_DOMAIN = setReadonlyHook('cookieDomain', undefined, 'auto'); // 默认为一级域名
export const COOKIE_PATH = setReadonlyHook('cookiePath', undefined, '/');
export const COOKIE_EXPIRES = setReadonlyHook('cookieExpires', undefined, 31104000000); // 1 年
//
export const ALLOW_LINKER = setReadonlyHook('allowLinker', undefined, true);
export const ALLOW_ANCHOR = setReadonlyHook('allowAnchor', undefined, true);
export const ALYWAYS_SEND_REFERRER = setReadonlyHook('alwaysSendReferrer', undefined, false);
// 请求链接
export const TRANSPORT_URL = setHook('transportUrl');
// 请求方式
export const TRANSPORT = setHook('transport', undefined, 'xhr');
// 使用 beacon
export const USE_BEACON = setHook('useBeacon', undefined, false);
// 环境 默认为 development 也可以通过环境变量 NODE_ENV 来取值
// 优先级为 接口(ma.set('env')) > process.env.NODE_ENV > 'development'
export const ENV = setHook('env', undefined, () => process && process.env && process.env.NODE_ENV || 'development');
// 过滤方法
export const BUILD_HIT_TASK = setHook('buildHitTask');
export const SEND_HIT_TASK = setHook('sendHitTask');
export const CHECK_COOKIE_TASK = setHook('checkCookieTask');
export const CHECK_STORAGE_TASK = setHook('checkStorageTask');
