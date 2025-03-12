import {
    update_part_data,
    update_cetus_clock
} from './utils.js';
import {
    build_prime_item_table,
    build_prime_warframe_table,
    get_item_components,
    get_prime_resurgence_warframes,
    get_prime_resurgence_weapons,
    get_real_name,
} from './wfapi/vault-trader.js';
import {
    get_wf_info,
} from './wfapi/item-search.js';


if (typeof (Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    //console.log("web storage found");
} else {
    // Sorry! No Web Storage support..
    //console.log("Sorry! no web storage for you");
}

update_cetus_clock()

const frames = await get_prime_resurgence_warframes()
//build_prime_warframe_table(frames)
await build_prime_item_table(frames)

const weapons = await get_prime_resurgence_weapons()
await build_prime_item_table(weapons)

const gather_parts = async (item) => {
    const name = get_real_name(item.item);
    //console.log('name = ', name);
    const item_info_matches = await get_wf_info(name)
    const categories = ['Warframes','Melee', 'Primary', 'Secondary']
    const item_info = item_info_matches.filter(item => categories.find(x => x == item.category));
    ////console.log('num item_info = ', item_info.length)
    const prefix = name.split(' ').map(w => w.toLowerCase()).join('_')
    const parts = get_item_components(item_info[0])
    return parts.map(part => `${prefix}_${part.toLowerCase()}`)
}

const wf_part_ids = await Promise.all(frames.map(gather_parts));
const wp_part_ids = await Promise.all(weapons.map(gather_parts));
const part_ids = wf_part_ids.flat().concat(wp_part_ids.flat())
//console.log('part_ids = ', part_ids);
update_part_data(part_ids)
