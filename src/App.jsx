import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import WaterTracker from './components/WaterTracker';
import FocusTimerPage from './components/FocusTimerPage';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import TimerComponent from './components/TimerComponent';

function App() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [userName, setUserName] = useState('User');
  const [currentWater, setCurrentWater] = useState(0);
  const [waterGoal, setWaterGoal] = useState(4.5);
  const [history, setHistory] = useState({});
  const [streak, setStreak] = useState(0);
  
  // Timer hook
  const timerData = TimerComponent();

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('oasisData');
    if (savedData) {
      const data = JSON.parse(savedData);
      setUserName(data.userName || 'User');
      setCurrentWater(data.currentWater || 0);
      setWaterGoal(data.waterGoal || 4.5);
      setHistory(data.history || {});
      setStreak(data.streak || 0);
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const updatedHistory = {
      ...history,
      [today]: { water: currentWater, focus: timerData.totalFocusSeconds }
    };

    const data = { 
      userName, 
      currentWater, 
      waterGoal, 
      history: updatedHistory,
      streak
    };
    localStorage.setItem('oasisData', JSON.stringify(data));
  }, [userName, currentWater, waterGoal, history, streak, timerData.totalFocusSeconds]);

  // Water functions
  const addWater = (amount) => {
    setCurrentWater((prev) => {
      const newAmount = prev + amount;
      const finalAmount = newAmount < 0 ? 0 : newAmount;
      
      // Check streak
      if (finalAmount >= waterGoal && currentWater < waterGoal) {
        setStreak((prev) => prev + 1);
        alert(`🔥 Goal hit! Streak is now ${streak + 1} days!`);
      }
      
      return finalAmount;
    });
  };

  const resetAllData = () => {
    if (window.confirm("Are you sure? This will delete ALL your data!")) {
      localStorage.removeItem('oasisData');
      setCurrentWater(0);
      setStreak(0);
      setHistory({});
      setUserName('User');
      setWaterGoal(4.5);
    }
  };

  // Calculate focus time display
  const formatFocusTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="app-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="main-content">
        
        {/* OVERVIEW TAB */}
        {activeTab === 'Overview' && (
          <section className="app-page active-page">
            <div className="header">
              <h1>Good morning, {userName}! 👊</h1>
              <p>Let's stay hydrated and locked in today.</p>
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon icon-fire">🔥</div>
                <div className="stat-info"><h3>{streak} Days</h3><p>Current Streak</p></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon icon-water">💧</div>
                <div className="stat-info"><h3>{currentWater.toFixed(2)}L</h3><p>Today's Water</p></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon icon-time">⏱️</div>
                <div className="stat-info"><h3>{formatFocusTime(timerData.totalFocusSeconds)}</h3><p>Focus Time</p></div>
              </div>
            </div>

            <div className="dashboard-grid">
              {/* Water Card */}
              <div className="card">
                <div className="card-header"><h2>Daily Hydration</h2></div>
                <div className="water-visual">
                  <div className="water-amount">
                    {currentWater.toFixed(2)}L <span>/ {waterGoal}L Goal</span>
                  </div>
                </div>
                <div className="water-controls">
                  <button className="btn btn-outline" onClick={() => addWater(-0.25)}>- 250ml</button>
                  <button className="btn btn-primary" onClick={() => addWater(0.25)}>+ 250ml</button>
                  <button className="btn btn-primary" onClick={() => addWater(0.50)}>+ 500ml</button>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((currentWater / waterGoal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Timer Card */}
              <div className="card">
                <div className="card-header"><h2>Focus Session</h2></div>
                <div className="timer-display">
                  <div className="timer-circle">
                    <div className="timer-time">{timerData.formatTime(timerData.timerSeconds)}</div>
                    <div className="timer-label">Deep Work</div>
                  </div>
                </div>
                <div className="timer-controls">
                  <button className="btn btn-primary" onClick={timerData.startTimer}>
                    {timerData.isRunning ? 'Pause' : 'Start'}
                  </button>
                  <button className="btn btn-outline" onClick={timerData.resetTimer}>Reset</button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* WATER TRACKER TAB */}
        {activeTab === 'Water Tracker' && (
          <WaterTracker 
            currentWater={currentWater} 
            waterGoal={waterGoal} 
            addWater={addWater} 
          />
        )}

        {/* FOCUS TIMER TAB */}
        {activeTab === 'Focus Timer' && (
          <FocusTimerPage timerData={timerData} />
        )}

        {/* ANALYTICS TAB */}
        {activeTab === 'Analytics' && (
          <Analytics history={history} waterGoal={waterGoal} />
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'Settings' && (
          <Settings 
            userName={userName} 
            setUserName={setUserName}
            waterGoal={waterGoal}
            setWaterGoal={setWaterGoal}
            resetAllData={resetAllData}
          />
        )}

      </main>
    </div>
  );
}

export default App;