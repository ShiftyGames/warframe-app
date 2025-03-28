import fs from 'fs';
import {
    get_vault_info,
    extract_relics_from_vault,
} from './wfapi/vault-trader.js';

async function memoize(cache_name, f) {
    const cache_f = 'warframe-app/data/cache/' + cache_name + '.json';
    var data;
    if (fs.existsSync(cache_f)) {
        console.log('reading file:', cache_f);
        const contents = fs.readFileSync(cache_f);
        data = JSON.parse(contents);
    } else {
        data = await f();
        fs.writeFile(cache_f, JSON.stringify(data, null, 2), (write_err) => {
            if (write_err) throw write_err;
            console.log('file saved:', cache_f);
        });
    }
    return data;
}

function m_get_vault_info() {
    return memoize('get_vault_info', get_vault_info);
}

function m_extract_relics_from_vault(vault_data) {
    return memoize('extract_relics_from_vault', function () {
        return extract_relics_from_vault(vault_data);
    });
}

const vault_data = await m_get_vault_info();

const vault_relics = await m_extract_relics_from_vault(vault_data);
var vault_relics_info = [];
for (let relic of vault_relics) {
    var relics_rewards = [];
    console.log('relic =', relic.name, relic.uniqueName);
    for (let reward of relic.rewards) {
        if (!reward.item.name) {
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
