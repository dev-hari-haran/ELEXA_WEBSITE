import React from 'react';
import { Flame, Trophy, Clock, BookOpen, Sparkles } from 'lucide-react';
import { useAnalyticsStore } from '../../stores/useAnalyticsStore';
import confetti from 'canvas-confetti';

export const ReadingStreakCard: React.FC = () => {
  const { stats } = useAnalyticsStore();

  const handleCelebrate = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-6 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <Flame className="w-5 h-5 fill-current" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-serif font-bold text-lg text-text-primary">
              Reading Streak
            </h3>
            <span className="text-xs text-text-muted">Stay consistent every day</span>
          </div>
        </div>

        <button
          onClick={handleCelebrate}
          className="px-3 py-1.5 rounded-full bg-accent-light text-accent text-xs font-semibold hover:scale-105 transition-transform flex items-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5" /> Celebrate
        </button>
      </div>

      {/* Main Big Streak Counter */}
      <div className="flex items-baseline gap-3">
        <span className="text-5xl font-extrabold font-serif text-text-primary tracking-tight">
          {stats.currentStreakDays}
        </span>
        <span className="text-sm font-semibold text-accent uppercase tracking-wider">
          Days Streak 🔥
        </span>
      </div>

      {/* Grid Metrics */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/60">
        <div className="flex flex-col">
          <span className="text-[11px] text-text-muted uppercase font-medium flex items-center gap-1">
            <Clock className="w-3 h-3 text-accent" /> Total Time
          </span>
          <span className="text-base font-bold text-text-primary mt-1 font-mono">
            {Math.floor(stats.totalMinutesRead / 60)}h {stats.totalMinutesRead % 60}m
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] text-text-muted uppercase font-medium flex items-center gap-1">
            <BookOpen className="w-3 h-3 text-accent" /> Pages Read
          </span>
          <span className="text-base font-bold text-text-primary mt-1 font-mono">
            {stats.totalPagesRead}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[11px] text-text-muted uppercase font-medium flex items-center gap-1">
            <Trophy className="w-3 h-3 text-amber-500" /> Best Streak
          </span>
          <span className="text-base font-bold text-text-primary mt-1 font-mono">
            {stats.longestStreakDays} Days
          </span>
        </div>
      </div>
    </div>
  );
};
