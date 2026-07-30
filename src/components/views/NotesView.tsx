import React, { useState } from 'react';
import { Bookmark as BookmarkIcon, Search, Trash2, Tag, BookOpen, Layers } from 'lucide-react';
import { useReaderStore } from '../../stores/useReaderStore';

export const NotesView: React.FC = () => {
  const { highlights, bookmarks, removeHighlight } = useReaderStore();
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sample initial kanban categories for bookmarks
  const initialBookmarkColumns = {
    to_read: [
      { id: 'bm-1', title: 'Vogue Editorial: Hogwarts Arcana', pageNumber: 42, snippet: 'The ancient runes engraved upon the high archway of Spinner\'s End.', date: '2026-07-30' },
      { id: 'bm-2', title: 'Architectural Digest 2027', pageNumber: 14, snippet: 'Minimalist Scandinavian concrete interiors paired with organic oak.', date: '2026-07-29' },
    ],
    in_progress: [
      { id: 'bm-3', title: 'Dragonlord Chronicle: Fire & Blood', pageNumber: 154, snippet: 'Aegon\'s conquest from Dragonstone upon Balerion the Black Dread.', date: '2026-07-31' },
      ...(bookmarks.map(bm => ({
        id: bm.id,
        title: bm.chapterTitle || 'Saved Bookmark',
        pageNumber: bm.pageNumber || 1,
        snippet: bm.snippet || 'Selected reading passage',
        date: new Date(bm.createdAt).toLocaleDateString(),
      })))
    ],
    completed: [
      { id: 'bm-4', title: 'The Narnia Dispatch: Winter Wardrobe', pageNumber: 208, snippet: 'The lion stood tall upon the stone table as the dawn broke.', date: '2026-07-28' },
    ]
  };

  const [kanbanColumns, setKanbanColumns] = useState(initialBookmarkColumns);

  // Color ball definitions
  const colorBalls = [
    { id: 'all', bg: 'bg-gradient-to-tr from-accent to-amber-500', ring: 'ring-accent', label: 'All Colors' },
    { id: 'yellow', bg: 'bg-amber-400', ring: 'ring-amber-400', label: 'Yellow' },
    { id: 'green', bg: 'bg-emerald-400', ring: 'ring-emerald-400', label: 'Green' },
    { id: 'pink', bg: 'bg-rose-400', ring: 'ring-rose-400', label: 'Pink' },
    { id: 'blue', bg: 'bg-sky-400', ring: 'ring-sky-400', label: 'Blue' },
    { id: 'purple', bg: 'bg-purple-400', ring: 'ring-purple-400', label: 'Purple' },
  ];

  const filteredHighlights = highlights.filter((h) => {
    const matchesColor = !filterColor || h.color === filterColor;
    const matchesSearch = h.selectedText.toLowerCase().includes(searchQuery.toLowerCase()) || (h.note && h.note.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesColor && matchesSearch;
  });

  return (
    <div className="w-full flex-1 flex flex-col gap-10 select-none">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-text-primary flex items-center gap-3">
            <BookmarkIcon className="w-7 h-7 text-accent" />
            Bookmarks & Kanban Workspace
          </h1>
          <p className="text-xs text-text-muted mt-1 font-mono">
            Organize reading status, filter quotes with color balls, and manage chapter bookmarks.
          </p>
        </div>

        {/* Color Balls Filter (Replaces Letter Filter) */}
        <div className="flex items-center gap-3 p-2.5 rounded-2xl bg-surface border border-border">
          <span className="text-xs font-mono text-text-muted font-medium pl-1">
            Color Balls:
          </span>
          <div className="flex items-center gap-2">
            {colorBalls.map((ball) => {
              const isSelected = (ball.id === 'all' && !filterColor) || filterColor === ball.id;
              return (
                <button
                  key={ball.id}
                  onClick={() => setFilterColor(ball.id === 'all' ? null : ball.id)}
                  className={`w-6 h-6 rounded-full ${ball.bg} transition-all relative ${
                    isSelected ? `ring-4 ${ball.ring}/30 scale-110 shadow-md` : 'opacity-70 hover:opacity-100'
                  }`}
                  title={ball.label}
                >
                  {isSelected && (
                    <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Kanban Board Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-2">
            <Layers className="w-5 h-5 text-accent" /> Bookmark Kanban Board
          </h2>
          <span className="text-xs font-mono text-text-muted">
            Drag / Track Reading Progress
          </span>
        </div>

        {/* 3 Columns: To Read / In Progress / Completed */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: To Read */}
          <div className="p-4 rounded-3xl bg-surface border border-border/80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-border/60">
              <span className="font-display font-semibold text-sm text-text-primary flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> To Read
              </span>
              <span className="text-xs font-mono text-text-muted font-bold">
                {kanbanColumns.to_read.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {kanbanColumns.to_read.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-background border border-border/80 shadow-sm flex flex-col gap-2 hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-accent font-semibold flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Read Page {item.pageNumber}
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-display font-bold text-text-primary">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary italic line-clamp-2 leading-relaxed">
                    "{item.snippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: In Progress */}
          <div className="p-4 rounded-3xl bg-surface border border-border/80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-border/60">
              <span className="font-display font-semibold text-sm text-text-primary flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" /> In Progress
              </span>
              <span className="text-xs font-mono text-text-muted font-bold">
                {kanbanColumns.in_progress.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {kanbanColumns.in_progress.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-background border border-border/80 shadow-sm flex flex-col gap-2 hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-accent font-semibold flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Read Page {item.pageNumber}
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-display font-bold text-text-primary">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary italic line-clamp-2 leading-relaxed">
                    "{item.snippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Completed */}
          <div className="p-4 rounded-3xl bg-surface border border-border/80 flex flex-col gap-4">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-border/60">
              <span className="font-display font-semibold text-sm text-text-primary flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Completed
              </span>
              <span className="text-xs font-mono text-text-muted font-bold">
                {kanbanColumns.completed.length}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {kanbanColumns.completed.map((item) => (
                <div key={item.id} className="p-4 rounded-2xl bg-background border border-border/80 shadow-sm flex flex-col gap-2 hover:border-accent/40 transition-colors">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono text-emerald-600 font-semibold flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Read Page {item.pageNumber}
                    </span>
                    <span className="text-[10px] text-text-muted font-mono">{item.date}</span>
                  </div>
                  <h4 className="text-xs font-display font-bold text-text-primary">
                    {item.title}
                  </h4>
                  <p className="text-xs text-text-secondary italic line-clamp-2 leading-relaxed">
                    "{item.snippet}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <div className="flex flex-col gap-4 pt-4 border-t border-border/60">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-display font-bold text-text-primary">
            Text Highlights & Annotations
          </h2>
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search highlights..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-border text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-text-muted" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredHighlights.map((h) => (
            <div key={h.id} className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-4 relative group">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-accent-light text-accent text-[10px] font-mono font-bold uppercase tracking-wider">
                  {h.color} ball highlight
                </span>
                <button
                  onClick={() => removeHighlight(h.id)}
                  className="p-1.5 rounded-full hover:bg-rose-500/10 text-text-muted hover:text-rose-500 transition-colors"
                  title="Delete Highlight"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <blockquote className="text-sm font-reader italic text-text-primary border-l-3 border-accent pl-3 leading-relaxed">
                "{h.selectedText}"
              </blockquote>

              {h.note && (
                <div className="p-3 rounded-xl bg-background border border-border/60 text-xs text-text-secondary">
                  <span className="font-semibold text-accent font-mono">Note:</span> {h.note}
                </div>
              )}

              <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-text-muted">
                <span className="flex items-center gap-1">
                  <Tag className="w-3 h-3 text-accent" /> {h.tags.join(', ')}
                </span>
                <span>{new Date(h.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
