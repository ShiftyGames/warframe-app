import { wfapi_item_by_uniqueName } from './wfapi/item-search.js';

export class WfItem {
    /**
     * @param {string} uniq_name
     * @param {VarziaInventoryItem} varzia_info
     */
    constructor(uniq_name, varzia_info) {
        /** @member {string} */
        this.uniqueName = uniq_name.split('/').pop();

        // html rendering data
        this.name = '';
        this.id = '';
        this.parts = [];

        // cached warframe api queries
        this.varzia_info = varzia_info;
        this.item_info = {};
    }

    async init() {
        this.item_info = await wfapi_item_by_uniqueName(this.uniqueName);
        this.name = this.item_info.name;
        //console.log('init [' + this.name + ']');
        this.id = this.name
            .split(' ')
            .map((w) => w.toLowerCase())
            .join('_');
        this.parts = WfItem.get_item_components(this.item_info);
    }

    static get_item_components(item_info) {
        const is_nonresource = (comp) => {
            return !(comp.hasOwnProperty('type') && comp.type == 'Resource');
        };
        return item_info.components
            .filter(is_nonresource)
            .map((comp) => [...Array(comp.itemCount)].map((_) => comp.name))
            .flat();
    }
}
