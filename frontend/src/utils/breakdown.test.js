import { describe, it, expect } from 'vitest'
import { explainResult } from './breakdown'

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

const twoOptions = [
  { id: 'a', name: 'A' },
  { id: 'b', name: 'B' },
]
const oneCriterion = [{ id: 'c', name: 'C', weight: 5 }]

describe('explainResult', () => {
  it('needs at least two options', () => {
    expect(explainResult([options[0]], criteria, ratings)).toEqual({
      hasComparison: false,
      reason: 'need-two-options',
    })
  })

  it('needs some ratings', () => {
    expect(explainResult(options, criteria, {})).toEqual({
      hasComparison: false,
      reason: 'not-rated',
    })
  })

  it('finds the winner, the runner-up and the gap', () => {
    const result = explainResult(options, criteria, ratings)

    expect(result.hasComparison).toBe(true)
    expect(result.winner.id).toBe('frontend')
    expect(result.runnerUp.id).toBe('java')
    expect(result.gap).toBe(4)
    expect(result.isTie).toBe(false)
    expect(result.closeCall).toBe(true)
  })

  it('orders the factors by size and they add up to the score difference', () => {
    const result = explainResult(options, criteria, ratings)

    expect(result.factors.map((f) => [f.criterionId, f.impact, f.kind])).toEqual([
      ['career', -5, 'weakness'],
      ['interest', 4, 'advantage'],
      ['timefit', 3, 'advantage'],
    ])

    const sum = result.factors.reduce((total, f) => total + f.impact, 0)
    expect(sum).toBe(result.winner.total - result.runnerUp.total)
  })

  it('marks a big difference as a strong advantage', () => {
    const result = explainResult(twoOptions, oneCriterion, {
      a: { c: 5 },
      b: { c: 2 },
    })

    expect(result.winner.id).toBe('a')
    expect(result.factors[0].impact).toBe(15)
    expect(result.factors[0].kind).toBe('strong-advantage')
    expect(result.closeCall).toBe(false)
  })

  it('detects a tie', () => {
    const result = explainResult(twoOptions, oneCriterion, {
      a: { c: 3 },
      b: { c: 3 },
    })

    expect(result.isTie).toBe(true)
    expect(result.gap).toBe(0)
    expect(result.factors[0].kind).toBe('even')
  })

  it('marks a missing rating as not rated', () => {
    const result = explainResult(twoOptions, oneCriterion, { a: { c: 4 } })

    expect(result.factors[0].kind).toBe('unrated')
  })
})