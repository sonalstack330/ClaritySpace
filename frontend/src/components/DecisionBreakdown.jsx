import { explainResult } from '../utils/breakdown'

const kindLabels = {
  'strong-advantage': 'Strong advantage',
  'advantage': 'Advantage',
  'even': 'Even',
  'weakness': 'Weakness',
  'strong-weakness': 'Strong weakness',
  'unrated': 'Not rated',
}

const hints = {
  'need-two-options': 'Add at least two options to see how they compare.',
  'not-rated': 'Rate your options to see why one comes out ahead.',
}

function nameOf(item) {
  return item.name || 'Untitled'
}

function showRating(rating) {
  return rating === 0 ? 'not rated' : rating
}

function DecisionBreakdown({ options, criteria, ratings }) {
  const breakdown = explainResult(options, criteria, ratings)

  if (!breakdown.hasComparison) {
    return (
      <section className="card breakdown">
        <h3>Why this result?</h3>
        <p className="empty-note">{hints[breakdown.reason]}</p>
      </section>
    )
  }

  const { winner, runnerUp, gap, isTie, closeCall, factors } = breakdown
  const winnerName = nameOf(winner)
  const runnerUpName = nameOf(runnerUp)

  return (
    <section className="card breakdown">
      <h3>{isTie ? 'Why it is a tie' : `Why ${winnerName} is ahead`}</h3>

      <p>
        {isTie
          ? `${winnerName} and ${runnerUpName} both score ${winner.percent}%.`
          : `${winnerName} scores ${winner.percent}% and ${runnerUpName} scores ${runnerUp.percent}%, ahead by ${gap} percentage points.`}
      </p>

      {closeCall && !isTie && (
        <p className="advice advice-moderate">
          <strong>This is a close call.</strong> A small change in your ratings
          or importance settings could change the result.
        </p>
      )}

      <h4 className="breakdown-subtitle">
        {isTie ? 'Where the top two differ' : `${winnerName} compared with ${runnerUpName}`}
      </h4>

      <ul className="factor-list">
        {factors.map((factor) => (
          <li key={factor.criterionId} className="factor-item">
            <span className={`badge kind-${factor.kind}`}>
              {kindLabels[factor.kind]}
            </span>
            <div>
              <strong>{factor.name || 'Untitled criterion'}</strong>
              <p className="factor-detail">
                {winnerName}: {showRating(factor.winnerRating)} · {runnerUpName}:{' '}
                {showRating(factor.runnerUpRating)} · importance {factor.weight}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default DecisionBreakdown