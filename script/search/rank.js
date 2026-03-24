#!/usr/bin/env node
// This module accepts a search record object as input and
// returns a ranking score which influences how results are sorted.

// higher in this list == higher search ranking
// anything NOT matched by this list gets the highest ranking
// a lower ranking means the record will have a higher priority
const rankings = Object.freeze(['/site-policy', '/graphql', '/rest'])
const defaultRanking = rankings.length

function normalizePath(url) {
  try {
    return new URL(url, 'https://docs.github.com').pathname.toLowerCase()
  } catch {
    return String(url).toLowerCase()
  }
}

export default function rank(record) {
  if (!record || typeof record.url !== 'string') return defaultRanking
  const normalizedPath = normalizePath(record.url)

  for (let index = 0; index < rankings.length; index++) {
    if (normalizedPath.includes(rankings[index])) return index
  }

  // Set the default ranking to the highest possible
  return defaultRanking
}
