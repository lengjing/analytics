import { xhrPing, beaconPing, smartPing, wxPing } from "../ping";
import { TRANSPORT_URL, TRANSPORT, USE_BEACON, HIT_PAYLOAD, HIT_CALLBACK } from "../hooks";
import { noop, inMiniProgram } from "../util";

export default function sendHitTask(model, cb) {
  let api = model.get(TRANSPORT_URL);
  let transport = model.get(TRANSPORT);

  if (!transport && model.get(USE_BEACON)) {
    transport = 'beacon';
  }

  let hitPayload = model.get(HIT_PAYLOAD);
  let hitCb = model.get(HIT_CALLBACK) || noop;

  if (inMiniProgram) {
    wxPing(api, hitPayload, hitCb);
  } else {
    'xhr' === transport
      ? xhrPing(api, hitPayload, hitCb)
      : 'beacon' === transport
        ? beaconPing(api, hitPayload, hitCb)
        : smartPing(api, hitPayload, hitCb);
  }

  model.set(HIT_CALLBACK, noop, true);
  cb();
}