import fs from 'fs';
import { get, WF_API } from './utils.js';

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
const companion_prefix = '/Lotus/StoreItems/Types/Sentinels';
const mod_prefix = '/Lotus/StoreItems/Upgrades/Mods';
const vehicle_prefix = '/Lotus/StoreItems/???';

for (let offer of trader['inventory']) {
    var offer_type = '';
    if (offer.uniqueName.startsWith(weapon_prefix)) {
        offer_type = 'weapon';
    } else if (offer.uniqueName.startsWith(companion_prefix)) {
        offer_type = 'companion';
    } else if (offer.uniqueName.startsWith(mod_prefix)) {
        offer_type = 'mod';
    }
    if (offer_type != '') {
        const data_offer = {
            item: offer.item,
            id: offer.item.toLowerCase().split(' ').join('_'),
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
