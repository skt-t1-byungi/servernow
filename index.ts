export default servernow

export function servernow (url = '/', { ignoreCache = false, ignoreRange = 1000 } = {}) {
    const KEY = `servernow:${url}`

    if (!ignoreCache) {
        const str = sessionStorage.getItem(KEY)
        if (str) {
            const diff = Number(str)
            return Promise.resolve(Date.now() + (Math.abs(diff) > ignoreRange ? diff : 0))
        }
    }

    const start = Date.now()

    return fetch(url, { method: 'HEAD' }).then(resp => {
        const str = resp.headers.get('Date')
        if (!str) throw new Error(`There is no "Date" header in "${url}".`)

        const end = Date.now()
        const ret = Date.parse(str) + ~~((end - start) / 2)
        sessionStorage.setItem(KEY, String(ret - end))

        return ret
    })
}
