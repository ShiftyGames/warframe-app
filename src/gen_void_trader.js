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
    const data_offer = {
        // uniqueName: void_trader.uniqueName,
        id: trader.id + "_" + offer.item.toLowerCase().split(' ').join('_'),
        item: offer.item,
        ducats: offer.ducats,
        credits: offer.credits,
    };
    data_void_trader.inventory.push(data_offer);
}

import yaml from 'js-yaml';
// @type yaml.DumpOptions
var opts = {
    noArrayIndent: true,
};
const yml_str = '---\n' + yaml.dump(data_void_trader, opts);
fs.writeFileSync('_data/void_trader.yml', yml_str);
