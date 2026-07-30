import React from 'react';
import { Book } from '../../types/book';
import { BookOpen, Layers } from 'lucide-react';

interface Bookshelf3DProps {
  books: Book[];
  onRead: (book: Book) => void;
  onDetail: (book: Book) => void;
}

export const Bookshelf3D: React.FC<Bookshelf3DProps> = ({ books, onRead, onDetail }) => {
  // Each shelf row contains EXACTLY 3 books/magazines
  const shelfRows: Book[][] = [];
  for (let i = 0; i < books.length; i += 3) {
    shelfRows.push(books.slice(i, i + 3));
  }

  return (
    <div className="w-full flex flex-col gap-10 py-2 select-none">
      {shelfRows.map((row, rowIdx) => (
        <div key={rowIdx} className="relative flex flex-col items-center">
          {/* Magazine Spines Row (Exactly 3 Magazines per Shelf Row) */}
          <div className="w-full flex items-end justify-around px-4 z-10 gap-4 min-h-[180px]">
            {row.map((book) => {
              const spineBg = book.spineColor || '#1E4D3B';
              return (
                <div
                  key={book.id}
                  onClick={() => onDetail(book)}
                  className="flex-1 max-w-[140px] h-44 rounded-lg shadow-xl cursor-pointer transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 relative overflow-hidden border border-white/20 flex flex-col justify-between p-3 text-white"
                  style={{ backgroundColor: spineBg }}
                >
                  {/* Decorative Spine Texture & Ribs */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-black/20 border-r border-white/10" />
                  <div className="absolute top-3 inset-x-0 h-[1px] bg-white/30" />
                  <div className="absolute bottom-3 inset-x-0 h-[1px] bg-white/30" />

                  {/* Title & Edition on Spine Face */}
                  <div className="z-10 pl-2 pt-2 flex flex-col">
                    <span className="text-[9px] font-mono uppercase tracking-widest opacity-80 line-clamp-1">
                      {book.edition || 'Ed. 2026'}
                    </span>
                    <h3 className="text-xs font-display font-bold leading-snug line-clamp-3 mt-1">
                      {book.title}
                    </h3>
                  </div>

                  {/* Author & Read Action */}
                  <div className="z-10 pl-2 pb-1 flex items-center justify-between">
                    <span className="text-[10px] font-mono opacity-90 line-clamp-1">
                      {book.author}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRead(book);
                      }}
                      className="p-1 rounded-full bg-white/20 hover:bg-white text-white hover:text-black transition-colors"
                      title="Read Issue"
                    >
                      <BookOpen className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3D Wooden Shelf Platform */}
          <div className="w-full h-5 mt-1 bg-gradient-to-r from-amber-900/30 via-amber-800/60 to-amber-900/30 rounded-md border-t border-amber-500/40 shadow-2xl relative">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-white/20" />
            <div className="absolute inset-x-0 bottom-0 h-2 bg-black/30 blur-sm transform translate-y-2" />
          </div>
        </div>
      ))}
    </div>
  );
};
