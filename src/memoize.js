import fs from 'fs';
import path from 'path';

const CACHE_LOC = '.cache/wfsp/';

export function _memoize(cache_name, f) {
    const m_f = async function (...args) {
        const cache_f = CACHE_LOC + cache_name + '.json';
        ensure_dir_exists(cache_f);
        var data;
        if (fs.existsSync(cache_f)) {
            console.log('reading file:', cache_f);
            const contents = fs.readFileSync(cache_f);
            data = JSON.parse(contents);
        } else {
            data = await f(...args);
            fs.writeFileSync(
                cache_f,
                JSON.stringify(data, null, 2),
                // (write_err) => {
                //     if (write_err) throw write_err;
                //     console.log('file saved:', cache_f);
                // },
            );
            console.log('file saved:', cache_f);
        }
        return data;
    };
    return m_f;
}

function ensure_dir_exists(filename) {
    const dirname = path.dirname(filename);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}
