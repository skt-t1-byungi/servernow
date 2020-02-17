import servernow from '.'

import 'jest-fetch-mock'

const expectRange = (n: number, range: number) => {
    expect(n).toBeGreaterThan(n - range)
    expect(n).toBeLessThan(n + range)
}

test('test', async () => {
    const DIFF = 100000
    const SERVER_TIME = (~~(Date.now() / 1000) * 1000) + DIFF

    expect(sessionStorage.getItem('servernow:/')).toBeNull()
    fetchMock.mockResponse('', { headers: { Date: new Date(SERVER_TIME).toUTCString() } })
    expectRange(await servernow(), 1000)
    expectRange(Number(sessionStorage.getItem('servernow:/')), 1000)
})
