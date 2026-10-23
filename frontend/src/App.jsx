import { useState } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import NewDecision from './pages/NewDecision'
import CompareOptions from './pages/CompareOptions'
import DecisionTree from './pages/DecisionTree'
import Outcomes from './pages/Outcomes'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const pages = {
    'dashboard': <Dashboard />,
    'new-decision': <NewDecision />,
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