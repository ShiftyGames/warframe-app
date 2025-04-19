import { _memoize } from './memoize.js';

export const WF_API = 'https://api.warframestat.us';

/***
 * @returns {Promise<any>}
 */
const _get = (url, opts) => {
    try {
        return fetch(url, opts).then((d) => d.json());
    } catch (ignored) {}
};

const m_get = (url, opts) => {
    // TODO
    const file_loc = url
        .replace('//', '/')
        .replaceAll(':', '')
        .replaceAll('%', '_')
        .replaceAll('?', '')
        .replaceAll('=', '_');
    return _memoize('get/' + file_loc, function () {
        return _get(url, opts);
    })();
};

export const get = m_get;

export function filter_out(obj, keys) {
    return Object.keys(obj).reduce((acc, key) => {
        if (!keys.includes(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}

export function filter(obj, keys) {
    return Object.keys(obj).reduce((acc, key) => {
        if (keys.includes(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}
