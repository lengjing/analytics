import _platform from 'platform';

export const inBrowser = typeof window !== 'undefined';
export const UA = inBrowser && window.navigator.userAgent.toLowerCase();
export const inHybird = UA && /meiweiboss|mweecashier/.test(UA);
export const inWechat = UA && /micromessenger/.test(UA);
export const inAlipay = UA && /alipayclient/.test(UA);
export const hybirdPlatform = inHybird && (/iphone|ipad|ipod|ios/.test(UA) ? 'ios' : 'android');
export const thirdPlatform = inWechat
  ? 'Wechat'
  : inAlipay
    ? 'Alipay'
    : inMiniProgram
      ? 'mini-program'
      : null;
export const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (hybirdPlatform === 'ios');
export const isAndroid = (UA && UA.indexOf('android') > 0) || (hybirdPlatform === 'android');
export const isWin = inBrowser && /win/i.test(navigator.platform);
export const isMac = inBrowser && /mac/i.test(navigator.platform);
// export const platform = hybirdPlatform || thirdPlatform || 'browser';
export const platform = isWin
  ? 'Windows'
  : isMac
    ? 'Mac'
    : isAndroid
      ? 'Android'
      : isIOS
        ? 'IOS'
        : null;
/* eslint-disable no-undef */
export const inMiniProgram = typeof global !== 'undefined' && !!global.__wcc_version__;
export const container = inHybird && 'App' || thirdPlatform || 'Browser';
export const OS = inBrowser && _platform.os;

// const os_guesses = [
//   'Windows Phone',
//   'Android',
//   'CentOS',
//   { 'label': 'Chrome OS', 'pattern': 'CrOS' },
//   'Debian',
//   'Fedora',
//   'FreeBSD',
//   'Gentoo',
//   'Haiku',
//   'Kubuntu',
//   'Linux Mint',
//   'OpenBSD',
//   'Red Hat',
//   'SuSE',
//   'Ubuntu',
//   'Xubuntu',
//   'Cygwin',
//   'Symbian OS',
//   'hpwOS',
//   'webOS ',
//   'webOS',
//   'Tablet OS',
//   'Tizen',
//   'Linux',
//   'Mac OS X',
//   'Macintosh',
//   'Mac',
//   'Windows 98;',
//   'Windows '
// ];
// export const OS = (() => {
//   function cleanupOS(os) {
//     os = String(os).replace(/ ce$/i, ' CE')
//       .replace(/\bhpw/i, 'web')
//       .replace(/\bMacintosh\b/, 'Mac OS')
//       .replace(/_PowerPC\b/i, ' OS')
//       .replace(/\b(OS X) [^ \d]+/i, '$1')
//       .replace(/\bMac (OS X)\b/, '$1')
//       .replace(/\/(\d)/, ' $1')
//       .replace(/_/g, '.')
//       .replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, '')
//       .replace(/\bx86\.64\b/gi, 'x86_64')
//       .replace(/\b(Windows Phone) OS\b/, '$1')
//       .replace(/\b(Chrome OS \w+) [\d.]+\b/, '$1')
//       .split(' on ')[0]

//     return os;
//   }

//   if (UA) {
//     return os_guesses.reduce((result, guess) => {
//       let pattern = guess.pattern || guess.replace(/([ -])(?!$)/g, '$1?');
//       if (!result && (result =
//         RegExp('\\b' + pattern + '(?:/[\\d.]+|[ \\w.]*)', 'i').exec(UA)
//       )) {
//         result = cleanupOS(result);
//       }
//       return result;
//     }, null);
//   }
// })();

// https://github.com/bestiejs/platform.js/blob/master/platform.js
// function qualify(string) {
//   return String(string).replace(/([ -])(?!$)/g, '$1?');
// }

// export const OS = (() => {
//   if (inBrowser) {
//     let name = [
//       'Adobe AIR',
//       'Arora',
//       'Avant Browser',
//       'Breach',
//       'Camino',
//       'Electron',
//       'Epiphany',
//       'Fennec',
//       'Flock',
//       'Galeon',
//       'GreenBrowser',
//       'iCab',
//       'Iceweasel',
//       'K-Meleon',
//       'Konqueror',
//       'Lunascape',
//       'Maxthon',
//       { 'label': 'Microsoft Edge', 'pattern': '(?:Edge|EdgA|EdgiOS)' },
//       'Midori',
//       'Nook Browser',
//       'PaleMoon',
//       'PhantomJS',
//       'Raven',
//       'Rekonq',
//       'RockMelt',
//       { 'label': 'Samsung Internet', 'pattern': 'SamsungBrowser' },
//       'SeaMonkey',
//       { 'label': 'Silk', 'pattern': '(?:Cloud9|Silk-Accelerated)' },
//       'Sleipnir',
//       'SlimBrowser',
//       { 'label': 'SRWare Iron', 'pattern': 'Iron' },
//       'Sunrise',
//       'Swiftfox',
//       'Waterfox',
//       'WebPositive',
//       'Opera Mini',
//       { 'label': 'Opera Mini', 'pattern': 'OPiOS' },
//       'Opera',
//       { 'label': 'Opera', 'pattern': 'OPR' },
//       'Chrome',
//       { 'label': 'Chrome Mobile', 'pattern': '(?:CriOS|CrMo)' },
//       { 'label': 'Firefox', 'pattern': '(?:Firefox|Minefield)' },
//       { 'label': 'Firefox for iOS', 'pattern': 'FxiOS' },
//       { 'label': 'IE', 'pattern': 'IEMobile' },
//       { 'label': 'IE', 'pattern': 'MSIE' },
//       'Safari'
//     ].reduce((result, guess) => {
//       return result || RegExp('\\b' + (
//         guess.pattern || qualify(guess)
//       ) + '\\b', 'i').exec(UA) && (guess.label || guess);
//     }, null);

//     return [
//       '(?:Cloud9|CriOS|CrMo|Edge|EdgA|EdgiOS|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))',
//       'Version',
//       qualify(name),
//       '(?:Firefox|Minefield|NetFront)'
//     ].reduce((result, pattern) => {
//       return result || (RegExp(pattern +
//         '(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)', 'i').exec(UA) || 0)[1] || null;
//     }, null);
//   }
// })();
