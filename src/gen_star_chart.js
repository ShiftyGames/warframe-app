import fs from 'fs';
import { get, WF_API } from './utils.js';

function name_to_id(name) {
    return name.toLowerCase().split(' ').join('_');
}

/////////
/// main
const sol_nodes = await get(WF_API + '/solNodes/');

var planets = {};
for (let key in sol_nodes) {
    if (key.startsWith('SolNode')) {
        const node = sol_nodes[key];
        //console.log('node:', node);
        const name_pair = node.value.split(' (');
        const node_name = name_pair[0];
        const planet_name = name_pair.pop().slice(0, -1);
        if (!(planet_name in planets)) {
            planets[planet_name] = [];
        }
        const node_id = name_to_id(planet_name) + '_' + name_to_id(node_name);
        planets[planet_name].push({
            name: node_name,
            id: node_id,
        });
    }
}
var sum = 0;
const planets_ = [
    "Earth",
    "Venus",
    "Mercury",
    "Mars",
    "Deimos",
    "Ceres",
    "Jupiter",
    "Saturn",
    "Neptune",
    "Uranus",
    "Pluto",
    "Mirand",
    "Eris",
    "Sedna",
    "Europa",
    "Zariman",
    "Duviri",
    "Void",
    "Kuva Fortress",
    "Caduceu",
    "Lua",
];
var data_star_chart = [];
for (let k of planets_) {
    console.log(k);
    data_star_chart.push({
        planet: k,
        id: name_to_id(k),
        nodes: planets[k],
    })
}
import yaml from 'js-yaml';
const yml_str = yaml.dump(data_star_chart);
fs.writeFileSync('_data/star_chart.yml', yml_str);
