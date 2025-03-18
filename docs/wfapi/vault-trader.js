import { WF_API, get } from "../utils.js";
import { WfItem } from "../wf_item.js";

//https://api.warframestat.us/PC/vaultTrader/
export function get_vault_info() {
    return get(WF_API + "/PC/vaultTrader/");
}

export async function* gen_wf_items(vault_items) {
    for (const item of vault_items.inventory) {
        const uname = item.uniqueName;
        var wf_item = new WfItem(uname, item);
        await wf_item.init()
        yield item;
    }
}

export async function extract_wf_items_from_vault(vault) {
    var items = [];
    for (const item of vault.inventory) {
        const uname = item.uniqueName;
        if (uname.startsWith('/Lotus/StoreItems/Weapons') ||
            uname.startsWith('/Lotus/StoreItems/Powersuits')
        ) {
            var wf_item = new WfItem(uname, item);
            await wf_item.init()
            items.push(wf_item);
        }
    }
    return items;
}

export function build_prime_item_table(prime_items) {
    var html = ''
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
                        <ul>`
        for (let part of item.parts) {
            html += `
                            <li>
                                <input type="checkbox"
                                       id="${item.id}_${part.toLowerCase()}"
                                       onclick="handle_onclick('${item.id}_${part.toLowerCase()}')">
                                <label for="${item.id}_${part.toLowerCase()}">${part}</label><br>
                            </li>`
        }
        html += `
                        </ul>
                    </div>
                </div>
            </li>
        `
    }
    document.getElementById("prime_resurgenceTasks").innerHTML += html
    return prime_items;
}
