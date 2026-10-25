import { useState } from 'react'

const riskLevels = [
  { value: 'low', label: 'Low risk' },
  { value: 'medium', label: 'Medium risk' },
  { value: 'high', label: 'High risk' },
]

const statuses = [
  { value: 'open', label: 'Not checked yet' },
  { value: 'confirmed', label: 'Turned out true' },
  { value: 'wrong', label: 'Turned out wrong' },
]

function AssumptionsLog({ decision, onUpdateDecision }) {
  const assumptions = decision.assumptions ?? []
  const [text, setText] = useState('')
  const [riskLevel, setRiskLevel] = useState('medium')

  function saveAssumptions(newList) {
    onUpdateDecision(decision.id, { assumptions: newList })
  }

  function handleAdd(event) {
    event.preventDefault()

    const trimmedText = text.trim()
    if (trimmedText === '') return

    saveAssumptions([
      ...assumptions,
      {
        id: crypto.randomUUID(),
        text: trimmedText,
        riskLevel,
        status: 'open',
      },
    ])

    setText('')
  }

  function handleChange(assumptionId, changes) {
    saveAssumptions(
      assumptions.map((assumption) =>
        assumption.id === assumptionId ? { ...assumption, ...changes } : assumption
      )
    )
  }

  function handleRemove(assumptionId) {
    saveAssumptions(assumptions.filter((assumption) => assumption.id !== assumptionId))
  }

  return (
    <section className="card assumptions">
      <h3>Assumptions and risks</h3>
      <p className="section-hint">
        Write down what you are taking for granted and what could go wrong. You can
        check each one later to see whether it held up.
      </p>

      <form className="assumptions-form" onSubmit={handleAdd}>
        <input
          type="text"
          className="name-input"
          value={text}
          placeholder="For example: I will not get any work done at home"
          aria-label="New assumption"
          onChange={(event) => setText(event.target.value)}
        />
        <select
          value={riskLevel}
          aria-label="Risk level"
          onChange={(event) => setRiskLevel(event.target.value)}
        >
          {riskLevels.map((level) => (
            <option key={level.value} value={level.value}>
              {level.label}
            </option>
          ))}
        </select>
        <button type="submit" className="button">
          Add
        </button>
      </form>

      {assumptions.length === 0 ? (
        <p className="empty-note">No assumptions yet.</p>
      ) : (
        <ul className="assumption-list">
          {assumptions.map((assumption) => (
            <li key={assumption.id} className="assumption-item">
              <div className="assumption-main">
                <span className={`badge risk-${assumption.riskLevel}`}>
                  {assumption.riskLevel}
                </span>
                <span className={assumption.status === 'wrong' ? 'struck' : ''}>
                  {assumption.text}
                </span>
              </div>

              <div className="assumption-controls">
                <select
                  value={assumption.status}
                  aria-label="Status"
                  onChange={(event) =>
                    handleChange(assumption.id, { status: event.target.value })
                  }
                >
                  {statuses.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  className="icon-button"
                  aria-label="Remove assumption"
                  onClick={() => handleRemove(assumption.id)}
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default AssumptionsLog