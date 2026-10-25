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
   const [decisions, setDecisions] = useLocalStorage('clarityspace-decisions', [])

   function handleAddDecision(decision) {
    setDecisions([decision, ...decisions])
    setCurrentPage('dashboard')
  }

  function handleDeleteDecision(decisionId) {
    setDecisions(decisions.filter((decision) => decision.id !== decisionId))
  }

  const pages = {
    'dashboard': (
      <Dashboard
        decisions={decisions}
        onDeleteDecision={handleDeleteDecision}
        onNavigate={setCurrentPage}
      />
    ),
    'new-decision': <NewDecision onAddDecision={handleAddDecision} />,
    'compare': <CompareOptions />,
    'tree': <DecisionTree />,
    'outcomes': <Outcomes />,
  }

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="main">{pages[currentPage]}</main>
    </div>
  )
}

export default App