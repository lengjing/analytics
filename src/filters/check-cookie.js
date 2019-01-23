import { setCookie, getCookie } from "../util/cookie";
import {
  COOKIE_NAME, COOKIE_DOMAIN, COOKIE_PATH,
  COOKIE_EXPIRES, CLIENT_ID, STORAGE
} from "../hooks";
import { inBrowser } from "../util";

let cookieSetted = false;

function setMACookie(model) {
  let cookieDomain = null;
  let cookieDomainV = model.get(COOKIE_DOMAIN);

  if (cookieDomainV === 'auto') {
    let hostname = window.location.hostname;
    let hostVals = hostname.split('.');
    // ip
    if (hostVals.length === 4 && /^\d+$/.test(hostVals[hostVals.length - 1])) {
      cookieDomain = hostname;
    } else {
      // ['a', 'b', 'c', 'com'] ['localhost'] ['a', 'com']
      cookieDomain = hostVals.slice(-2).join('.');
    }
  } else {
    cookieDomain = cookieDomainV;
  }

  setCookie(
    model.get(COOKIE_NAME),
    model.get(CLIENT_ID),
    model.get(COOKIE_PATH),
    cookieDomain,
    model.get(COOKIE_EXPIRES)
  )
}

function getMACookie(model) {
  let cookieValues = getCookie(model.get(COOKIE_NAME));

  if (cookieValues.length > 0) {
    cookieSetted = true;
    model.data.set(CLIENT_ID, cookieValues[0]);
  }

  return cookieValues;
}

export default function checkCookieTask(model, cb) {
  if (model.get(STORAGE) !== 'cookie' || cookieSetted || !inBrowser) {
    return cb();
  }
  getMACookie(model);
  if (!cookieSetted && setMACookie(model)) {
    throw 'abort';
  } else {
    cb();
  }
}