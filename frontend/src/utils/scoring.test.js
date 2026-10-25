import { describe, it, expect } from 'vitest'
import { calculateScores } from './scoring'

const options = [
  { id: 'java', name: 'Learn Java and Spring Boot' },
  { id: 'frontend', name: 'Learn frontend development' },
  { id: 'aptitude', name: 'Prepare for aptitude and interviews' },
]

const criteria = [
  { id: 'career', name: 'Career relevance', weight: 5 },
  { id: 'interest', name: 'Personal interest', weight: 4 },
  { id: 'timefit', name: 'Time fit', weight: 3 },
]

const ratings = {
  java: { career: 5, interest: 4, timefit: 3 },
  frontend: { career: 4, interest: 5, timefit: 4 },
  aptitude: { career: 4, interest: 3, timefit: 4 },
}

describe('calculateScores', () => {
  it('calculates weighted totals and percentages', () => {
    const results = calculateScores(options, criteria, ratings)

    expect(results[0]).toMatchObject({ id: 'java', total: 50, percent: 83 })
    expect(results[1]).toMatchObject({ id: 'frontend', total: 52, percent: 87 })
    expect(results[2]).toMatchObject({ id: 'aptitude', total: 44, percent: 73 })
  })

  it('returns 0 when there are no criteria', () => {
    const results = calculateScores(options, [], ratings)

    expect(results[0].total).toBe(0)
    expect(results[0].percent).toBe(0)
  })

  it('treats a missing rating as 0', () => {
    const twoCriteria = [
      { id: 'a', name: 'A', weight: 5 },
      { id: 'b', name: 'B', weight: 5 },
    ]
    const partial = { java: { a: 5 } }

    const results = calculateScores([options[0]], twoCriteria, partial)

    expect(results[0].total).toBe(25)
    expect(results[0].percent).toBe(50)
  })

  it('returns an empty list when there are no options', () => {
    expect(calculateScores([], criteria, ratings)).toEqual([])
  })
})