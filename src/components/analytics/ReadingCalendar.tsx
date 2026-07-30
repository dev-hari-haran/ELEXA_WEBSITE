import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

export const ReadingCalendar: React.FC = () => {
  const days = [
    { day: 'Sun', date: 11, active: false, read: true },
    { day: 'Mon', date: 12, active: false, read: true },
    { day: 'Tue', date: 13, active: true, read: true }, // Active highlighted matching reference design
    { day: 'Wed', date: 14, active: false, read: true },
    { day: 'Thu', date: 15, active: false, read: false },
    { day: 'Fri', date: 16, active: false, read: false },
    { day: 'Sat', date: 17, active: false, read: false },
  ];

  return (
    <div className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-4 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-bold text-base text-text-primary">
            Schedule Reading
          </h3>
        </div>

        <div className="flex items-center gap-1 text-text-muted">
          <button className="p-1 rounded-full hover:bg-surface-hover text-text-secondary">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded-full hover:bg-surface-hover text-text-secondary">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Date Row matching Reference Image 3 */}
      <div className="grid grid-cols-7 gap-2 pt-2 text-center">
        {days.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <span className="text-[11px] font-medium text-text-muted">
              {item.day}
            </span>
            <div
              className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-bold transition-all ${
                item.active
                  ? 'bg-background shadow-md border border-border text-accent ring-2 ring-accent/20 scale-105'
                  : item.read
                  ? 'text-accent font-semibold'
                  : 'text-text-secondary opacity-60'
              }`}
            >
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
