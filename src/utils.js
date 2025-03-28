export const WF_API = 'https://api.warframestat.us'

export const get = (url, opts) => {
    try {
        return fetch(url, opts).then((d) => d.json());
    } catch (ignored) { }
};
