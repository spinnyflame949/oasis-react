export default function Settings({ userName, setUserName, waterGoal, setWaterGoal, resetAllData }) {
  return (
    <section className="app-page active-page">
      <div className="header">
        <h1>Settings ⚙️</h1>
        <p>Customize your Oasis.</p>
      </div>
      
      <div className="card" style={{maxWidth: '500px', marginBottom: '2rem'}}>
        <h2 style={{marginBottom: '1rem', fontSize: '1.2rem'}}>Profile Name</h2>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
          />
          <span style={{color: 'var(--text-light)'}}>Auto-saved</span>
        </div>
      </div>

      <div className="card" style={{maxWidth: '500px', marginBottom: '2rem'}}>
        <h2 style={{marginBottom: '1rem', fontSize: '1.2rem'}}>Daily Water Goal</h2>
        <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
          <input 
            type="number" 
            value={waterGoal} 
            onChange={(e) => setWaterGoal(parseFloat(e.target.value))}
            step="0.1" 
            min="1" 
            max="10"
          />
          <span style={{fontWeight: 'bold'}}>Liters</span>
        </div>
      </div>

      <div className="card" style={{maxWidth: '500px', border: '1px solid #ffcccc'}}>
        <h2 style={{marginBottom: '1rem', fontSize: '1.2rem', color: '#d9534f'}}>Danger Zone</h2>
        <p style={{color: 'var(--text-light)', marginBottom: '1rem'}}>
          This will erase all your streaks, water history, and settings.
        </p>
        <button className="btn" style={{background: 'var(--danger)', color: 'white'}} onClick={resetAllData}>
          Reset All Data
        </button>
      </div>
    </section>
  );
}