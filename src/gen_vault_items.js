import fs from 'fs';
import {
    get_varzia_info,
    extract_relics_from_varzia_info,
} from './wfapi/vault-trader.js';

///////
/// main
const varzia_info = await get_varzia_info();
const vault_relics = await extract_relics_from_varzia_info(varzia_info);
var vault_relics_info = [];
for (let relic of vault_relics) {
    var relics_rewards = [];
    console.log('relic =', relic.name, relic.uniqueName);
    for (let reward of relic.rewards) {
        if (!reward.item || !reward.item.name) {
            continue;
        }
        const reward_info = { chance: reward.chance, name: reward.item.name };
        relics_rewards.push(reward_info);
        console.log('    ', reward_info);
    }

    vault_relics_info.push({
        name: relic.name,
        rewards: relics_rewards,
    });
}
console.log(vault_relics_info);

import yaml from 'js-yaml';
const yml_str = yaml.dump(vault_relics_info);
fs.writeFileSync('_data/vault_relics.yml', yml_str);
