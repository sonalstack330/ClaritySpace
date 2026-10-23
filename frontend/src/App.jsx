import './App.css'

function App() {
  return (
    <div className="app">
      <aside className="sidebar">
        <h1 className="logo">ClaritySpace</h1>
        <nav>
          <ul className="nav-list">
            <li className="nav-item active">Dashboard</li>
            <li className="nav-item">New Decision</li>
            <li className="nav-item">Compare Options</li>
            <li className="nav-item">Decision Tree</li>
            <li className="nav-item">Outcomes</li>
          </ul>
        </nav>
      </aside>

      <main className="main">
        <header className="page-header">
          <h2>Dashboard</h2>
          <p>Your decisions at a glance.</p>
        </header>

        <section className="card">
          <h3>No decisions yet</h3>
          <p>Create your first decision to get started.</p>
        </section>
      </main>
    </div>
  )
}

export default App