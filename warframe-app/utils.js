export const WF_API = 'https://api.warframestat.us'

export const get = async (url, opts) => {
  try {
    return await fetch(url, opts).then((d) => d.json());
  } catch (ignored) {}
};

export function say_hello() {
    const user_id = localStorage.getItem("de_id")
    const user_name = get(WF_API + "/profile/" + user_id)["display_name"]
    document.getElementById("hello").innerHTML = "Hello User: " + user_id + " " + user_name
}

export function update_checkbox(id) {
    console.log("checkbox '" + id + "' is checked: " + document.getElementById(id).checked)
    localStorage.setItem(id, document.getElementById(id).checked)
}

export function update_value(id) {
    localStorage.setItem(id, document.getElementById(id).value)
}

export function update_part_data() {
    // TODO: pull this from the data/*.json
    const prime_ids = ['wisp_prime', 'ash_prime'];
    //const part_ids = ['wisp_prime_neuroptics', 'wisp_prime_chassis', 'wisp_prime_systems'];
    const part_ids = prime_ids.map(e => { return [e + '_neuroptics', e + '_chassis', e + '_systems']; }).flat()
    for (let part_id of part_ids) {
        let part = localStorage.getItem(part_id)
        if (part) {
            let val = part == "true";
            document.getElementById(part_id).checked = val;
            //console.log('Updating checkbox: ' + part_id + ' ' + val + ' ' + typeof(part));
        }
    }
}

export function get_wf_info(warframe) {
    return get(WF_API + "/items/search/" + encodeURIComponent(warframe)); //.then(function(val) { return val });
}

// Cletus clock
export function update_cetus_clock() {
    get(WF_API + '/PC/cetusCycle/').then(function(cetus_info) {
        var s = 'Cetus'
        console.log('cetus_info.isDay = ' + cetus_info.isDay)
        if (cetus_info.isDay == true) {
            s = s + '&#x1F31E;'; //'☀'
        } else {
            //s = s + '&#x1F31A;'; //'🌚'
            //s = s + '&#x1F31C;'; //'🌚'
            s = s + '&#x1F311;'; //'🌚'
        }
        s = s + ': ' + cetus_info.shortString
        document.getElementById("cletus").innerHTML = s
    },
        function(err) {console.log("error getting cetus info: " + err)
    })
}

//exports.get_wf_info = get_wf_info;

//export default get_wf_info;
