import React from 'react';
import { Book } from '../../types/book';
import { BookCard } from './BookCard';
import { Layers, Grid, Sparkles } from 'lucide-react';

interface Bookshelf3DProps {
  books: Book[];
  onRead: (book: Book) => void;
  onDetail: (book: Book) => void;
}

export const Bookshelf3D: React.FC<Bookshelf3DProps> = ({ books, onRead, onDetail }) => {
  // Chunk books into shelves of 4
  const shelfRows: Book[][] = [];
  for (let i = 0; i < books.length; i += 4) {
    shelfRows.push(books.slice(i, i + 4));
  }

  return (
    <div className="w-full flex flex-col gap-12 py-4 select-none">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-serif font-bold text-text-primary">
            Interactive 3D Bookshelf
          </h2>
          <span className="px-2.5 py-0.5 rounded-full bg-accent-light text-accent text-xs font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Spatial View
          </span>
        </div>
      </div>

      {shelfRows.map((row, rowIdx) => (
        <div key={rowIdx} className="relative flex flex-col items-center">
          {/* Books Row */}
          <div className="flex items-end justify-center gap-8 sm:gap-12 px-8 z-10">
            {row.map((book) => (
              <div key={book.id} className="transform transition-transform hover:-translate-y-2 duration-300">
                <BookCard book={book} onRead={onRead} onDetail={onDetail} />
              </div>
            ))}
          </div>

          {/* 3D Shelf Wooden Platform with Drop Shadow matching reference style */}
          <div className="w-full max-w-5xl h-5 mt-2 bg-gradient-to-r from-amber-900/20 via-amber-800/40 to-amber-900/20 rounded-md border-t border-amber-600/30 shadow-2xl relative">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
            <div className="absolute inset-x-0 bottom-0 h-2 bg-black/20 blur-sm transform translate-y-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
