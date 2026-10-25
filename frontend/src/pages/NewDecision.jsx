import { useState } from 'react'

function NewDecision({ onAddDecision }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [revisitOn, setRevisitOn] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    const trimmedTitle = title.trim()
    if (trimmedTitle === '') return

    onAddDecision({
      id: crypto.randomUUID(),
      title: trimmedTitle,
      description: description.trim(),
      revisitOn,
      status: 'active',
      createdAt: new Date().toISOString(),
    })

    setTitle('')
    setDescription('')
    setRevisitOn('')
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