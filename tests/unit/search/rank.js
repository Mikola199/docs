import rank from '../../../script/search/rank.js'

test('search custom rankings', () => {
  const expectedRankings = [
    ['https://docs.github.com/en/github/actions', 3],
    ['https://docs.github.com/en/rest/reference', 2],
    ['https://docs.github.com/en/graphql', 1],
    ['https://docs.github.com/en/github/site-policy', 0],
  ]

  expectedRankings.forEach(([url, expectedRanking]) => {
    const expectationMessage = `expected ${url} to have a custom ranking of ${expectedRanking}`
    expect(rank({ url }), expectationMessage).toBe(expectedRanking)
  })
})

test('search ranking handles malformed records safely', () => {
  expect(rank()).toBe(3)
  expect(rank({})).toBe(3)
  expect(rank({ url: null })).toBe(3)
})

test('search ranking is case-insensitive', () => {
  expect(rank({ url: 'https://docs.github.com/en/GraphQL' })).toBe(1)
})

test('search ranking prefers higher-priority patterns when multiple match', () => {
  expect(rank({ url: 'https://docs.github.com/en/graphql/rest' })).toBe(1)
})

test('search ranking only uses URL pathname and ignores query string matches', () => {
  expect(rank({ url: 'https://docs.github.com/en/github/actions?query=graphql' })).toBe(3)
})

test('search ranking supports relative paths', () => {
  expect(rank({ url: '/en/graphql/overview' })).toBe(1)
})
