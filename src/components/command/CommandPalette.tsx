import React, { useState } from 'react';
import { Search, BookOpen, Sun, Moon, Clock, Bookmark, Settings, ArrowRight, Zap, X } from 'lucide-react';
import { useCommandStore } from '../../stores/useCommandStore';
import { useLibraryStore } from '../../stores/useLibraryStore';
import { useThemeStore } from '../../stores/useThemeStore';
import { useReaderStore } from '../../stores/useReaderStore';
import { Book } from '../../types/book';

interface CommandPaletteProps {
  onSelectBook: (book: Book) => void;
  onNavigateTab: (tab: 'home' | 'library' | 'reader' | 'analytics' | 'notes' | 'settings') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ onSelectBook, onNavigateTab }) => {
  const { isOpen, closeCommandPalette } = useCommandStore();
  const { books } = useLibraryStore();
  const { setTheme } = useThemeStore();
  const { updateSettings, settings } = useReaderStore();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const filteredBooks = books.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.author.toLowerCase().includes(query.toLowerCase()) ||
      b.category.toLowerCase().includes(query.toLowerCase())
  );

  const actions = [
    {
      id: 'nav-home',
      label: 'Go to Home Dashboard',
      icon: BookOpen,
      action: () => {
        onNavigateTab('home');
        closeCommandPalette();
      },
    },
    {
      id: 'nav-library',
      label: 'Open Library Catalog',
      icon: BookOpen,
      action: () => {
        onNavigateTab('library');
        closeCommandPalette();
      },
    },
    {
      id: 'theme-cream',
      label: 'Switch Theme: Cream (Warm Paper)',
      icon: Sun,
      action: () => {
        setTheme('cream');
        closeCommandPalette();
      },
    },
    {
      id: 'theme-sepia',
      label: 'Switch Theme: Sepia',
      icon: Sun,
      action: () => {
        setTheme('sepia');
        closeCommandPalette();
      },
    },
    {
      id: 'theme-dark',
      label: 'Switch Theme: Dark Slate',
      icon: Moon,
      action: () => {
        setTheme('dark');
        closeCommandPalette();
      },
    },
    {
      id: 'toggle-zen',
      label: `Toggle Zen Mode (Currently ${settings.zenMode ? 'ON' : 'OFF'})`,
      icon: Zap,
      action: () => {
        updateSettings({ zenMode: !settings.zenMode });
        closeCommandPalette();
      },
    },
  ];

  const filteredActions = actions.filter((a) =>
    a.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/60 backdrop-blur-md select-none animate-fadeIn">
      <div className="w-full max-w-xl bg-surface border border-border/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
        {/* Search Bar */}
        <div className="p-4 border-b border-border/60 flex items-center gap-3">
          <Search className="w-5 h-5 text-accent" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search books, or change settings... (⌘K)"
            autoFocus
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
          />
          <button
            onClick={closeCommandPalette}
            className="p-1.5 rounded-full hover:bg-surface-hover text-text-muted"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
          {/* Books Section */}
          {filteredBooks.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-3 py-1">
                Books ({filteredBooks.length})
              </span>
              {filteredBooks.map((b) => (
                <button
                  key={b.id}
                  onClick={() => {
                    onSelectBook(b);
                    closeCommandPalette();
                  }}
                  className="w-full px-3 py-2.5 rounded-xl hover:bg-surface-hover flex items-center justify-between transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={b.coverImage}
                      alt={b.title}
                      className="w-7 h-10 object-cover rounded shadow-sm"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-text-primary group-hover:text-accent transition-colors">
                        {b.title}
                      </span>
                      <span className="text-[11px] text-text-muted">{b.author}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
                </button>
              ))}
            </div>
          )}

          {/* Quick Actions Section */}
          {filteredActions.length > 0 && (
            <div className="flex flex-col gap-1 pt-2 border-t border-border/40">
              <span className="text-[10px] font-semibold text-text-muted uppercase tracking-wider px-3 py-1">
                Commands & Settings
              </span>
              {filteredActions.map((a) => {
                const Icon = a.icon;
                return (
                  <button
                    key={a.id}
                    onClick={a.action}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-surface-hover flex items-center justify-between transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-background text-text-secondary group-hover:text-accent">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-medium text-text-primary">
                        {a.label}
                      </span>
                    </div>
                    <kbd className="px-2 py-0.5 text-[10px] font-mono text-text-muted bg-background rounded border border-border">
                      ↵ Enter
                    </kbd>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
