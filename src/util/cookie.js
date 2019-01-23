export function getCookie(name) {
  let result = [];
  let cookies = document.cookie.split(';');
  let regex = new RegExp('^\\s*' + name + '=\\s*(.*?)\\s*$');

  for (let i = 0; i < cookies.length; i++) {
    let matched = cookies[i].match(regex);
    matched && result.push(matched[1]);
  }

  return result;
}

export function setCookie(name, value, path, domain, expires) {
  let cookieName = name + '=' + value + '; path=' + path + '; ';

  if (domain) {
    cookieName += 'domain=' + domain + ';';
  }

  if (expires) {
    cookieName += 'expires=' + (new Date(Date.now() + expires)).toGMTString() + '; ';
  }

  let oldCookie = document.cookie;

  document.cookie = cookieName;

  return document.cookie === oldCookie ? false : true;

}