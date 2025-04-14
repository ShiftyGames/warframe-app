import fs from 'fs';
import { get, WF_API } from './utils.js';

/////////
/// main
const weekly = [];//await get(WF_API + '/PC/???/');

var data_weekly= [];
for (let challenge of weekly) {
    if (challenge.isDaily) {
        // daily challenge
        data_weekly.push(challenge);
    }
    else {
        // weekly challenge
        data_weekly.push(challenge);
    }
}

import yaml from 'js-yaml';
const yml_str = yaml.dump(data_weekly);
//fs.writeFileSync('_data/weekly.yml', yml_str);
