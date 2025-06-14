import fs from 'fs';
import { get, WF_API } from './utils.js';
import { wfapi_items_by_uniqueName } from './wfapi/item-search.js';

/////////
/// main
const trader = await get(WF_API + '/PC/voidTrader/');

var data_void_trader = {
    id: trader.id,
    expiry: trader.expiry,
    location: trader.location,
    inventory: [],
};

const weapon_prefix = '/Lotus/StoreItems/Weapons';
const companion_mod_prefix = '/Lotus/StoreItems/Types/Sentinels/SentinelPrecepts';
const companion_prefix = '/Lotus/StoreItems/Types/Sentinels/';
const mod_prefix = '/Lotus/StoreItems/Upgrades/Mods';
const vehicle_prefix = '/Lotus/StoreItems/???';

for (let offer of trader['inventory']) {
    var offer_type = '';
    if (offer.uniqueName.startsWith(weapon_prefix)) {
        offer_type = 'weapon';
    } else if (offer.uniqueName.startsWith(companion_mod_prefix)) {
        offer_type = 'mod';
    } else if (offer.uniqueName.startsWith(companion_prefix)) {
        offer_type = 'companion';
    } else if (offer.uniqueName.startsWith(mod_prefix)) {
        offer_type = 'mod';
    }
    if (offer_type != '') {
        const item_uniqueName = offer.uniqueName.replace(
            '/Lotus/StoreItems',
            '/Lotus',
        );
        const item_matches = await wfapi_items_by_uniqueName(offer.uniqueName);
        var item = null;
        console.log('lookingfor: ' + item_uniqueName);
        for (let itm of item_matches) {
            console.log('  checking: ' + itm.uniqueName);
            if (itm.uniqueName == item_uniqueName) {
                item = itm;
            }
        }

        if (item == null) {
            console.log('probably a bug here');
            item = item_matches[0];
        }
        const data_offer = {
            item: item.name,
            id: item.name.toLowerCase().split(' ').join('_'),
            type: offer_type,
            ducats: offer.ducats,
            credits: offer.credits,
        };
        data_void_trader.inventory.push(data_offer);
    } else {
        console.log('skipping:', offer.uniqueName);
    }
}

import yaml from 'js-yaml';
// @type yaml.DumpOptions
var opts = {
    noArrayIndent: true,
};
const yml_str = '---\n' + yaml.dump(data_void_trader, opts);
fs.writeFileSync('_data/void_trader.yml', yml_str);
