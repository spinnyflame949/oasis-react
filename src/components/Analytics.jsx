import { useEffect, useState } from 'react';

export default function Analytics({ history, waterGoal }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().split('T')[0]);
    }

    const data = days.map(dayKey => {
      const dayData = history[dayKey] || { water: 0 };
      const waterAmount = dayData.water || 0;
      let heightPercent = (waterAmount / waterGoal) * 100;
      if (heightPercent > 100) heightPercent = 100;
      if (heightPercent < 2) heightPercent = 2;
      
      const dateObj = new Date(dayKey);
      const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
      
      return { dayName, waterAmount, heightPercent };
    });

    setChartData(data);
  }, [history, waterGoal]);

  return (
    <section className="app-page active-page">
      <div className="header">
        <h1>Analytics 📊</h1>
        <p>Your 7-day hydration history.</p>
      </div>
      <div className="card">
        <h2 style={{marginBottom: '2rem'}}>Last 7 Days</h2>
        <div className="chart-container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          height: '300px',
          paddingBottom: '30px',
          borderBottom: '2px solid rgba(42, 127, 127, 0.1)'
        }}>
          {chartData.map((data, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              flex: 1,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                top: '-25px',
                fontSize: '0.85rem',
                color: 'var(--accent-teal)',
                fontWeight: '700'
              }}>
                {data.waterAmount.toFixed(1)}L
              </div>
              <div style={{
                width: '35px',
                background: `linear-gradient(to top, var(--accent-light-teal), var(--accent-teal))`,
                borderRadius: '6px 6px 0 0',
                height: `${data.heightPercent}%`,
                minHeight: '4px',
                transition: 'height 0.5s ease'
              }}></div>
              <div style={{
                position: 'absolute',
                bottom: '-25px',
                fontSize: '0.85rem',
                color: 'var(--text-light)',
                fontWeight: '500'
              }}>
                {data.dayName}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}