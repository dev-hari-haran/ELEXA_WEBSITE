import React, { useState } from 'react';
import { Eye, Bookmark, MessageSquare, Edit3, Trash2, TrendingUp, Sparkles, X } from 'lucide-react';
import { Book } from '../../types/book';
import { useLibraryStore } from '../../stores/useLibraryStore';

interface MagazineAnalyticsTableProps {
  onEdit: (book: Book) => void;
}

export const MagazineAnalyticsTable: React.FC<MagazineAnalyticsTableProps> = ({ onEdit }) => {
  const { books, deleteBook } = useLibraryStore();
  const [selectedReachBook, setSelectedReachBook] = useState<Book | null>(null);

  const handleDelete = (book: Book) => {
    if (confirm(`Delete "${book.title}" from platform?`)) {
      deleteBook(book.id);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 select-none">
      {/* Table Container */}
      <div className="w-full overflow-x-auto rounded-3xl border border-border/80 bg-surface shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/70 bg-background/50 text-[11px] font-mono uppercase text-text-muted">
              <th className="py-4 px-6">Magazine Issue</th>
              <th className="py-4 px-4">Status</th>
              <th className="py-4 px-4">Total Reach / Views</th>
              <th className="py-4 px-4">Bookmarks</th>
              <th className="py-4 px-4">Comments</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60 text-xs">
            {books.map((book) => {
              const views = book.viewsCount || Math.floor((book.likesCount || 1000) * 2.8 + 450);
              const bookmarksCount = book.bookmarksCount || Math.floor((book.likesCount || 1000) * 0.45);
              const commentsCount = book.commentsCount || Math.floor((book.likesCount || 1000) * 0.12);

              return (
                <tr key={book.id} className="hover:bg-background/40 transition-colors group">
                  {/* Title & Cover */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-10 h-14 object-cover rounded-lg shadow-sm border border-border/60"
                      />
                      <div className="flex flex-col">
                        <span className="font-display font-semibold text-text-primary group-hover:text-accent transition-colors line-clamp-1">
                          {book.title}
                        </span>
                        <span className="text-[10px] text-accent font-mono">
                          {book.edition || 'Special Issue'} • By {book.author}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {book.isScheduled ? (
                      <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 text-[10px] font-mono font-bold border border-amber-500/20">
                        Scheduled ({book.scheduledReleaseDate || 'Aug 2026'})
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-[10px] font-mono font-bold border border-emerald-500/20">
                        Published Live
                      </span>
                    )}
                  </td>

                  {/* Reach / Views */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedReachBook(book)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-background border border-border text-xs font-mono font-bold text-text-primary hover:border-accent hover:text-accent transition-colors"
                      title="Click to view reach breakdown"
                    >
                      <Eye className="w-3.5 h-3.5 text-accent" />
                      {views.toLocaleString()}
                      <TrendingUp className="w-3 h-3 text-emerald-500 ml-1" />
                    </button>
                  </td>

                  {/* Bookmarks */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-text-secondary font-mono">
                      <Bookmark className="w-3.5 h-3.5 text-amber-500" />
                      {bookmarksCount.toLocaleString()}
                    </span>
                  </td>

                  {/* Comments */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 text-text-secondary font-mono">
                      <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
                      {commentsCount.toLocaleString()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onEdit(book)}
                        className="px-3 py-1.5 rounded-xl bg-background border border-border text-xs font-semibold text-text-primary hover:bg-accent hover:text-white transition-all flex items-center gap-1"
                        title="Modify Issue Details"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Modify
                      </button>
                      <button
                        onClick={() => handleDelete(book)}
                        className="p-1.5 rounded-xl hover:bg-rose-500/10 text-text-muted hover:text-rose-500 transition-colors"
                        title="Delete Issue"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reach Breakdown Modal */}
      {selectedReachBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-surface border border-border rounded-3xl shadow-elevation p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2 font-display font-semibold text-lg text-text-primary">
                <Sparkles className="w-5 h-5 text-accent fill-accent" /> Reach Analytics: {selectedReachBook.title}
              </div>
              <button onClick={() => setSelectedReachBook(null)} className="p-1.5 rounded-full hover:bg-surface-hover text-text-muted">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-background border border-border/60 flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase">Total Impressions</span>
                <span className="text-xl font-display font-bold text-accent mt-1">
                  {((selectedReachBook.viewsCount || 15000) * 1.6).toLocaleString()}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-border/60 flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase">Unique Readers</span>
                <span className="text-xl font-display font-bold text-emerald-600 mt-1">
                  {(selectedReachBook.viewsCount || 15000).toLocaleString()}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-border/60 flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase">Avg. Read Duration</span>
                <span className="text-xl font-display font-bold text-text-primary mt-1">
                  18.4 Mins
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-background border border-border/60 flex flex-col">
                <span className="text-[10px] font-mono text-text-muted uppercase">Completion Rate</span>
                <span className="text-xl font-display font-bold text-sky-500 mt-1">
                  74.2%
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedReachBook(null)}
              className="w-full py-2.5 rounded-xl bg-accent text-white font-semibold text-xs hover:bg-accent-hover transition-colors"
            >
              Close Analytics Panel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
