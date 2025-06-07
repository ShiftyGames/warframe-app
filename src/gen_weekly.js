import fs from 'fs';
import { get, WF_API } from './utils.js';

/**
 * @param {Date} d
 * @returns number
 */
function getWeek(d) {
    var date = new Date(d || new Date());
    date.setUTCHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    // January 4 is always in week 1.
    var week1 = new Date(date.getFullYear(), 0, 4);
    // Adjust to Thursday in week 1 and count number of weeks from date to week1.
    return (
        1 +
        Math.round(
            ((date.getTime() - week1.getTime()) / 86400000 -
                3 +
                ((week1.getDay() + 6) % 7)) /
                7,
        )
    );
}

/**
 * @param {Date} d
 * @returns number
 */
function getYear(d) {
    var date = new Date(d || new Date());
    date.setUTCHours(0, 0, 0, 0);
    // Thursday in current week decides the year.
    date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
    return date.getFullYear();
}

console.assert(
    getWeek(Date.UTC(2025, 0, 4)) == 1, // January 1st is always in the 1st week
    getWeek(Date.UTC(2025, 0, 4)),
);
console.assert(
    getWeek(Date.UTC(2025, 5, 6)) == 23, //June 6, 2025 is the 23rd week
    getWeek(Date.UTC(2025, 5, 6)),
);
console.assert(getWeek() == 23, getWeek());
console.assert(getYear() == 2025, getYear());

var recurring_weeklies = [
    {
        name: 'Sunday after 6pm',
        id: 'sunday',
        subtasks: [
            {
                name: 'Iron Wake: Buy Kuva for 10x Riven Sliver',
                id: 'weekly_ironwake_kuva',
            },
            {
                name: 'Iron Wake: 2x Buy Riven Mod for 10x Riven Sliver',
                id: 'weekly_ironwake_riven',
            },
            {
                name: 'Chrysalith::Yonta: Buy 35,000x Kuva for 5x Voidplume Pinion',
                id: 'weekly_yonta_kuva',
            },
            {
                name: "Dormizone::Acrithis: Check the shop to see what's worth buying this week. Might have Orokin Catalyst/Reactor, Exilus Adapters, Arcane Adapters, Forma, Riven Mods, and Kuva. Plan to collect the Pathos Clamps for your list.",
                id: 'weekly_acrithis',
            },
            {
                name: 'Conclave::Teshin: Buy 10,000x Kuva for 15x Steel Essence (every 8 weeks, get the 50k kuva for 15 steel essence)',
                id: 'weekly_teshin_kuva',
            },
            {
                name: 'Conclave::Teshin: Buy Veiled Riven Cipher for 20x Steel Essence',
                id: 'weekly_teshin_veiled_riven_cipher',
            },
            {
                name: 'Sanctum Anatomica::Bird 3: Buy 1x Archon Shard for 30k Standing',
                id: 'weekly_bird3_archon_shard',
            },
            {
                name: 'Maroo: Ayatan Treasure Hunt',
                id: 'weekly_maroo_ayatan_treasure_hunt',
            },
        ],
    },
    {
        name: 'Monday',
        id: 'monday',
        subtasks: [
            {
                name: 'Complete the Hex Calendar',
                id: 'weekly_hex_calendar',
            },
        ],
    },
    {
        name: 'Wednesday',
        id: 'wednesday',
        subtasks: [
            {
                name: 'Complete the Steel Path Duviri Circuit',
                id: 'weekly_steel_path_circuit',
            },
        ],
    },
    {
        name: 'Thursday',
        id: 'thursday',
        subtasks: [
            {
                name: 'Archon Hunt',
                id: 'weekly_archon_hunt',
            },
            {
                name: 'Sanctum Anatomica::Tagfer: 5x Netracell Runs',
                id: 'weekly_netracells',
            },
            {
                name: 'Sanctum Anatomica::Necraloid: Deep Archimedea',
                id: 'weekly_deep_archimedea',
            },
        ],
    },
    {
        name: 'Friday',
        id: 'friday',
        subtasks: [
            {
                name: 'Complete the Duviri Circuit',
                id: 'weekly_ciruit',
            },
        ],
    },
    // # Saturday
    // #- name: "Dojo: Buy 14x Mutagen Mass blueprints"
    // #- name: "Dojo: Buy 14x Fieldron blueprints"
    // #- name: "Dojo: Buy 14x Detonite Injector blueprints"
];

/////////
/// main
const id_tag = getYear().toString() + 'w' + getWeek().toString();
// console.log('week =', id_tag);

// Patch the IDs so that they are unique each week
for (let day of recurring_weeklies) {
    day.id = day.id + '_' + id_tag;
    for (let task of day.subtasks) {
        task.id = task.id + '_' + id_tag;
    }
}

// console.log(recurring_weeklies[1]);

const weekly = []; //await get(WF_API + '/PC/???/');

var data_weekly = [];
for (let challenge of weekly) {
    if (challenge.isDaily) {
        // daily challenge
        data_weekly.push(challenge);
    } else {
        // weekly challenge
        data_weekly.push(challenge);
    }
}

for (let task of recurring_weeklies) {
    data_weekly.push(task);
}

import yaml from 'js-yaml';
const yml_str = yaml.dump(data_weekly);
fs.writeFileSync('_data/weekly.yml', yml_str);
