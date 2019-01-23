export function addEventListener(el, event, cb, useCapture) {
  try {
    el.addEventListener
      ? el.addEventListener(event, cb, !!useCapture)
      : el.attachEvent && el.attachEvent('on' + event, cb)
  } catch (e) { }
}

export function removeEventListener(el, event, cb, useCapture) {
  try {
    el.removeEventListener
      ? el.removeEventListener(event, cb, !!useCapture)
      : el.detach && el.detach('on' + event, cb)
  } catch (e) { }
}

export function createImg(src) {
  var img = document.createElement('img');
  img.width = 1;
  img.height = 1;
  img.src = src;
  return img;
}