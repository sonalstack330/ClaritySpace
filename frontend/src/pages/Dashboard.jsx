function getToday() {
  return new Date().toLocaleDateString('en-CA')
}

function Dashboard({ decisions, onDeleteDecision, onNavigate, onOpenComparison }) {
  const today = getToday()
  const activeCount = decisions.filter((decision) => decision.status === 'active').length
  const dueCount = decisions.filter(
    (decision) => decision.revisitOn && decision.revisitOn <= today
  ).length

  function handleDelete(decision) {
    const confirmed = window.confirm(`Delete "${decision.title}"?`)
    if (confirmed) {
      onDeleteDecision(decision.id)
    }
  }

  return (
    <>
      <header className="page-header">
        <h2>Dashboard</h2>
        <p>Your decisions at a glance.</p>
      </header>

      <section className="stats">
        <div className="card stat-card">
          <p className="stat-number">{activeCount}</p>
          <p className="stat-label">Active decisions</p>
        </div>
        <div className="card stat-card">
          <p className="stat-number">{dueCount}</p>
          <p className="stat-label">Due for a look back</p>
        </div>
      </section>

      {decisions.length === 0 ? (
        <section className="card">
          <h3>No decisions yet</h3>
          <p>Create your first decision to get started.</p>
          <button
            type="button"
            className="button"
            onClick={() => onNavigate('new-decision')}
          >
            New decision
          </button>
        </section>
      ) : (
        <section className="decision-list">
          {decisions.map((decision) => {
            const isDue = decision.revisitOn && decision.revisitOn <= today

            return (
              <article key={decision.id} className="card decision-item">
                <div className="decision-item-header">
                  <h3>{decision.title}</h3>
                  <button
                    type="button"
                    className="icon-button"
                    aria-label={`Delete ${decision.title}`}
                    onClick={() => handleDelete(decision)}
                  >
                    ×
                  </button>
                </div>

                {decision.description && (
                  <p className="decision-description">{decision.description}</p>
                )}

                <p className="decision-meta">
                  Created {new Date(decision.createdAt).toLocaleDateString()}
                  {decision.revisitOn && (
                    <span className={`badge ${isDue ? 'due' : ''}`}>
                      Look back: {decision.revisitOn}
                    </span>
                  )}
                </p>
                                <div className="decision-actions">
                  <button
                    type="button"
                    className="button secondary"
                    onClick={() => onOpenComparison(decision.id)}
                  >
                    Compare options
                  </button>
                </div>
              </article>
            )
          })}
        </section>
      )}
    </>
  )
}

export default Dashboard