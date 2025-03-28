import { WF_API, get } from "../utils.js";

export function wfapi_item(item, opts) {
    return get(WF_API + "/items/" + encodeURIComponent(item) + "/", opts);
}

export function wfapi_item_by_uniqueName(item_uniqueName, opts) {
    const item = item_uniqueName.split("/").pop();
    const end_of_url =  encodeURIComponent(item) + "/?by=uniqueName"
    return get(WF_API + "/items/" + end_of_url, opts);
}

export function wfapi_item_search(item, opts) {
    return get(WF_API + "/items/search/" + encodeURIComponent(item) + "/", opts);
}
