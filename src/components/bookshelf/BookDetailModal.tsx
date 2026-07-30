import React from 'react';
import { X, BookOpen, Bookmark, Share2, Download, Star, ArrowUpRight, ChevronUp, ChevronDown } from 'lucide-react';
import { Book } from '../../types/book';
import { useLibraryStore } from '../../stores/useLibraryStore';

interface BookDetailModalProps {
  book: Book | null;
  onClose: () => void;
  onRead: (book: Book) => void;
}

export const BookDetailModal: React.FC<BookDetailModalProps> = ({ book, onClose, onRead }) => {
  const { toggleFavorite } = useLibraryStore();

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Container Box matching Reference Image 5 design */}
      <div className="relative w-full max-w-4xl bg-surface border border-border/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-background/80 hover:bg-background text-text-muted hover:text-text-primary transition-colors border border-border"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left 3D Book Showcase Area */}
        <div className="w-full md:w-5/12 p-8 flex flex-col items-center justify-center bg-accent-light/30 relative border-b md:border-b-0 md:border-r border-border/60">
          {/* Vertical scroll controls matching reference design */}
          <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2">
            <button className="p-2 rounded-full bg-background/80 hover:bg-background border border-border text-text-muted hover:text-text-primary transition-colors">
              <ChevronUp className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full bg-background/80 hover:bg-background border border-border text-text-muted hover:text-text-primary transition-colors">
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* 3D Book Cover centerpiece */}
          <div className="relative w-56 aspect-[2/3] rounded-xl overflow-hidden shadow-book-hover transform hover:rotate-1 transition-transform duration-300">
            <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover" />
            <div className="absolute top-0 left-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-white/10 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Right Details Area matching Reference Image 5 */}
        <div className="w-full md:w-7/12 p-8 overflow-y-auto flex flex-col gap-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-accent">
              {book.category} • {book.publicationYear}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-text-primary mt-1">
              {book.title}
            </h1>
            <p className="text-sm font-medium text-text-secondary mt-1">
              {book.author}
            </p>
            {book.subtitle && (
              <p className="text-xs text-text-muted italic mt-0.5">
                {book.subtitle}
              </p>
            )}
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onRead(book);
              }}
              className="px-6 py-3 rounded-full bg-text-primary text-background font-medium text-sm flex items-center gap-2 hover:bg-accent hover:text-white transition-all shadow-md"
            >
              Start reading <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => toggleFavorite(book.id)}
              className={`p-3 rounded-full border transition-colors ${
                book.isFavorite
                  ? 'border-rose-500 text-rose-500 bg-rose-50/50'
                  : 'border-border text-text-muted hover:text-text-primary'
              }`}
              title="Bookmark"
            >
              <Bookmark className={`w-4 h-4 ${book.isFavorite ? 'fill-current' : ''}`} />
            </button>

            <button className="p-3 rounded-full border border-border text-text-muted hover:text-text-primary transition-colors" title="Share">
              <Share2 className="w-4 h-4" />
            </button>

            <button className="p-3 rounded-full border border-border text-text-muted hover:text-text-primary transition-colors" title="Download for Offline">
              <Download className="w-4 h-4" />
            </button>
          </div>

          {/* Description & Specs Grid matching Reference Image 5 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border">
            <div className="flex flex-col gap-2">
              <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                Description
              </h4>
              <p className="text-xs leading-relaxed text-text-secondary">
                {book.description}
              </p>

              {/* Reviewer Quote */}
              <div className="mt-4 p-3 rounded-xl bg-background/60 border border-border/60 flex items-start gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
                  alt="Roberto Jordan"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div className="flex flex-col text-[11px]">
                  <span className="font-semibold text-text-primary">Roberto Jordan</span>
                  <p className="text-text-muted italic mt-0.5">
                    "What a delightful and magical book it is! It indeed transports readers to the wizarding world."
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Editors
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {book.editors ? book.editors.join(', ') : book.author}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Language
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {book.language}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-semibold text-text-primary uppercase tracking-wider">
                  Paperback Specs
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  {book.format}
                </p>
                <p className="text-[11px] text-text-muted mt-0.5 font-mono">
                  ISBN: {book.isbn}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
