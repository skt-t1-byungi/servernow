export default servernow

export function servernow (url = '/', opts: {ignoreCache?: boolean} = {}) {
    const KEY = `servernow:${url}`

    if (!opts.ignoreCache) {
        const diff = sessionStorage.getItem(KEY)
        if (diff) return Promise.resolve(Date.now() + Number(diff))
    }

    const start = Date.now()

    return fetch(url, { method: 'HEAD' }).then(resp => {
        const str = resp.headers.get('Date')
        if (!str) throw new Error(`There is no "Date" header in "${url}" response.`)

        const now = Date.now()
        const serverTime = Date.parse(str) + ~~((now - start) / 2)
        sessionStorage.setItem(KEY, String(serverTime - now))

        return serverTime
    })
}
