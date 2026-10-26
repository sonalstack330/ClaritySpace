import { useState } from 'react'
import './App.css'
import { useLocalStorage } from './hooks/useLocalStorage'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import NewDecision from './pages/NewDecision'
import CompareOptions from './pages/CompareOptions'
import DecisionTree from './pages/DecisionTree'
import Outcomes from './pages/Outcomes'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedDecisionId, setSelectedDecisionId] = useState(null)
  const [decisions, setDecisions] = useLocalStorage('clarityspace-decisions', [])

  function handleAddDecision(decision) {
    setDecisions([decision, ...decisions])
    setCurrentPage('dashboard')
  }

  function handleDeleteDecision(decisionId) {
    setDecisions(decisions.filter((decision) => decision.id !== decisionId))
  }

  function handleUpdateDecision(decisionId, changes) {
    setDecisions(
      decisions.map((decision) =>
        decision.id === decisionId ? { ...decision, ...changes } : decision
      )
    )
  }

  function handleOpenComparison(decisionId) {
    setSelectedDecisionId(decisionId)
    setCurrentPage('compare')
  }

  const pages = {
    'dashboard': (
      <Dashboard
        decisions={decisions}
        onDeleteDecision={handleDeleteDecision}
        onNavigate={setCurrentPage}
        onOpenComparison={handleOpenComparison}
      />
    ),
    'new-decision': <NewDecision onAddDecision={handleAddDecision} />,
    'compare': (
      <CompareOptions
        decisions={decisions}
        selectedDecisionId={selectedDecisionId}
        onSelectDecision={setSelectedDecisionId}
        onUpdateDecision={handleUpdateDecision}
        onNavigate={setCurrentPage}
      />
    ),
    'tree': <DecisionTree />,
    'outcomes': (
      <Outcomes
        decisions={decisions}
        onUpdateDecision={handleUpdateDecision}
        onNavigate={setCurrentPage}
      />
    ),
  }

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main">{pages[currentPage]}</main>
    </div>
  )
}

export default App