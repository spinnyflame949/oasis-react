// src/components/Sidebar.jsx

// A React component is just a function that returns HTML (JSX)
// We receive 'activeTab' and 'setActiveTab' from the parent (App.jsx)
export default function Sidebar({ activeTab, setActiveTab }) {
  const tabs = ['Overview', 'Water Tracker', 'Focus Timer', 'Analytics', 'Settings'];

  return (
    <aside className="sidebar">
      <div className="logo">
        {/* Make sure your logo.png is in the 'public' folder! */}
        <img src="/logo.png" alt="The Oasis Logo" />
        <span>OASIS</span>
      </div>
      
      <ul className="nav-links">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={activeTab === tab ? 'active' : ''}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </li>
        ))}
      </ul>
    </aside>
  );
}