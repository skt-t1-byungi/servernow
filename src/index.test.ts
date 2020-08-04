import servernow from '.'

import 'jest-fetch-mock'

const expectInRange = (n: number, expected: number, range: number) => {
    expect(n).toBeGreaterThan(expected - range)
    expect(n).toBeLessThan(expected + range)
}

test('servernow', async () => {
    const fakeSeverTime = ~~(Date.now() / 1000) * 1000
    fetchMock.mockResponse('/', { headers: { Date: new Date(fakeSeverTime).toUTCString() } })

    expect(sessionStorage.getItem('servernow:/')).toBeNull()
    expectInRange(await servernow({ url: '/', margin: 0 }), fakeSeverTime, 10)
    expect(sessionStorage.getItem('servernow:/')).not.toBeNull()
})
