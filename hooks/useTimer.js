import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialDuration) => {
  const [duration, setDuration] = useState(initialDuration);
  const [remaining, setRemaining] = useState(initialDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setIsCompleted(true);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remaining]);

  const start = useCallback(() => {
    if (!isCompleted) setIsRunning(true);
  }, [isCompleted]);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setRemaining(duration);
    setIsRunning(false);
    setIsCompleted(false);
  }, [duration]);

  return {
    remaining,
    isRunning,
    isCompleted,
    progress: (duration - remaining) / duration,
    start,
    pause,
    reset,
  };
};