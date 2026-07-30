import React from 'react';
import { ReadingStreakCard } from '../analytics/ReadingStreakCard';
import { ReadingCalendar } from '../analytics/ReadingCalendar';
import { ForecastWidget } from '../analytics/ForecastWidget';
import { useLibraryStore } from '../../stores/useLibraryStore';

export const AnalyticsView: React.FC = () => {
  const { books } = useLibraryStore();
  const activeBook = books[0];

  return (
    <div className="w-full flex-1 flex flex-col gap-8 select-none">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-primary">
          Reading Analytics & Insights
        </h1>
        <p className="text-xs text-text-muted mt-1">
          Track your reading streaks, reading speed, duration goals, and completion forecasts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ReadingStreakCard />
        <ReadingCalendar />
      </div>

      <div className="w-full">
        <ForecastWidget book={activeBook} />
      </div>
    </div>
  );
};
