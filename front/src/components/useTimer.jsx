import { useEffect, useRef, useState } from 'react';

export const useTimer = (initialSeconds = 180, onTimeout) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && seconds > 0) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  useEffect(() => {
    if (seconds === 0 && isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
      if (onTimeout) onTimeout(); // 시간 초과 콜백 실행
    }
  }, [seconds, isRunning, onTimeout]);

  const start = () => {
    clearInterval(timerRef.current);
    setSeconds(initialSeconds);
    setIsRunning(true);
  };

  const formatTime = () => {
    const min = String(Math.floor(seconds / 60)).padStart(2, '0');
    const sec = String(seconds % 60).padStart(2, '0');
    return `${min}:${sec}`;
  };

  return { seconds, isRunning, formatTime, start };
};
