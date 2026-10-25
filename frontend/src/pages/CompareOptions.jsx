import { calculateScores } from '../utils/scoring'
import AssumptionsLog from '../components/AssumptionsLog'

const starterOptions = [
  { id: 'option-a', name: 'Option A' },
  { id: 'option-b', name: 'Option B' },
]

const starterCriteria = [{ id: 'criterion-1', name: 'Criterion 1', weight: 3 }]

const starterRatings = {}

function CompareOptions({
  decisions,
  selectedDecisionId,
  onSelectDecision,
  onUpdateDecision,
  onNavigate,
}) {
  const decision = decisions.find((item) => item.id === selectedDecisionId)

  if (decisions.length === 0) {
    return (
      <>
        <header className="page-header">
          <h2>Compare Options</h2>
          <p>Rate your options against what matters to you.</p>
        </header>
        <section className="card">
          <h3>No decisions yet</h3>
          <p>Create a decision first, then compare its options here.</p>
          <button
            type="button"
            className="button"
            onClick={() => onNavigate('new-decision')}
          >
            New decision
          </button>
        </section>
      </>
    )
  }

  const picker = (
    <div className="form-field">
      <label htmlFor="decision-picker">Decision</label>
      <select
        id="decision-picker"
        value={decision ? decision.id : ''}
        onChange={(event) => onSelectDecision(event.target.value)}
      >
        <option value="" disabled>
          Choose a decision
        </option>
        {decisions.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>
    </div>
  )

  if (!decision) {
    return (
      <>
        <header className="page-header">
          <h2>Compare Options</h2>
          <p>Choose which decision you want to work on.</p>
        </header>
        <section className="card">{picker}</section>
      </>
    )
  }

  const options = decision.options ?? starterOptions
  const criteria = decision.criteria ?? starterCriteria
  const ratings = decision.ratings ?? starterRatings

  function setOptions(value) {
    onUpdateDecision(decision.id, { options: value })
  }

  function setCriteria(value) {
    onUpdateDecision(decision.id, { criteria: value })
  }

  function setRatings(value) {
    onUpdateDecision(decision.id, { ratings: value })
  }

  function handleOptionNameChange(optionId, name) {
    setOptions(
      options.map((option) =>
        option.id === optionId ? { ...option, name } : option
      )
    )
  }

  function handleAddOption() {
    setOptions([...options, { id: crypto.randomUUID(), name: 'New option' }])
  }

  function handleRemoveOption(optionId) {
    setOptions(options.filter((option) => option.id !== optionId))
  }

  function handleCriterionNameChange(criterionId, name) {
    setCriteria(
      criteria.map((criterion) =>
        criterion.id === criterionId ? { ...criterion, name } : criterion
      )
    )
  }

  function handleAddCriterion() {
    setCriteria([
      ...criteria,
      { id: crypto.randomUUID(), name: 'New criterion', weight: 3 },
    ])
  }

  function handleRemoveCriterion(criterionId) {
    setCriteria(criteria.filter((criterion) => criterion.id !== criterionId))
  }

  function handleWeightChange(criterionId, value) {
    setCriteria(
      criteria.map((criterion) =>
        criterion.id === criterionId
          ? { ...criterion, weight: Number(value) }
          : criterion
      )
    )
  }

  function handleRatingChange(optionId, criterionId, value) {
    setRatings({
      ...ratings,
      [optionId]: {
        ...ratings[optionId],
        [criterionId]: Number(value),
      },
    })
  }

  function handleStartOver() {
    const confirmed = window.confirm('Clear this comparison and start over?')
    if (confirmed) {
      onUpdateDecision(decision.id, {
        options: starterOptions,
        criteria: starterCriteria,
        ratings: starterRatings,
      })
    }
  }

  const results = calculateScores(options, criteria, ratings)
  const bestPercent = Math.max(0, ...results.map((result) => result.percent))

  return (
    <>
      <header className="page-header">
        <h2>Compare Options</h2>
        <p>Rate your options against what matters to you.</p>
      </header>

      <section className="card">
        {picker}

        <div className="matrix-wrapper">
          <table className="matrix">
            <thead>
              <tr>
                <th>Criterion</th>
                <th>Importance</th>
                {options.map((option) => (
                  <th key={option.id}>
                    <div className="name-edit">
                      <input
                        type="text"
                        className="name-input"
                        value={option.name}
                        aria-label="Option name"
                        onChange={(event) =>
                          handleOptionNameChange(option.id, event.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="icon-button"
                        aria-label="Remove option"
                        onClick={() => handleRemoveOption(option.id)}
                      >
                        ×
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {criteria.map((criterion) => (
                <tr key={criterion.id}>
                  <td>
                    <div className="name-edit">
                      <input
                        type="text"
                        className="name-input"
                        value={criterion.name}
                        aria-label="Criterion name"
                        onChange={(event) =>
                          handleCriterionNameChange(criterion.id, event.target.value)
                        }
                      />
                      <button
                        type="button"
                        className="icon-button"
                        aria-label="Remove criterion"
                        onClick={() => handleRemoveCriterion(criterion.id)}
                      >
                        ×
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="weight-control">
                      <input
                        type="range"
                        min="1"
                        max="5"
                        step="1"
                        value={criterion.weight}
                        onChange={(event) =>
                          handleWeightChange(criterion.id, event.target.value)
                        }
                      />
                      <span className="weight-value">{criterion.weight}</span>
                    </div>
                  </td>
                  {options.map((option) => (
                    <td key={option.id}>
                      <select
                        value={ratings[option.id]?.[criterion.id] ?? 0}
                        onChange={(event) =>
                          handleRatingChange(option.id, criterion.id, event.target.value)
                        }
                      >
                        <option value="0">-</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="matrix-actions">
          <button type="button" className="button" onClick={handleAddOption}>
            Add option
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={handleAddCriterion}
          >
            Add criterion
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={handleStartOver}
          >
            Start over
          </button>
        </div>
      </section>

      <section className="results">
        {results.map((result) => (
          <div
            key={result.id}
            className={`card score-card ${
              result.percent === bestPercent && bestPercent > 0 ? 'best' : ''
            }`}
          >
            <h3>{result.name || 'Untitled option'}</h3>
            <p className="score-percent">{result.percent}%</p>
            <div className="score-bar">
              <div
                className="score-bar-fill"
                style={{ width: `${result.percent}%` }}
              ></div>
            </div>
          </div>
        ))}
      </section>

      <AssumptionsLog
        key={decision.id}
        decision={decision}
        onUpdateDecision={onUpdateDecision}
      />
    </>
  )
}

export default CompareOptions