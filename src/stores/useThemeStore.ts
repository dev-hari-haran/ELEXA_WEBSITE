import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ThemeMode, CircadianSchedule } from '../types/theme';

interface ThemeState {
  theme: ThemeMode;
  circadian: CircadianSchedule;
  setTheme: (theme: ThemeMode) => void;
  setCircadianEnabled: (enabled: boolean) => void;
  updateCircadianTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'cream',
      circadian: {
        enabled: true,
        morningTheme: 'light',
        afternoonTheme: 'cream',
        eveningTheme: 'sepia',
        nightTheme: 'charcoal',
      },

      setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        set({ theme });
      },

      setCircadianEnabled: (enabled) => {
        set((state) => ({
          circadian: { ...state.circadian, enabled },
        }));
        if (enabled) {
          get().updateCircadianTheme();
        }
      },

      updateCircadianTheme: () => {
        const { circadian, theme } = get();
        if (!circadian.enabled) return;

        const hour = new Date().getHours();
        let targetTheme: ThemeMode = theme;

        if (hour >= 6 && hour < 12) {
          targetTheme = circadian.morningTheme;
        } else if (hour >= 12 && hour < 18) {
          targetTheme = circadian.afternoonTheme;
        } else if (hour >= 18 && hour < 22) {
          targetTheme = circadian.eveningTheme;
        } else {
          targetTheme = circadian.nightTheme;
        }

        if (targetTheme !== theme) {
          document.documentElement.setAttribute('data-theme', targetTheme);
          set({ theme: targetTheme });
        }
      },
    }),
    {
      name: 'elexa-theme-storage',
    }
  )
);
