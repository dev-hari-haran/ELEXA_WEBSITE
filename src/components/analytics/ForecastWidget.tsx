import React from 'react';
import { Hourglass, Zap, CheckCircle2 } from 'lucide-react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import { Book } from '../../types/book';

interface ForecastWidgetProps {
  book: Book;
}

export const ForecastWidget: React.FC<ForecastWidgetProps> = ({ book }) => {
  const { calculateForecast, stats } = useAnalyticsStore();

  const remainingPages = Math.max(0, book.totalPages - book.currentPage);
  const forecast = calculateForecast(remainingPages);

  return (
    <div className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Hourglass className="w-5 h-5 text-accent" />
        <h3 className="font-serif font-bold text-base text-text-primary">
          Completion Forecast
        </h3>
      </div>

      <div className="flex items-baseline justify-between p-4 rounded-2xl bg-background border border-border/60">
        <div className="flex flex-col">
          <span className="text-xs text-text-muted">Estimated Time Left</span>
          <span className="text-2xl font-bold font-serif text-accent mt-0.5">
            {forecast.formattedTime}
          </span>
        </div>

        <div className="flex flex-col items-end">
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Zap className="w-3 h-3 text-amber-500 fill-amber-500" /> Reading Speed
          </span>
          <span className="text-sm font-semibold font-mono text-text-primary mt-0.5">
            {stats.averageWpm} WPM
          </span>
        </div>
      </div>

      <div className="text-xs text-text-secondary flex items-center gap-2">
        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        <span>
          At your current pace of {stats.averageWpm} WPM, you will finish <strong>{book.title}</strong> in approx <strong>{forecast.formattedTime}</strong>.
        </span>
      </div>
    </div>
  );
};
