import { useState } from 'react'

const verdicts = [
  { value: 'good', label: 'Went well' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'bad', label: 'Did not go as planned' },
]

const statusLabels = {
  active: 'Deciding',
  decided: 'Decided',
  reviewed: 'Reviewed',
}

function getVerdictLabel(value) {
  const match = verdicts.find((verdict) => verdict.value === value)
  return match ? match.label : ''
}

function getToday() {
  return new Date().toLocaleDateString('en-CA')
}

function OutcomeCard({ decision, onUpdateDecision }) {
  const status = decision.status ?? 'active'
  const options = decision.options ?? []
  const isDue =
    status === 'decided' && decision.revisitOn && decision.revisitOn <= getToday()

  const [chosenOption, setChosenOption] = useState(decision.chosenOption ?? '')
  const [expectedResult, setExpectedResult] = useState(decision.expectedResult ?? '')
  const [actualResult, setActualResult] = useState(decision.actualResult ?? '')
  const [verdict, setVerdict] = useState(decision.verdict ?? 'good')

  function handleDecide(event) {
    event.preventDefault()

    const trimmedChoice = chosenOption.trim()
    if (trimmedChoice === '') return

    onUpdateDecision(decision.id, {
      status: 'decided',
      chosenOption: trimmedChoice,
      expectedResult: expectedResult.trim(),
      decidedAt: new Date().toISOString(),
    })
  }

  function handleReview(event) {
    event.preventDefault()

    onUpdateDecision(decision.id, {
      status: 'reviewed',
      actualResult: actualResult.trim(),
      verdict,
      reviewedAt: new Date().toISOString(),
    })
  }

  function handleReopen(previousStatus) {
    onUpdateDecision(decision.id, { status: previousStatus })
  }

  const verdictClass = decision.verdict ? `verdict-${decision.verdict}` : ''

  return (
    <article className="card outcome-card">
      <div className="outcome-header">
        <h3>{decision.title}</h3>
        <span className={`badge ${status === 'reviewed' ? verdictClass : ''}`}>
          {status === 'reviewed'
            ? getVerdictLabel(decision.verdict)
            : statusLabels[status]}
        </span>
      </div>

      {status === 'active' && (
        <form onSubmit={handleDecide}>
          <div className="form-field">
            <label htmlFor={`chosen-${decision.id}`}>What did you choose?</label>
            <input
              id={`chosen-${decision.id}`}
              type="text"
              list={`options-${decision.id}`}
              value={chosenOption}
              placeholder="Pick one of your options or type your own"
              onChange={(event) => setChosenOption(event.target.value)}
            />
            <datalist id={`options-${decision.id}`}>
              {options.map((option) => (
                <option key={option.id} value={option.name} />
              ))}
            </datalist>
          </div>

          <div className="form-field">
            <label htmlFor={`expected-${decision.id}`}>
              What do you expect to happen?
            </label>
            <textarea
              id={`expected-${decision.id}`}
              rows="3"
              value={expectedResult}
              placeholder="Be specific, so you can check it later"
              onChange={(event) => setExpectedResult(event.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="button">
            Mark as decided
          </button>
        </form>
      )}

      {status !== 'active' && (
        <dl className="outcome-summary">
          <dt>You chose</dt>
          <dd>{decision.chosenOption}</dd>

          {decision.expectedResult && (
            <>
              <dt>You expected</dt>
              <dd>{decision.expectedResult}</dd>
            </>
          )}

          {decision.revisitOn && (
            <>
              <dt>Look back on</dt>
              <dd>
                {decision.revisitOn}
                {isDue && <span className="badge due">Time to look back</span>}
              </dd>
            </>
          )}

          {status === 'reviewed' && (
            <>
              <dt>What actually happened</dt>
              <dd>{decision.actualResult || 'No details written.'}</dd>
            </>
          )}
        </dl>
      )}

      {status === 'decided' && (
        <form onSubmit={handleReview}>
          <div className="form-field">
            <label htmlFor={`actual-${decision.id}`}>What actually happened?</label>
            <textarea
              id={`actual-${decision.id}`}
              rows="3"
              value={actualResult}
              placeholder="Compare it with what you expected"
              onChange={(event) => setActualResult(event.target.value)}
            ></textarea>
          </div>

          <div className="form-field">
            <label htmlFor={`verdict-${decision.id}`}>How did it turn out?</label>
            <select
              id={`verdict-${decision.id}`}
              value={verdict}
              onChange={(event) => setVerdict(event.target.value)}
            >
              {verdicts.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          <div className="matrix-actions">
            <button type="submit" className="button">
              Save review
            </button>
            <button
              type="button"
              className="button secondary"
              onClick={() => handleReopen('active')}
            >
              Change my choice
            </button>
          </div>
        </form>
      )}

      {status === 'reviewed' && (
        <div className="matrix-actions">
          <button
            type="button"
            className="button secondary"
            onClick={() => handleReopen('decided')}
          >
            Edit review
          </button>
        </div>
      )}
    </article>
  )
}

export default OutcomeCard