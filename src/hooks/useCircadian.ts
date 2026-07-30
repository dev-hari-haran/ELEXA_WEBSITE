import { useEffect } from 'react';
import { useThemeStore } from '../stores/useThemeStore';

export const useCircadian = () => {
  const { circadian, updateCircadianTheme } = useThemeStore();

  useEffect(() => {
    if (!circadian.enabled) return;

    updateCircadianTheme();
    const interval = setInterval(updateCircadianTheme, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [circadian.enabled, updateCircadianTheme]);
};
