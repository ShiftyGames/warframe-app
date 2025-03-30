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
