export interface DailyReadingActivity {
  date: string; // YYYY-MM-DD
  minutesRead: number;
  pagesRead: number;
  completedBookId?: string;
}

export interface ReadingStreakStats {
  currentStreakDays: number;
  longestStreakDays: number;
  totalDaysActive: number;
  totalMinutesRead: number;
  totalPagesRead: number;
  averageWpm: number;
  weeklyGoalMinutes: number;
  weeklyProgressMinutes: number;
}

export interface ReadingForecast {
  bookId: string;
  bookTitle: string;
  remainingPages: number;
  estimatedHoursLeft: number;
  predictedCompletionDate: string; // Formatted date string
  currentWpm: number;
}
