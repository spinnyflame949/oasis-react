export default function FocusTimerPage({ timerData }) {
  const { timerSeconds, isRunning, formatTime, startTimer, resetTimer, setPreset } = timerData;

  return (
    <section className="app-page active-page">
      <div className="header">
        <h1>Focus Timer ️</h1>
        <p>Choose your session length and get to work.</p>
      </div>
      <div className="card" style={{maxWidth: '500px', margin: '0 auto', textAlign: 'center'}}>
        <div className="timer-display">
          <div className="timer-circle" style={{width: '250px', height: '250px'}}>
            <div className="timer-time" style={{fontSize: '3.5rem'}}>{formatTime(timerSeconds)}</div>
            <div className="timer-label">Deep Work</div>
          </div>
        </div>
        <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '2rem'}}>
          <button className="btn btn-outline" onClick={() => setPreset(15)}>15m Break</button>
          <button className="btn btn-outline" onClick={() => setPreset(25)}>25m Focus</button>
          <button className="btn btn-outline" onClick={() => setPreset(50)}>50m Deep</button>
        </div>
        <div className="timer-controls" style={{justifyContent: 'center'}}>
          <button className="btn btn-primary" onClick={startTimer}>{isRunning ? 'Pause' : 'Start'}</button>
          <button className="btn btn-outline" onClick={resetTimer}>Reset</button>
        </div>
      </div>
    </section>
  );
}