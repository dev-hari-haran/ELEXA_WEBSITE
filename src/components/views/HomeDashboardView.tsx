import React from 'react';
import { BookOpen, ArrowUpRight, Sparkles, Flame, Clock } from 'lucide-react';
import { Book } from '../../types/book';
import { BookCard } from '../bookshelf/BookCard';
import { ReadingCalendar } from '../analytics/ReadingCalendar';
import { MOCK_FRIENDS } from '../../data/mockFriends';

interface HomeDashboardViewProps {
  books: Book[];
  onReadBook: (book: Book) => void;
  onDetailBook: (book: Book) => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  books,
  onReadBook,
  onDetailBook,
}) => {
  // Find current active book (e.g. Harry Potter or Fire & Blood)
  const currentReadingBook = books.find((b) => b.id === 'hp-6') || books[0];
  const popularBooks = books.slice(1, 5);

  return (
    <div className="w-full flex-1 flex flex-col xl:flex-row gap-8 select-none">
      {/* Left Main Content Column matching Reference Images 2 & 3 */}
      <div className="flex-1 flex flex-col gap-8">
        {/* Spotlight Hero Banner matching Reference Images 2 & 3 */}
        <div className="p-8 rounded-3xl bg-surface border border-border/80 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Subtle gradient glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-light/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="flex flex-col gap-4 max-w-md z-10">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-text-primary leading-tight">
              Happy reading, <br />
              <span className="text-accent">Harvey</span>
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              Wow! You've delved deep into the wizarding world's secrets. Continue reading your last book and immerse yourself.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => onReadBook(currentReadingBook)}
                className="px-6 py-3 rounded-full bg-text-primary text-background font-semibold text-sm flex items-center gap-2 hover:bg-accent hover:text-white transition-all shadow-md group"
              >
                Start reading <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <span className="text-xs font-mono text-text-muted font-medium">
                {currentReadingBook.currentPage} / {currentReadingBook.totalPages} pages
              </span>
            </div>
          </div>

          {/* 3D Open Book Showcase Graphic matching Reference Image 3 centerpiece */}
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 cursor-pointer" onClick={() => onReadBook(currentReadingBook)}>
            <div className="w-64 h-44 rounded-xl bg-background border border-border/80 shadow-2xl p-4 flex items-center gap-4 transform rotate-1">
              <img
                src={currentReadingBook.coverImage}
                alt={currentReadingBook.title}
                className="w-24 h-full object-cover rounded shadow-md"
              />
              <div className="flex flex-col justify-between h-full py-1">
                <div className="flex flex-col">
                  <span className="text-[10px] font-semibold uppercase text-accent">Current Chapter</span>
                  <h4 className="text-xs font-bold text-text-primary line-clamp-2 mt-0.5">
                    {currentReadingBook.chapters[1]?.title || 'Spinner\'s End'}
                  </h4>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-[10px] font-mono text-text-muted">
                    <span>Progress</span>
                    <span>{currentReadingBook.progressPercentage}%</span>
                  </div>
                  <div className="w-28 h-1 bg-surface-hover rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${currentReadingBook.progressPercentage}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Now Carousel Section matching Reference Images 2 & 4 */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif font-bold text-text-primary">
              Popular Now
            </h2>
            <span className="text-xs text-text-muted font-mono font-medium">
              04 / 60 books
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {popularBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onRead={onReadBook}
                onDetail={onDetailBook}
              />
            ))}
          </div>
        </div>

        {/* New Series Collection Banner matching Reference Image 3 bottom banner */}
        <div className="p-6 rounded-3xl bg-surface border border-border/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-20 rounded-lg overflow-hidden shadow-md flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=200&auto=format&fit=crop"
                alt="Collection"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">New Collection</span>
              <h3 className="text-base font-bold text-text-primary">
                A Legend of Ice and Fire: The Ice Horse
              </h3>
              <span className="text-xs text-text-muted mt-0.5">8 chapters each vol • 2 vol</span>
            </div>
          </div>

          <button
            onClick={() => onDetailBook(books[1])}
            className="px-4 py-2 rounded-full bg-background border border-border text-xs font-semibold text-text-primary hover:bg-surface-hover transition-colors"
          >
            Explore Collection
          </button>
        </div>
      </div>

      {/* Right Widget Sidebar Column matching Reference Image 3 */}
      <div className="w-full xl:w-80 flex flex-col gap-8">
        {/* Schedule Reading Widget */}
        <ReadingCalendar />

        {/* Reader Friends Community Feed matching Reference Image 3 */}
        <div className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-text-primary">
              Reader Friends
            </h3>
            <span className="text-xs text-accent font-medium cursor-pointer">View all</span>
          </div>

          <div className="flex flex-col gap-4">
            {MOCK_FRIENDS.map((friend) => (
              <div key={friend.id} className="flex items-start gap-3 p-3 rounded-2xl bg-background/60 border border-border/40">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-border/80"
                />
                <div className="flex flex-col text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-text-primary">{friend.name}</span>
                    <span className="text-[10px] text-text-muted">{friend.timestamp}</span>
                  </div>
                  <p className="text-text-secondary italic mt-1 line-clamp-2">
                    "{friend.comment}"
                  </p>
                  <span className="text-[10px] font-medium text-accent mt-1">
                    ✓ {friend.chapterTitle}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
