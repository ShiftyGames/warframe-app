import { WF_API, get } from "../utils.js";

export function get_wf_info(item) {
    return get(WF_API + "/items/search/" + encodeURIComponent(item) + "/");
}
