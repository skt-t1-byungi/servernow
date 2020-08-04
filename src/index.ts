export default servernow

export function servernow ({ url = '/', cache = true, margin = 1000, offset: returnOffset = false } = {}) {
    const KEY = `servernow:${url}`

    function process (offset: number) {
        return (offset > margin ? offset : 0) + (returnOffset ? 0 : Date.now())
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
        const ret = Date.parse(str) + ~~((end - start) / 2)
        const offset = ret - end

        sessionStorage.setItem(KEY, String(offset))

        return process(offset)
    })
}
