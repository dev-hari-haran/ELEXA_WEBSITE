import React, { useState } from 'react';
import { ShieldCheck, UploadCloud, Layers, Eye, Bookmark, MessageSquare, Sparkles, TrendingUp } from 'lucide-react';
import { useLibraryStore } from '../../stores/useLibraryStore';
import { UploadMagazineForm } from '../admin/UploadMagazineForm';
import { MagazineAnalyticsTable } from '../admin/MagazineAnalyticsTable';
import { EditMagazineModal } from '../admin/EditMagazineModal';
import { Book } from '../../types/book';

export const AdminView: React.FC = () => {
  const { books } = useLibraryStore();
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'upload'>('upload');
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Compute aggregate stats across magazines
  const totalViews = books.reduce((acc, b) => acc + (b.viewsCount || Math.floor((b.likesCount || 1000) * 2.8 + 450)), 0);
  const totalReach = Math.floor(totalViews * 1.6);
  const totalBookmarks = books.reduce((acc, b) => acc + (b.bookmarksCount || Math.floor((b.likesCount || 1000) * 0.45)), 0);
  const totalComments = books.reduce((acc, b) => acc + (b.commentsCount || Math.floor((b.likesCount || 1000) * 0.12)), 0);

  return (
    <div className="w-full flex-1 flex flex-col gap-8 select-none max-w-6xl">
      {/* Header & Overview Stats */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/60 pb-6">
          <div>
            <div className="flex items-center gap-2 text-accent font-mono text-xs uppercase font-semibold">
              <ShieldCheck className="w-4 h-4" /> Admin Publishing Studio
            </div>
            <h1 className="text-3xl font-display font-bold text-text-primary mt-1">
              Magazine Control & Analytics Studio
            </h1>
            <p className="text-xs text-text-muted mt-1 font-mono">
              Upload PDF issues, customize cover pages, assign authors & editors, schedule releases, and monitor reach.
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-surface border border-border">
            <button
              onClick={() => setActiveAdminTab('upload')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeAdminTab === 'upload'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <UploadCloud className="w-4 h-4" /> Upload & Publish
            </button>
            <button
              onClick={() => setActiveAdminTab('analytics')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                activeAdminTab === 'analytics'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Reach & Manage ({books.length})
            </button>
          </div>
        </div>

        {/* Global Performance Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-surface border border-border/80 flex flex-col gap-1 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-accent" /> Platform Reach
            </span>
            <span className="text-2xl font-display font-bold text-accent">
              {totalReach.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-600 font-mono">+18.4% this month</span>
          </div>

          <div className="p-5 rounded-3xl bg-surface border border-border/80 flex flex-col gap-1 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-emerald-500" /> Total Issue Views
            </span>
            <span className="text-2xl font-display font-bold text-text-primary">
              {totalViews.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted font-mono">Across {books.length} Issues</span>
          </div>

          <div className="p-5 rounded-3xl bg-surface border border-border/80 flex flex-col gap-1 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1.5">
              <Bookmark className="w-3.5 h-3.5 text-amber-500" /> Reader Bookmarks
            </span>
            <span className="text-2xl font-display font-bold text-text-primary">
              {totalBookmarks.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted font-mono">Saved in Kanban</span>
          </div>

          <div className="p-5 rounded-3xl bg-surface border border-border/80 flex flex-col gap-1 shadow-sm">
            <span className="text-[10px] font-mono uppercase text-text-muted flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-sky-500" /> Community Comments
            </span>
            <span className="text-2xl font-display font-bold text-text-primary">
              {totalComments.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted font-mono">Active Discussions</span>
          </div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeAdminTab === 'upload' ? (
        <UploadMagazineForm onSuccess={() => setActiveAdminTab('analytics')} />
      ) : (
        <MagazineAnalyticsTable onEdit={(book) => setEditingBook(book)} />
      )}

      {/* Modify Issue Modal */}
      <EditMagazineModal
        book={editingBook}
        isOpen={Boolean(editingBook)}
        onClose={() => setEditingBook(null)}
      />
    </div>
  );
};
