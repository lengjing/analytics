export function getStorage(name) {
  return window.localStorage.getItem(name);
}

export function setStorage(name, value) {
  window.localStorage.setItem(name, value);
}
