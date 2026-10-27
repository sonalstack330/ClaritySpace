const menuItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'new-decision', label: 'New Decision' },
  { id: 'compare', label: 'Compare Options' },
  { id: 'outcomes', label: 'Outcomes' },
]

function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <h1 className="logo">ClaritySpace</h1>
      <nav>
        <ul className="nav-list">
          {menuItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar