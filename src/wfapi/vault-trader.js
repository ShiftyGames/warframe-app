import { WF_API, get } from '../utils.js';
import { WfItem } from '../wf_item.js';
import { wfapi_item_by_uniqueName } from './item-search.js';
import { wfapi_drop } from './drops.js';

/**
 * @typedef VarziaInventoryItem
 * @type {object}
 * @property
 * @property {string} uniqueName
 * @property {string} item
 * @property {Number} ducats
 * @property {string} credits
 */

/**
 * @typedef VarziaInfo
 * @type {object}
 * @property {string} id
 * @property {string} activation
 * @property {string} startString
 * @property {string} expiry
 * @property {boolean} active
 * @property {VarziaInventoryItem[]} inventory
 */

/**
 * @typedef VarziaRelicReward
 * @type {object}
 * @property {string} name
 * @property {Number} chance
 */

/**
 * @typedef VarziaRelicInfo
 * @type {object}
 * @property {string} name
 * @property {string} uniqueName
 * @property {VarziaRelicReward[]} rewards
 *
 */

//https://api.warframestat.us/PC/vaultTrader/
/**
 * @returns {Promise<VarziaInfo>}
 */
export function get_varzia_info() {
    return get(WF_API + '/PC/vaultTrader/');
}

export async function* gen_wf_items(vault_items) {
    for (const item of vault_items.inventory) {
        const uname = item.uniqueName;
        var wf_item = new WfItem(uname, item);
        await wf_item.init();
        yield item;
    }
}

/**
 * @param {VarziaInfo} varzia_info
 */
export async function extract_wf_items_from_variza_info(varzia_info) {
    var items = [];
    for (const item of varzia_info.inventory) {
        const uname = item.uniqueName;
        if (
            uname.startsWith('/Lotus/StoreItems/Weapons') ||
            uname.startsWith('/Lotus/StoreItems/Powersuits')
        ) {
            var wf_item = new WfItem(uname, item);
            await wf_item.init();
            items.push(wf_item);
        }
    }
    return items;
}

/**
 * @param {VarziaInfo} varzia_info
 */
export async function extract_relics_from_varzia_info(varzia_info) {
    /*** @type {VarziaRelicInfo[]} */
    var relics = [];
    const relic_prefix = '/Lotus/StoreItems/Types/Game/Projections';
    for (const item of varzia_info.inventory) {
        if (item.uniqueName.startsWith(relic_prefix)) {
            console.log('extract_relics_from_varzia_info: processing item -', item.item);
            const uname = item.uniqueName.split('/').pop();
            const relic_item_info = await wfapi_item_by_uniqueName(uname);
            const search_name = relic_item_info.name
                .split(' ')
                .slice(0, -1)
                .join(' ');
            /** @type {VarziaRelicReward[]} */
            var rewards = [];
            if (relic_item_info.rewards.length == 0) {
                console.log("extract_relics_from_varzia_info: getting drop data");
                const drop_info = await wfapi_drop(search_name);
                for (const drop of drop_info) {
                    const reward = {
                        name: drop.item.name,
                        chance: drop.chace,
                    };
                    if (!rewards.includes(reward)) {
                        rewards.push(reward);
                    }
                }
            } else {
                rewards = relic_item_info.rewards.map((reward) => {
                    return { name: reward.item.name, chance: reward.chance };
                });
            }
            relics.push({
                name: search_name,
                uniqueName: uname,
                rewards: rewards,
            });
        }
    }
    return relics;
}

export function build_prime_item_table(prime_items) {
    var html = '';
    for (let item of prime_items) {
        html += `
            <li>
                <div class="row">
                    <input id="toggle_li_${item.id}" type="checkbox">
                    <label for="toggle_li_${item.id}">
                        <span>+ ${item.name}</span>
                        <span>- ${item.name}</span>
                    </label>
                    <div class="list">
                        <ul>`;
        for (let part of item.parts) {
            html += `
                            <li>
                                <input type="checkbox"
                                       id="${item.id}_${part.toLowerCase()}"
                                       onclick="handle_onclick('${item.id}_${part.toLowerCase()}')">
                                <label for="${item.id}_${part.toLowerCase()}">${part}</label><br>
                            </li>`;
        }
        html += `
                        </ul>
                    </div>
                </div>
            </li>
        `;
    }
    document.getElementById('prime_resurgenceTasks').innerHTML += html;
    return prime_items;
}
