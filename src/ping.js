import { createImg, noop } from './util';

export function imgPing(url, data, cb) {
  var img = createImg(url + '?' + data);
  img.onload = img.onerror = function () {
    img.onload = img.onerror = null;
    cb();
  }
}

export function xhrPing(url, data, headers, cb) {
  var XML = window.XMLHttpRequest;
  if (!XML) {
    return false;
  }
  if (!cb && typeof headers === 'function') {
    cb = headers;
    headers = null;
  }
  var xml = new XMLHttpRequest();
  // if (!('withCredentials' in xml)) {
  //   return false;
  // }
  xml.open('POST', url, true);
  // 
  xml.withCredentials = false;
  headers = {
    'Content-Type': 'text/plain;charset=UTF-8',
    // "cache-control": "no-cache",
    ...headers
  };

  Object.keys(headers).forEach((key) => {
    xml.setRequestHeader(key, headers[key]);
  });

  xml.onreadystatechange = function () {
    4 == xml.readyState && (cb(xml.response), xml = null)
  };
  xml.send(data);
  return true
}

export function beaconPing(url, data, cb) {
  return window && window.navigator.sendBeacon
    ? window.navigator.sendBeacon(url, data)
      ? (cb(), true)
      : false
    : false
}

// 小程序
export function wxPing(url, data, cb) {
  return wx && wx.request ?
    (wx.request({
      url,
      data,
      method: 'post',
      header: {
        'content-type': 'application/json',
      },
      success: cb,
    }, true)) : false
}

export function smartPing(url, data, cb = noop) {
  return beaconPing(url, data, cb) || xhrPing(url, data, cb)
}