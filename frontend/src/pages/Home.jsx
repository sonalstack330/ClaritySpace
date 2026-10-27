const steps = [
  {
    title: 'Describe your decision',
    text: 'Write down what you are trying to decide and why it matters. Put it into words instead of letting it circle in your head.',
  },
  {
    title: 'Compare your options',
    text: 'List your options and what matters to you, say how important each thing is, and rate every option. ClaritySpace works out the scores.',
  },
  {
    title: 'Look back and learn',
    text: 'Write down what you expect, then return later to record what really happened. Over time you learn how you decide.',
  },
]

function Home({ onNavigate }) {
  return (
    <>
      <section className="hero">
        <h2>Think it through, then decide.</h2>
        <p>
          ClaritySpace helps you work through difficult choices instead of
          overthinking them. It does not tell you what to choose. It gives your
          thinking a clear structure and helps you learn from every decision.
        </p>
        <div className="hero-actions">
          <button
            type="button"
            className="button"
            onClick={() => onNavigate('new-decision')}
          >
            Start a decision
          </button>
          <button
            type="button"
            className="button secondary"
            onClick={() => onNavigate('dashboard')}
          >
            Go to my dashboard
          </button>
        </div>
      </section>

      <section>
        <h3 className="section-title">How it works</h3>
        <ol className="steps">
          {steps.map((step, index) => (
            <li key={step.title} className="card step">
              <span className="step-number">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  )
}

export default Home