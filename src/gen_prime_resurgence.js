import fs from 'fs';
import {
    get_varzia_info,
    extract_wf_items_from_variza_info,
    extract_relics_from_varzia_info,
} from './wfapi/vault-trader.js';
import { _memoize } from './memoize.js';

/////////
/// main
const varzia_info = await get_varzia_info();
const varzia_wfitems = await extract_wf_items_from_variza_info(varzia_info);

const varzia_relics = await extract_relics_from_varzia_info(varzia_info);

const rarity = {
    [2]: 'rare',
    [11]: 'uncommon',
    [25.33]: 'common',
}

var data_prime_resurgence = [];
for (let item of varzia_wfitems) {
    const data_parts = item.parts.map((p) => {
        let part_id = item.id + '_' + p.name.toLowerCase()
        console.log(p);
        if (p.count > 1 && p.id > 0) {
            part_id += (p.id + 1);
            console.log('new part_id:', part_id);
        }
        return {
            part_type: p.name,
            id: part_id,
            relic: (function (part_name) {
                for (let relic of varzia_relics) {
                    for (let reward of relic.rewards) {
                        if (reward.name === part_name) {
                            return {
                                name: relic.name,
                                id: 'todo',
                                reward_chance: reward.chance,
                                rarity: rarity[reward.chance],
                            };
                        }
                        if (reward.name === part_name + ' Blueprint') {
                            return {
                                name: relic.name,
                                id: 'todo',
                                reward_chance: reward.chance,
                                rarity: rarity[reward.chance],
                            };
                        }
                    }
                }
            })(item.name + ' ' + p.name),
        };
    });

    var item_info = {
        uniqueName: item.uniqueName,
        name: item.name,
        id: item.id,
        parts: data_parts,
        varzia_info: item.varzia_info,
    };
    data_prime_resurgence.push(item_info);
}

import yaml from 'js-yaml';
const yml_str = yaml.dump(data_prime_resurgence);
fs.writeFileSync('_data/prime_resurgence.yml', yml_str);
