import { useState, useEffect } from 'react';

export default function TimerComponent() {
  const [timerSeconds, setTimerSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [totalFocusSeconds, setTotalFocusSeconds] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
        setTotalFocusSeconds((prev) => prev + 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsRunning(false);
      alert("Focus session complete! Take a break. 🧠");
    }
    return () => clearInterval(interval);
  }, [isRunning, timerSeconds]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  const startTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimerSeconds(25 * 60);
  };

  const setPreset = (minutes) => {
    setIsRunning(false);
    setTimerSeconds(minutes * 60);
  };

  return { timerSeconds, isRunning, totalFocusSeconds, formatTime, startTimer, resetTimer, setPreset };
}