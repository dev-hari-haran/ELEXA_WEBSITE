import { useState, useEffect } from 'react';
import { useAnalyticsStore } from '../stores/useAnalyticsStore';

export const useReadingTimer = (isReadingActive: boolean, bookId?: string) => {
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const { recordReadingSession } = useAnalyticsStore();

  useEffect(() => {
    if (!isReadingActive) return;

    const timer = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
      if (secondsElapsed > 30) {
        const minutes = Math.max(1, Math.round(secondsElapsed / 60));
        recordReadingSession(minutes, Math.ceil(minutes * 0.8), bookId);
      }
    };
  }, [isReadingActive, bookId, secondsElapsed, recordReadingSession]);

  const formattedTime = `${Math.floor(secondsElapsed / 60)}m ${secondsElapsed % 60}s`;

  return { secondsElapsed, formattedTime };
};
