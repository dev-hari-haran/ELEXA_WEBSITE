import React, { useState } from 'react';
import { Bookmark, Highlighter, Download, Copy, Trash2, Tag, Search, Sparkles } from 'lucide-react';
import { useReaderStore } from '../../stores/useReaderStore';

export const NotesView: React.FC = () => {
  const { highlights, bookmarks, removeHighlight } = useReaderStore();
  const [filterColor, setFilterColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredHighlights = highlights.filter((h) => {
    const matchesColor = !filterColor || h.color === filterColor;
    const matchesSearch = h.selectedText.toLowerCase().includes(searchQuery.toLowerCase()) || (h.note && h.note.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesColor && matchesSearch;
  });

  const exportMarkdown = () => {
    const content = highlights
      .map((h) => `> "${h.selectedText}"\n${h.note ? `*Note: ${h.note}*\n` : ''}\n---`)
      .join('\n\n');
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'elexa-highlights-export.md';
    a.click();
  };

  return (
    <div className="w-full flex-1 flex flex-col gap-8 select-none">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">
            Bookmarks & Highlights Hub
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Organize, tag, export, and search through all your reading annotations.
          </p>
        </div>

        <button
          onClick={exportMarkdown}
          className="px-4 py-2.5 rounded-full bg-accent text-white font-semibold text-xs flex items-center gap-2 shadow-md hover:scale-105 transition-transform"
        >
          <Download className="w-4 h-4" /> Export as Markdown (.md)
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-border">
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes & quotes..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-background border border-border text-xs text-text-primary focus:outline-none focus:ring-1 focus:ring-accent"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-text-muted" />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-text-muted">Color Filter:</span>
          {['all', 'pink', 'yellow', 'green', 'blue', 'purple'].map((c) => (
            <button
              key={c}
              onClick={() => setFilterColor(c === 'all' ? null : c)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                (c === 'all' && !filterColor) || filterColor === c
                  ? 'bg-accent text-white'
                  : 'bg-background border border-border text-text-secondary hover:bg-surface-hover'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHighlights.map((h) => (
          <div key={h.id} className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-4 relative group">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-accent-light text-accent text-[10px] font-bold uppercase tracking-wider">
                {h.color} highlight
              </span>
              <button
                onClick={() => removeHighlight(h.id)}
                className="p-1.5 rounded-full hover:bg-rose-500/10 text-text-muted hover:text-rose-500 transition-colors"
                title="Delete Highlight"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <blockquote className="text-sm font-serif italic text-text-primary border-l-3 border-accent pl-3 leading-relaxed">
              "{h.selectedText}"
            </blockquote>

            {h.note && (
              <div className="p-3 rounded-xl bg-background border border-border/60 text-xs text-text-secondary">
                <span className="font-semibold text-accent">Note:</span> {h.note}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 text-[11px] text-text-muted">
              <span className="flex items-center gap-1">
                <Tag className="w-3 h-3 text-accent" /> {h.tags.join(', ')}
              </span>
              <span>{new Date(h.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
