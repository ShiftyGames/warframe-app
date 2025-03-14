export const WF_API = 'https://api.warframestat.us'

export const get = (url, opts) => {
    try {
        return fetch(url, opts).then((d) => d.json());
    } catch (ignored) { }
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

export function update_part_data(part_ids) {
    for (let part_id of part_ids) {
        let part = localStorage.getItem(part_id)
        if (part) {
            let val = part == "true";
            document.getElementById(part_id).checked = val;
            //console.log('Updating checkbox: ' + part_id + ' ' + val + ' ' + typeof(part));
        }
    }
}

function cetus_short_string(cetus_info) {
    // '1h 34m to Night'
    const expiry = new Date(cetus_info.expiry)
    const now = new Date();
    var minutes_until = Math.floor((expiry - now) / (60 * 1000))
    var s = ''
    if (minutes_until > 60) {
        s += '1h '
        minutes_until -= 60
    }
    s += `${minutes_until}m to `
    s += cetus_info.isDay ? 'Day' : 'Night';
    return s
}

// Cletus clock
export function update_cetus_clock() {
    get(WF_API + '/PC/cetusCycle/').then(
        function(cetus_info) {
            var s = 'Cetus'
            if (cetus_info.isDay == true) {
                s += '&#x1F31E;'; //'☀'
            } else {
                s += '&#x1F311;'; //'🌑'
            }
            // the cetusCycle page gets cached sometimes
            s = s + ': ' + cetus_short_string(cetus_info);
            document.getElementById("cletus").innerHTML = s

            const now = new Date();
            const SECONDS_TO_MS = 1000;
            const ONE_MINUTE = 60 * SECONDS_TO_MS;
            let delta_ms = ONE_MINUTE - ((now.getSeconds() * SECONDS_TO_MS) + now.getMilliseconds());
            //setTimeout(update_cetus_clock, delta_ms);
        },
        function(err) {
            console.log("error getting cetus info: " + err)
        })

    //setTimeout(update_cetus_clock, 990)
}
