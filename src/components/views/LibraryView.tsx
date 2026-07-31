import React, { useState } from 'react';
import { Layers, LayoutGrid, Sparkles, Sun, Sunset, Moon, Coffee, BookOpen } from 'lucide-react';
import { Book } from '../../types/book';
import { useLibraryStore } from '../../stores/useLibraryStore';
import { BookCard } from '../bookshelf/BookCard';
import { Bookshelf3D } from '../bookshelf/Bookshelf3D';
import { MOCK_ANNOUNCEMENTS } from '../../data/mockAnnouncements';

interface LibraryViewProps {
  onReadBook: (book: Book) => void;
  onDetailBook: (book: Book) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onReadBook, onDetailBook }) => {
  const { books, viewMode, setViewMode } = useLibraryStore();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Read' | 'Unread' | 'Upcoming'>('All');
  
  // Custom announcements for Library Right Side
  const [announcements] = useState(MOCK_ANNOUNCEMENTS);

  // Time of day setup calculation (Morning 5-11, Afternoon 12-16, Evening 17-20, Night 21-4)
  const currentHour = new Date().getHours();
  let timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Night' = 'Afternoon';
  if (currentHour >= 5 && currentHour < 12) timeOfDay = 'Morning';
  else if (currentHour >= 12 && currentHour < 17) timeOfDay = 'Afternoon';
  else if (currentHour >= 17 && currentHour < 21) timeOfDay = 'Evening';
  else timeOfDay = 'Night';

  // Filter logic: All, Read, Unread, Upcoming
  const filteredBooks = books.filter((b) => {
    if (activeFilter === 'Read') return b.progressPercentage === 100 || b.readingStatus === 'completed';
    if (activeFilter === 'Unread') return b.progressPercentage < 100 && b.readingStatus !== 'completed';
    if (activeFilter === 'Upcoming') return b.isUpcoming || b.publicationYear >= 2026;
    return true;
  });

  return (
    <div className="w-full flex-1 flex flex-col gap-8 select-none">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary">
            Magazine Library Catalog
          </h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Browse published issues, upcoming sneak previews, and library shelf collections.
          </p>
        </div>

        {/* View Mode Switcher (No List View) */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-surface border border-border">
          <button
            onClick={() => setViewMode('bookshelf3d')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'bookshelf3d'
                ? 'bg-background text-accent shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
            title="3D Shelf View"
          >
            <Layers className="w-4 h-4" /> 3D Shelf
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              viewMode === 'grid'
                ? 'bg-background text-accent shadow-sm'
                : 'text-text-muted hover:text-text-primary'
            }`}
            title="Grid View"
          >
            <LayoutGrid className="w-4 h-4" /> Grid
          </button>
        </div>
      </div>

      {/* Category Pills: All, Read, Unread, Upcoming */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['All', 'Read', 'Unread', 'Upcoming'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeFilter === filter
                ? 'bg-accent text-white shadow-md'
                : 'bg-surface border border-border text-text-secondary hover:bg-surface-hover'
            }`}
          >
            {filter} Magazines
          </button>
        ))}
      </div>

      {/* Split Page Layout: Shelf on Left Side (65%), Announcements / Time SVG on Right Side (35%) */}
      <div className="w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: 3D Shelf or Grid */}
        <div className="flex-1">
          {viewMode === 'bookshelf3d' ? (
            <Bookshelf3D books={filteredBooks} onRead={onReadBook} onDetail={onDetailBook} />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onRead={onReadBook}
                  onDetail={onDetailBook}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Side: Announcement Section OR Time-of-Day Reading Setup SVG */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          {announcements.length > 0 ? (
            <div className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-border/60 pb-3">
                <h3 className="font-display font-bold text-base text-text-primary flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent fill-accent" /> Announcements
                </h3>
                <span className="text-xs font-mono text-accent font-semibold">
                  {announcements.length} Alert
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {announcements.map((ann) => (
                  <div key={ann.id} className="p-3.5 rounded-2xl bg-background/60 border border-border/40 flex flex-col gap-1">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-text-primary font-display">{ann.title}</span>
                      <span className="text-[10px] text-text-muted font-mono">{ann.date}</span>
                    </div>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Time-of-Day "Book Reading Setup" SVG Illustration when 0 Announcements */
            <div className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col items-center justify-center text-center gap-4 py-10">
              {timeOfDay === 'Morning' && <Sun className="w-12 h-12 text-amber-500 animate-spin-slow" />}
              {timeOfDay === 'Afternoon' && <Coffee className="w-12 h-12 text-accent" />}
              {timeOfDay === 'Evening' && <Sunset className="w-12 h-12 text-orange-500" />}
              {timeOfDay === 'Night' && <Moon className="w-12 h-12 text-indigo-400" />}

              <div className="flex flex-col gap-1">
                <h3 className="font-display font-semibold text-base text-text-primary">
                  {timeOfDay} Reading Setup
                </h3>
                <p className="text-xs text-text-muted max-w-xs">
                  It is currently {timeOfDay.toLowerCase()} time. Pour a cup of coffee and enjoy your magazine reading room.
                </p>
              </div>

              {/* Dynamic SVG Drawing of Reading Setup */}
              <svg className="w-40 h-28 stroke-accent fill-none stroke-[1.5]" viewBox="0 0 100 80">
                <rect x="20" y="40" width="60" height="30" rx="4" className="stroke-border fill-background" />
                <path d="M30 40 L30 20 C30 10 70 10 70 20 L70 40" />
                <circle cx="50" cy="25" r="8" className="stroke-accent fill-accent-light" />
                <path d="M45 55 L55 55 M50 50 L50 60" />
              </svg>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
