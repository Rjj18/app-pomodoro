import React, { useState, useEffect, useCallback } from 'react';

const Timer = () => {
  const [timeLeft, setTimeLeft] = useState(0.2 * 60); // 1 minute for testing
  const [isRunning, setIsRunning] = useState(false);
  const [audioContext, setAudioContext] = useState(null);

  const initializeAudioContext = useCallback(() => {
    if (!audioContext) {
      const context = new (window.AudioContext || window.webkitAudioContext)();
      setAudioContext(context);
    }
  }, [audioContext]);

  const showNotification = useCallback(() => {
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'TIMER_END',
      });
    } else {
      console.error('Service Worker is not available.');
    }
  }, []);

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    let animationFrame;
    let startTime;
    let initialTimeLeft = timeLeft;

    const tick = () => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const newTimeLeft = Math.max(initialTimeLeft - elapsedTime, 0);

      setTimeLeft(newTimeLeft);

      if (newTimeLeft > 0) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        showNotification();
        setIsRunning(false);
      }
    };

    if (isRunning) {
      startTime = Date.now();
      animationFrame = requestAnimationFrame(tick);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isRunning, showNotification, timeLeft]);

  useEffect(() => {
    if (navigator.serviceWorker) {
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'PLAY_SOUND') {
          const audio = new Audio('/sounds/alarm_clock.mp3');
          audio.play().catch((error) => {
            console.error('Audio playback failed:', error);
          });
        }
      });
    }
  }, []);

  const startTimer = () => {
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        console.log('AudioContext resumed.');
      }).catch((error) => {
        console.error('Error resuming AudioContext:', error);
      });
    }
    initializeAudioContext();
    setIsRunning(true);
  };

  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(1 * 60); // Reset to 1 minute for testing
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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
