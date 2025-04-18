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
for (let offer of trader['inventory']) {
    if (
        offer.uniqueName.startsWith('/Lotus/StoreItems/Weapons') ||
        offer.uniqueName.startsWith('/Lotus/StoreItems/Types/Sentinels') ||
        offer.uniqueName.startsWith('/Lotus/StoreItems/Upgrades/Mods')
    ) {
        const data_offer = {
            id: trader.id + '_' + offer.item.toLowerCase().split(' ').join('_'),
            item: offer.item,
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
