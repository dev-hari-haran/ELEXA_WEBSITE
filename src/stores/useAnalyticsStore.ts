import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReadingStreakStats, DailyReadingActivity } from '../types/analytics';

interface AnalyticsState {
  stats: ReadingStreakStats;
  activityHistory: DailyReadingActivity[];
  recordReadingSession: (minutes: number, pages: number, bookId?: string) => void;
  calculateForecast: (remainingPages: number, averageWpm?: number) => { minutesLeft: number; formattedTime: string };
}

const MOCK_ACTIVITY: DailyReadingActivity[] = [
  { date: '2026-07-24', minutesRead: 45, pagesRead: 32 },
  { date: '2026-07-25', minutesRead: 60, pagesRead: 45 },
  { date: '2026-07-26', minutesRead: 30, pagesRead: 22 },
  { date: '2026-07-27', minutesRead: 75, pagesRead: 50 },
  { date: '2026-07-28', minutesRead: 50, pagesRead: 38 },
  { date: '2026-07-29', minutesRead: 40, pagesRead: 28 },
  { date: '2026-07-30', minutesRead: 65, pagesRead: 42 },
];

export const useAnalyticsStore = create<AnalyticsState>()(
  persist(
    (set, get) => ({
      stats: {
        currentStreakDays: 14,
        longestStreakDays: 28,
        totalDaysActive: 42,
        totalMinutesRead: 1840,
        totalPagesRead: 1420,
        averageWpm: 260,
        weeklyGoalMinutes: 300,
        weeklyProgressMinutes: 245,
      },
      activityHistory: MOCK_ACTIVITY,

      recordReadingSession: (minutes, pages, bookId) => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          const existing = state.activityHistory.find((a) => a.date === today);
          let updatedHistory: DailyReadingActivity[];

          if (existing) {
            updatedHistory = state.activityHistory.map((a) =>
              a.date === today
                ? { ...a, minutesRead: a.minutesRead + minutes, pagesRead: a.pagesRead + pages }
                : a
            );
          } else {
            updatedHistory = [...state.activityHistory, { date: today, minutesRead: minutes, pagesRead: pages, completedBookId: bookId }];
          }

          return {
            activityHistory: updatedHistory,
            stats: {
              ...state.stats,
              totalMinutesRead: state.stats.totalMinutesRead + minutes,
              totalPagesRead: state.stats.totalPagesRead + pages,
              weeklyProgressMinutes: state.stats.weeklyProgressMinutes + minutes,
            },
          };
        });
      },

      calculateForecast: (remainingPages, customWpm) => {
        const wpm = customWpm || get().stats.averageWpm || 250;
        // Average 300 words per page
        const totalWords = remainingPages * 300;
        const totalMinutes = Math.ceil(totalWords / wpm);

        const hours = Math.floor(totalMinutes / 60);
        const mins = totalMinutes % 60;
        const formattedTime = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;

        return { minutesLeft: totalMinutes, formattedTime };
      },
    }),
    {
      name: 'elexa-analytics-storage',
    }
  )
);
