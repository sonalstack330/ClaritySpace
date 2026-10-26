import OutcomeCard from '../components/OutcomeCard'

function Outcomes({ decisions, onUpdateDecision, onNavigate }) {
  const groups = [
    {
      title: 'Ready to decide',
      items: decisions.filter((decision) => (decision.status ?? 'active') === 'active'),
    },
    {
      title: 'Waiting for a look back',
      items: decisions.filter((decision) => decision.status === 'decided'),
    },
    {
      title: 'Reviewed',
      items: decisions.filter((decision) => decision.status === 'reviewed'),
    },
  ]

  return (
    <>
      <header className="page-header">
        <h2>Outcomes</h2>
        <p>Record your choice, then look back at how it turned out.</p>
      </header>

      {decisions.length === 0 ? (
        <section className="card">
          <h3>No decisions yet</h3>
          <p>Create a decision first, then track its outcome here.</p>
          <button
            type="button"
            className="button"
            onClick={() => onNavigate('new-decision')}
          >
            New decision
          </button>
        </section>
      ) : (
        groups.map(
          (group) =>
            group.items.length > 0 && (
              <section key={group.title} className="outcome-group">
                <h3 className="group-title">
                  {group.title} ({group.items.length})
                </h3>
                <div className="decision-list">
                  {group.items.map((decision) => (
                    <OutcomeCard
                      key={decision.id}
                      decision={decision}
                      onUpdateDecision={onUpdateDecision}
                    />
                  ))}
                </div>
              </section>
            )
        )
      )}
    </>
  )
}

export default Outcomes