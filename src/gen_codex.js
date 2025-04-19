import fs from 'fs';
import { get, WF_API, filter } from './utils.js';

/////////
/// main
const warframes = await get(WF_API + '/warframes/');
const weapons = await get(WF_API + '/weapons/');

var data_codex = {
    warframes: [],
    weapons: [],
    vehicles: [],
};

const item_keys = [
    'name',
    'isPrime',
    'type',
    'uniqueName',
    'wikiaThumbnail',
    'components',
];

const component_keys = ['uniqueName', 'name', 'itemCount', 'imageName'];

for (let _item of warframes) {
    const item = filter(_item, item_keys);
    console.log(item.category, item.type, item.name, item.uniqueName);
    item.id = item.name.toLowerCase().split(' ').join('_');
    if (item.components) {
        const components = item.components;
        item.components = [];
        for (let _comp of components) {
            const comp = filter(_comp, component_keys);
            item.components.push(comp);
        }
    }
    if (item.type == 'Archwing') {
        data_codex.vehicles.push(item);
    } else {
        data_codex.warframes.push(item);
    }
}

for (let _item of weapons) {
    const item = filter(_item, item_keys);
    item.id = item.name.toLowerCase().split(' ').join('_');
    console.log(item.category, item.type, item.name, item.uniqueName);
    if (item.components) {
        const components = item.components;
        item.components = [];
        for (let _comp of components) {
            const comp = filter(_comp, component_keys);
            item.components.push(comp);
        }
    }
    data_codex.weapons.push(item);
}

import yaml from 'js-yaml';
/// @type yaml.DumpOptions
var opts = {
    noArrayIndent: true,
};
const yml_str = yaml.dump(data_codex, opts);
fs.writeFileSync('_data/codex.yml', yml_str);
