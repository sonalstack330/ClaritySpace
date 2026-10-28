import { describe, it, expect } from 'vitest'
import { getReversibilityAdvice } from './reversibility'

describe('getReversibilityAdvice', () => {
  it('treats levels 1 and 2 as easy to reverse', () => {
    expect(getReversibilityAdvice(1).key).toBe('easy')
    expect(getReversibilityAdvice(2).key).toBe('easy')
  })

  it('treats level 3 as moderate', () => {
    expect(getReversibilityAdvice(3).key).toBe('moderate')
  })

  it('treats levels 4 and 5 as hard to reverse', () => {
    expect(getReversibilityAdvice(4).key).toBe('hard')
    expect(getReversibilityAdvice(5).key).toBe('hard')
  })

  it('returns null when no level was saved', () => {
    expect(getReversibilityAdvice(undefined)).toBeNull()
    expect(getReversibilityAdvice(null)).toBeNull()
  })
})