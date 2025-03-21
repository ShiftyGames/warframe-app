import { WF_API, get } from "../utils.js";

export function wfapi_drop(item, opts) {
    return get(WF_API + "/drops/search/" + encodeURIComponent(item) + "/", opts);
}
