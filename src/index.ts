export default servernow

export function servernow ({ url = location.href, cache = true, margin = 1000, offsetOnly = false } = {}) {
    const KEY = `servernow:${url}`

    function process (n: number) {
        return (Math.abs(n) > margin ? n : 0) + (offsetOnly ? 0 : Date.now())
    }

    if (cache) {
        const str = sessionStorage.getItem(KEY)
        if (str) return Promise.resolve(process(Number(str)))
    }

    const start = Date.now()

    return fetch(url, { method: 'HEAD' }).then(resp => {
        const str = resp.headers.get('Date')
        if (!str) throw new Error(`There is no "Date" header in "${url}".`)

        const end = Date.now()
        const offset = Date.parse(str) + ~~((end - start) / 2) - end

        sessionStorage.setItem(KEY, String(offset))

        return process(offset)
    })
}
