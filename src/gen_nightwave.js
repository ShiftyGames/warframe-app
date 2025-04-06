import fs from 'fs';
import { get, WF_API } from './utils.js';

/////////
/// main
const nightwave = await get(WF_API + '/PC/nightwave/');

var data_nightwave= [];
for (let challenge of nightwave['activeChallenges']) {
    if (challenge.isDaily) {
        // daily challenge
        data_nightwave.push(challenge);
    }
    else {
        // weekly challenge
        data_nightwave.push(challenge);
    }
}

import yaml from 'js-yaml';
const yml_str = yaml.dump(data_nightwave);
fs.writeFileSync('_data/nightwave.yml', yml_str);
