import React, { useState } from 'react';
import { Heart, BookOpen, Star, ArrowUpRight } from 'lucide-react';
import { Book } from '../../types/book';
import { useLibraryStore } from '../../stores/useLibraryStore';

interface BookCardProps {
  book: Book;
  onRead: (book: Book) => void;
  onDetail: (book: Book) => void;
  featured?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onRead, onDetail, featured = false }) => {
  const { toggleFavorite } = useLibraryStore();
  const [transformStyle, setTransformStyle] = useState<string>('');

  // 3D tilt calculation on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTransformStyle(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.04, 1.04, 1.04)`);
  };

  const handleMouseLeave = () => {
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
  };

  return (
    <div
      className={`group relative flex flex-col transition-transform duration-300 ease-out cursor-pointer ${
        featured ? 'w-56' : 'w-48'
      }`}
      onClick={() => onDetail(book)}
    >
      {/* 3D Book Cover Container */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transform: transformStyle }}
        className="relative aspect-[2/3] w-full rounded-xl overflow-hidden shadow-book-3d group-hover:shadow-book-hover transition-all duration-300 bg-surface border border-border/40"
      >
        {/* Cover Image with Automatic Fallback */}
        <img
          src={book.coverImage}
          alt={book.title}
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop';
          }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Spine Highlight overlay */}
        <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(book.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              book.isFavorite
                ? 'bg-rose-500 text-white'
                : 'bg-black/50 text-white hover:bg-black/70'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${book.isFavorite ? 'fill-current' : ''}`} />
          </button>

          <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-white flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" /> {book.rating}
          </span>
        </div>

        {/* Quick Read Hover CTA */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRead(book);
            }}
            className="pointer-events-auto px-4 py-2 rounded-full bg-accent text-white font-medium text-xs flex items-center gap-1.5 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-200"
          >
            <BookOpen className="w-3.5 h-3.5" /> Start Reading <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Title & Author Info */}
      <div className="mt-3 flex flex-col">
        <h3 className="text-sm font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
          {book.title}
        </h3>
        <p className="text-xs text-text-muted mt-0.5 italic line-clamp-1">
          {book.author}
        </p>
      </div>
    </div>
  );
};
