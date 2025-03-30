import fs from 'fs';
import {
    get_varzia_info,
    extract_wf_items_from_variza_info,
    extract_relics_from_varzia_info,
} from './wfapi/vault-trader.js';
import { _memoize } from './memoize.js';

const m_get_varzia_info = _memoize('get_varzia_info', get_varzia_info);

const m_extract_wf_items_from_vault = _memoize(
    'extract_wf_items_from_vault',
    extract_wf_items_from_variza_info,
);

const m_extract_relics_from_vault = _memoize(
    'extract_relics_from_vault',
    extract_relics_from_varzia_info,
);

/////////
/// main
const varzia_info = await get_varzia_info();
const varzia_wfitems = await extract_wf_items_from_variza_info(varzia_info);

const varzia_relics = await extract_relics_from_varzia_info(varzia_info);
console.log('varzia_relics:');
for (let relic of varzia_relics) {
    console.log(relic);
}
//console.log('first wfitem:', varzia_wfitems[0]);

var data_prime_resurgence = [];
for (let item of varzia_wfitems) {
    const part_names = item.parts.map((p) => item.name + ' ' + p);
    //console.log('part_names:', part_names);
    //for (let relic of varzia_relics) {
    //    for (let reward of relic.rewards) {
    //        if (part_names.includes(reward.name)) {
    //            console.log('bingo!');
    //        }
    //    }
    //}

    const data_parts = item.parts.map((p) => {
        return {
            part_type: p,
            relic: (function (part_name) {
                for (let relic of varzia_relics) {
                    for (let reward of relic.rewards) {
                        if (reward.name === part_name) {
                            return {
                                name: relic.name,
                                id: 'todo',
                                reward_chance: reward.chance,
                            };
                        }
                        if (reward.name === part_name + ' Blueprint') {
                            return {
                                name: relic.name,
                                id: 'todo',
                                reward_chance: reward.chance,
                            };
                        }
                    }
                }
            })(item.name + ' ' + p),
        };
    });
    console.log(item.name);
    console.log('  data_parts:', data_parts);

    var item_info = {
        uniqueName: item.uniqueName,
        name: item.name,
        id: item.id,
        //parts: item.parts,
        parts: data_parts,
        varzia_info: item.varzia_info,
    };
    data_prime_resurgence.push(item_info);
}

import yaml from 'js-yaml';
const yml_str = yaml.dump(data_prime_resurgence);
fs.writeFileSync('_data/prime_resurgence.yml', yml_str);
