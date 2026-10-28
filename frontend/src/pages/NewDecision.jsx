import { useState } from 'react'
import ReversibilityNote from '../components/ReversibilityNote'

function NewDecision({ onAddDecision }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [revisitOn, setRevisitOn] = useState('')
  const [reversibility, setReversibility] = useState(3)

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (trimmedTitle === '') return

    onAddDecision({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      description: description.trim(),
      revisitOn,
      reversibility,
      status: 'active',
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setDescription('')
    setRevisitOn('')
    setReversibility(3)
  }

  return (
    <>
      <header className="page-header">
        <h2>New Decision</h2>
        <p>Describe the choice you are trying to make.</p>
      </header>

      <section className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="title">What are you deciding?</label>
            <input
              id="title"
              type="text"
              value={title}
              placeholder="For example: Which skill should I learn first?"
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Details (optional)</label>
            <textarea
              id="description"
              rows="4"
              value={description}
              placeholder="Why does this decision matter? What is making it hard?"
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>

          <div className="form-field">
            <label htmlFor="reversibility">
              How easy would this be to undo later?
            </label>
            <input
              id="reversibility"
              type="range"
              min="1"
              max="5"
              step="1"
              value={reversibility}
              onChange={(event) => setReversibility(Number(event.target.value))}
            />
            <div className="range-labels">
              <span>Easy to undo</span>
              <span>Hard to undo</span>
            </div>
            <ReversibilityNote level={reversibility} />
          </div>

          <div className="form-field">
            <label htmlFor="revisitOn">Look back on this decision on (optional)</label>
            <input
              id="revisitOn"
              type="date"
              value={revisitOn}
              onChange={(event) => setRevisitOn(event.target.value)}
            />
          </div>

          <button type="submit" className="button">
            Save decision
          </button>
        </form>
      </section>
    </>
  )
}

export default NewDecision