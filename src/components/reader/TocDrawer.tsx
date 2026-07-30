import React, { useState } from 'react';
import { X, BookOpen, Bookmark, Highlighter, FileText, ChevronRight } from 'lucide-react';
import { Book } from '../../types/book';
import { useReaderStore } from '../../stores/useReaderStore';

interface TocDrawerProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
  onSelectChapter: (chapterId: string) => void;
}

export const TocDrawer: React.FC<TocDrawerProps> = ({ book, isOpen, onClose, onSelectChapter }) => {
  const [activeTab, setActiveTab] = useState<'toc' | 'highlights' | 'bookmarks'>('toc');
  const { highlights, bookmarks, activeChapterId } = useReaderStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm select-none animate-fadeIn">
      <div className="w-full max-w-md h-full bg-surface border-l border-border shadow-2xl flex flex-col">
        {/* Top Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="font-serif font-bold text-lg text-text-primary">
              {book.title}
            </h3>
            <span className="text-xs text-text-muted mt-0.5">
              {book.chapters.length} Chapters • {book.totalPages} Pages
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-hover text-text-muted hover:text-text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-background/50">
          <button
            onClick={() => setActiveTab('toc')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'toc'
                ? 'border-accent text-accent bg-surface'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Chapters
          </button>

          <button
            onClick={() => setActiveTab('highlights')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'highlights'
                ? 'border-accent text-accent bg-surface'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <Highlighter className="w-3.5 h-3.5" /> Highlights ({highlights.length})
          </button>

          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-2 border-b-2 transition-colors ${
              activeTab === 'bookmarks'
                ? 'border-accent text-accent bg-surface'
                : 'border-transparent text-text-muted hover:text-text-primary'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Bookmarks ({bookmarks.length})
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {activeTab === 'toc' &&
            book.chapters.map((ch) => {
              const isActive = activeChapterId === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => {
                    onSelectChapter(ch.id);
                    onClose();
                  }}
                  className={`w-full p-4 rounded-xl text-left flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-accent-light border border-accent/30 text-accent font-semibold'
                      : 'hover:bg-surface-hover text-text-primary border border-transparent'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{ch.title}</span>
                    <span className="text-xs text-text-muted mt-0.5">
                      {ch.estimatedMinutes} min read • {ch.wordCount} words
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 ${isActive ? 'text-accent' : 'text-text-muted'}`} />
                </button>
              );
            })}

          {activeTab === 'highlights' &&
            (highlights.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-xs">
                No highlights created yet. Select text in the reader to highlight quotes.
              </div>
            ) : (
              highlights.map((h) => (
                <div key={h.id} className="p-4 rounded-xl bg-background border border-border/80 flex flex-col gap-2">
                  <span className="text-xs italic text-text-primary border-l-2 border-accent pl-2.5">
                    "{h.selectedText}"
                  </span>
                  {h.note && (
                    <p className="text-xs text-text-secondary font-medium bg-surface p-2 rounded-lg">
                      Note: {h.note}
                    </p>
                  )}
                  <span className="text-[10px] text-text-muted self-end">
                    {new Date(h.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ))}

          {activeTab === 'bookmarks' &&
            (bookmarks.length === 0 ? (
              <div className="p-8 text-center text-text-muted text-xs">
                No page bookmarks saved. Click the bookmark icon in the toolbar to save one.
              </div>
            ) : (
              bookmarks.map((bm) => (
                <div key={bm.id} className="p-4 rounded-xl bg-background border border-border/80 flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-semibold text-text-primary">
                    <span>{bm.chapterTitle}</span>
                    <span className="font-mono text-accent">Page {bm.pageNumber}</span>
                  </div>
                  <p className="text-xs text-text-muted truncate mt-1">{bm.snippet}</p>
                </div>
              ))
            ))}
        </div>
      </div>
    </div>
  );
};
