export default servernow

export function servernow (url = '/') {
    const KEY = `servernow:${url}`
    const diff = sessionStorage.getItem(KEY)

    if (diff) return Promise.resolve(Date.now() + Number(diff))

    const start = Date.now()

    return fetch(url, { method: 'HEAD' }).then(resp => {
        const val = resp.headers.get('Date')
        if (!val) throw new Error('There is no "Date" header in the response.')

        const now = Date.now()
        const serverTime = Date.parse(val) + ~~((now - start) / 2)
        sessionStorage.setItem(KEY, String(serverTime - now))

        return serverTime
    })
}
