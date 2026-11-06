export default function WaterTracker({ currentWater, waterGoal, addWater }) {
  return (
    <section className="app-page active-page">
      <div className="header">
        <h1>Water Tracker </h1>
        <p>Your hydration at a glance.</p>
      </div>
      <div className="card" style={{maxWidth: '600px'}}>
        <h2 style={{marginBottom: '1rem'}}>Today's Progress</h2>
        <div style={{fontSize: '4rem', fontWeight: '700', color: 'var(--accent-teal)', marginBottom: '1rem'}}>
          {currentWater.toFixed(2)}L
        </div>
        <p style={{color: 'var(--text-light)', marginBottom: '2rem'}}>
          Keep hitting those 250ml increments to reach your goal of {waterGoal}L.
        </p>
        <div className="water-controls" style={{justifyContent: 'center'}}>
          <button className="btn btn-primary btn-lg" onClick={() => addWater(0.25)}>+ 250ml</button>
          <button className="btn btn-primary btn-lg" onClick={() => addWater(0.50)}>+ 500ml</button>
        </div>
      </div>
    </section>
  );
}