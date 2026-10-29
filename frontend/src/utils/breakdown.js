import { calculateScores } from './scoring'

export const STRONG_IMPACT = 6
export const CLOSE_CALL_GAP = 5

function getKind(winnerRating, runnerUpRating, impact) {
  if (winnerRating === 0 || runnerUpRating === 0) {
    return 'unrated'
  }

  if (impact === 0) {
    return 'even'
  }

  const size = Math.abs(impact) >= STRONG_IMPACT ? 'strong-' : ''
  return impact > 0 ? `${size}advantage` : `${size}weakness`
}

export function explainResult(options, criteria, ratings) {
  if (options.length < 2) {
    return { hasComparison: false, reason: 'need-two-options' }
  }

  const ranked = calculateScores(options, criteria, ratings).sort(
    (a, b) => b.total - a.total
  )
  const [winner, runnerUp] = ranked

  if (winner.total === 0) {
    return { hasComparison: false, reason: 'not-rated' }
  }

  const factors = criteria
    .map((criterion) => {
      const winnerRating = ratings[winner.id]?.[criterion.id] ?? 0
      const runnerUpRating = ratings[runnerUp.id]?.[criterion.id] ?? 0
      const impact = (winnerRating - runnerUpRating) * criterion.weight

      return {
        criterionId: criterion.id,
        name: criterion.name,
        weight: criterion.weight,
        winnerRating,
        runnerUpRating,
        impact,
        kind: getKind(winnerRating, runnerUpRating, impact),
      }
    })
    .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))

  const gap = winner.percent - runnerUp.percent

  return {
    hasComparison: true,
    winner,
    runnerUp,
    gap,
    isTie: winner.total === runnerUp.total,
    closeCall: gap < CLOSE_CALL_GAP,
    factors,
  }
}