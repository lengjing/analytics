import { HIT_PAYLOAD } from "../hooks";
import { hookMap } from "../hook";

export default function buildHitTask(model, cb) {
  let data = {};

  hookMap.map(function (name, hook) {
    if (hook.paramName) {
      let val = model.get(name);
      // 所有拥有 paramName 且不为默认值的字段都会被上传
      if (undefined !== val && val !== hook.defaultValue) {
        data[hook.paramName] = val;
      }
    }
  });

  model.set(HIT_PAYLOAD, JSON.stringify([data]), true)
  cb();
}