import { setStorage, getStorage } from "../util/storage";
import { COOKIE_NAME, STORAGE, CLIENT_ID } from "../hooks";
import { inBrowser } from "../util";

let storageSetted = false;

export default function checkStorageTask(model, cb) {
  if (model.get(STORAGE) !== 'localStorage' || storageSetted || !inBrowser) {
    return cb();
  }
  let storageName = model.get(COOKIE_NAME);
  let storageValue = getStorage(storageName);
  if (storageValue) {
    storageSetted = true;
    model.data.set(CLIENT_ID, storageValue);
  }

  if (!storageSetted) {
    setStorage(storageName, model.get(CLIENT_ID));
    cb();
  } else {
    cb();
  }

}
