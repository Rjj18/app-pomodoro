import React, { useState, useEffect, useCallback } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutes in seconds for testing
  const [isRunning, setIsRunning] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  const playAlarmSound = useCallback(() => {
    if (audioContext) {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.type = 'sine'; // You can change this to 'square', 'sawtooth', or 'triangle'
      oscillator.frequency.setValueAtTime(440, audioContext.currentTime); // Frequency in Hz (440 Hz is the standard A note)

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.start();

      // Create a beeping effect by toggling the gain
      let beepInterval = setInterval(() => {
        gainNode.gain.setValueAtTime(1, audioContext.currentTime);
        setTimeout(() => {
          gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        }, 200); // Beep duration
      }, 500); // Interval between beeps

      // Stop the beeping after 5 seconds
      setTimeout(() => {
        clearInterval(beepInterval);
        oscillator.stop();
      }, 5000);
    }
  }, [audioContext]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            playAlarmSound();
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning, playAlarmSound]);

  useEffect(() => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
    }
  }, [audioContext]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  return (
    <div>
      <h1>Pomodoro Timer</h1>
      <h2>{formatTime(timeLeft)}</h2>
      <button onClick={startTimer}>Start</button>
      <button onClick={pauseTimer}>Pause</button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
};

export default Timer;
