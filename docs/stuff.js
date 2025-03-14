import {
    update_part_data,
    update_cetus_clock
} from './utils.js';
import {
    build_prime_item_table,
    get_vault_info,
    extract_wf_items_from_vault,
} from './wfapi/vault-trader.js';


//if (typeof (Storage) !== "undefined") {
//    // Code for localStorage/sessionStorage.
//    console.log("web storage found");
//} else {
//    // Sorry! No Web Storage support..
//    console.log("Sorry! no web storage for you");
//}

update_cetus_clock()

const items_to_part_ids = (wf_items) => {
    return wf_items.map(
        item =>
            item.parts.map(part =>
                `${item.id}_${part.toLowerCase()}`
            )
    ).flat();
}

get_vault_info()
    .then(extract_wf_items_from_vault)
    .then(build_prime_item_table)
    .then(items_to_part_ids)
    .then(update_part_data)
