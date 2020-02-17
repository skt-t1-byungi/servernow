import servernow from '.'

import 'jest-fetch-mock'

const expectRange = (n: number, toBe: number, range: number) => {
    expect(n).toBeGreaterThan(toBe - range)
    expect(n).toBeLessThan(toBe + range)
}

test('servernow', async () => {
    const DIFF = 100000
    const SERVER_TIME = (~~(Date.now() / 1000) * 1000) + DIFF

    expect(sessionStorage.getItem('servernow:/')).toBeNull()

    fetchMock.mockResponse('/', { headers: { Date: new Date(SERVER_TIME).toUTCString() } })

    expectRange(await servernow(), SERVER_TIME, 1000)
    expectRange(Number(sessionStorage.getItem('servernow:/')), DIFF, 1000)
})
