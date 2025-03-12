import { WF_API, get } from "/utils.js";
import { get_wf_info } from "/wfapi/item-search.js";

//https://api.warframestat.us/PC/vaultTrader/
export function get_vault_info() {
    return get(WF_API + "/PC/vaultTrader/");
}

export function get_prime_resurgence_weapons() {
    return get_vault_info().then(function(vault) {
        var weapons = [];
        for (const item of vault.inventory) {
            const uname = item.uniqueName;
            if (uname.startsWith('/Lotus/StoreItems/Weapons')) {
                weapons.push(item);
            }
        }
        return weapons;
    })
}

export function get_prime_resurgence_warframes() {
    return get_vault_info().then(function(vault) {
        var frames = [];
        for (const item of vault.inventory) {
            const uname = item.uniqueName;
            if (uname.startsWith('/Lotus/StoreItems/Powersuits')) {
                frames.push(item);
            }
        }
        return frames;
    })
}

export function build_prime_warframe_table(frames) {
    //console.log("building prime table")

    const prime_resurgence_primes = frames.map(function(frame) {
        const search_name = get_real_name(frame.item);
        return {
            name: search_name,
            id: frame.item.split(' ').map(w => w.toLowerCase()).join('_')
        }
    })

    var html = ''
    for (let item of prime_resurgence_primes) {
        html += `
            <li>
                <div class="row">
                    <input id="toggle_li_${item.id}" type="checkbox">
                    <label for="toggle_li_${item.id}">
                        <span>+ ${item.name}</span>
                        <span>- ${item.name}</span>
                    </label>
                    <div class="list">
                        <ul>
                            <li>
                                <input type="checkbox"
                                       id="${item.id}_neuroptics"
                                       onclick="handle_onclick('${item.id}_neuroptics')">
                                <label for="${item.id}_neuroptics">Neuroptics</label><br>
                            </li>
                            <li>
                                <input type="checkbox"
                                       id="${item.id}_chassis"
                                       onclick="handle_onclick('${item.id}_chassis')">
                                <label for="${item.id}_chassis">Chassis</label><br>
                            </li>
                            <li>
                                <input type="checkbox"
                                       id="${item.id}_systems"
                                       onclick="handle_onclick('${item.id}_systems')">
                                <label for="${item.id}_systems">Systems</label><br>
                            </li>
                        </ul>
                    </div>
                </div>
            </li>
        `
    }
    document.getElementById("prime_resurgence").innerHTML += html
}

export async function build_prime_item_table(weapons) {
    //console.log("building prime weapons table")

    const prime_resurgence_primes = await Promise.all(weapons.map(async function(weapon) {
        const search_name = get_real_name(weapon.item);
        //console.log('gathering results for ', search_name)
        const item_info_results = await get_wf_info(search_name);
        const categories = ['Warframes','Melee', 'Primary', 'Secondary']
        const item_info = item_info_results.filter(item => categories.find(x => x == item.category))[0];
        //const item_info = item_info_results[0];

        //console.log('results gathered for ', item_info.name)

        //console.log('item_info =', item_info);
        //console.log('components = ', item_info.components)
        return {
            name: search_name,
            id: weapon.item.split(' ').map(w => w.toLowerCase()).join('_'),
            parts: get_item_components(item_info), //.components.filter(comp => comp.type !== 'Resource').map(comp => comp.name),
        }
    }))
    //console.log('prime weapons =', prime_resurgence_primes); //.map(weapon => weapon.name))

    var html = ''
    for (let item of prime_resurgence_primes) {
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
    document.getElementById("prime_resurgence").innerHTML += html
}

export function get_item_components(item) {
    console.log(`get_item_components: (${item.name}) item =`, item)
    const is_resource = (comp) => {
        return comp.hasOwnProperty("type") && comp.type == 'Resource';
    };
    return item.components.filter(x => !is_resource(x))
                          .map(comp => [...Array(comp.itemCount)].map(x=>comp.name))
                          .flat();
}

export function get_real_name(name) {
    var real_name = name.split(' ');
    if (real_name[0] == 'Prime') {
        // 'Prime Glaive' -> 'Glaive Prime'
        real_name = real_name.slice(1).concat(real_name[0]);
    }
    real_name = real_name.join(' ');

    if (real_name == 'Kris Dagger Prime') {
        return 'Karyst Prime';
    }
    return real_name;
}
