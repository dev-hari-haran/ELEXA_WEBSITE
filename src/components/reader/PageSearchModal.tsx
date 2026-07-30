import React, { useState } from 'react';
import { X, Search, ChevronRight, BookOpen } from 'lucide-react';
import { Book } from '../../types/book';

interface PageSearchModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onJumpToMatch: (chapterId: string) => void;
}

export const PageSearchModal: React.FC<PageSearchModalProps> = ({ book, isOpen, onClose, onJumpToMatch }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  // Search matches across chapters
  const matches: Array<{ chapterId: string; chapterTitle: string; snippet: string }> = [];

  if (query.trim().length > 1) {
    const qLower = query.toLowerCase();
    book.chapters.forEach((ch) => {
      const cleanText = ch.content.replace(/<[^>]*>?/gm, '');
      const idx = cleanText.toLowerCase().indexOf(qLower);
      if (idx !== -1) {
        const start = Math.max(0, idx - 40);
        const end = Math.min(cleanText.length, idx + 80);
        const snippet = cleanText.substring(start, end);
        matches.push({
          chapterId: ch.id,
          chapterTitle: ch.title,
          snippet: `...${snippet}...`,
        });
      }
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none animate-fadeIn">
      <div className="w-full max-w-lg p-6 rounded-3xl bg-surface border border-border/80 shadow-2xl flex flex-col gap-4 max-h-[80vh]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Search className="w-5 h-5 text-accent" />
            <h3 className="font-serif font-bold text-lg text-text-primary">
              Search Inside Book
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-hover text-text-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Field */}
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type words, phrases, or character names..."
            autoFocus
            className="w-full pl-10 pr-4 py-3 rounded-2xl bg-background border border-border text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-text-muted" />
        </div>

        {/* Matches List */}
        <div className="flex-1 overflow-y-auto flex flex-col gap-2 mt-2">
          {query.trim().length <= 1 ? (
            <p className="text-xs text-text-muted text-center py-6">
              Enter at least 2 characters to search across all chapters.
            </p>
          ) : matches.length === 0 ? (
            <p className="text-xs text-text-muted text-center py-6">
              No occurrences found for "{query}".
            </p>
          ) : (
            matches.map((m, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onJumpToMatch(m.chapterId);
                  onClose();
                }}
                className="p-3 rounded-xl bg-background border border-border/60 text-left hover:border-accent/40 transition-colors flex items-center justify-between group"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-semibold text-accent flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {m.chapterTitle}
                  </span>
                  <p className="text-xs text-text-secondary line-clamp-2">
                    {m.snippet}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
