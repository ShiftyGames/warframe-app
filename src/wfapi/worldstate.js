import { WF_API, get } from "../utils.js";

export function wfapi_worldstate() {
    const data = get(WF_API + "/PC");
    return new WorldState(data);
}

export class WorldState {
    constructor(data) {
        self._data = data
        self.arbitration = data.arbitration;
    }
}
