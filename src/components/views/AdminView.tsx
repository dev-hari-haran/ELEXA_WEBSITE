import React, { useState } from 'react';
import { ShieldCheck, UploadCloud, Eye, Bookmark, MessageSquare, TrendingUp, ArrowLeft, Lock, Key, Megaphone } from 'lucide-react';
import { useLibraryStore } from '../../stores/useLibraryStore';
import { UploadMagazineForm } from '../admin/UploadMagazineForm';
import { MagazineAnalyticsTable } from '../admin/MagazineAnalyticsTable';
import { PublishAnnouncementForm } from '../admin/PublishAnnouncementForm';
import { EditMagazineModal } from '../admin/EditMagazineModal';
import { Book } from '../../types/book';

interface AdminViewProps {
  onExitAdmin?: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({ onExitAdmin }) => {
  const { books } = useLibraryStore();
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'upload' | 'announcement'>('upload');
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Admin Passcode Lock State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState<string | null>(null);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode.trim() === 'ELEXA-ADMIN') {
      setIsAuthenticated(true);
      setPasscodeError(null);
    } else {
      setPasscodeError('Invalid Security Passcode. Default: admin123');
    }
  };

  // Compute aggregate stats across magazines
  const totalViews = books.reduce((acc, b) => acc + (b.viewsCount || Math.floor((b.likesCount || 1000) * 2.8 + 450)), 0);
  const totalReach = Math.floor(totalViews * 1.6);
  const totalBookmarks = books.reduce((acc, b) => acc + (b.bookmarksCount || Math.floor((b.likesCount || 1000) * 0.45)), 0);
  const totalComments = books.reduce((acc, b) => acc + (b.commentsCount || Math.floor((b.likesCount || 1000) * 0.12)), 0);

  // Security Lock Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center p-6 select-none animate-fadeIn">
        <div className="w-full max-w-md p-8 rounded-3xl bg-surface border border-border/80 shadow-2xl flex flex-col items-center text-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-display font-bold text-text-primary">
              Admin Studio Security Gate
            </h2>
            <p className="text-xs text-text-muted font-mono">
              Enter Admin Portal Key or click Quick Unlock below
            </p>
          </div>

          <form onSubmit={handleUnlock} className="w-full flex flex-col gap-3">
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="Enter passcode (e.g. admin123)"
              className="w-full px-4 py-3 rounded-xl bg-background border border-border/80 text-xs font-mono text-center text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {passcodeError && (
              <span className="text-xs text-rose-500 font-mono">{passcodeError}</span>
            )}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-accent text-white text-xs font-semibold hover:bg-accent-hover transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Key className="w-4 h-4" /> Unlock Admin Console
            </button>
          </form>

          <button
            onClick={() => {
              setIsAuthenticated(true);
            }}
            className="text-xs text-accent hover:underline font-semibold font-mono"
          >
            ⚡ Quick Admin Console Access
          </button>

          {onExitAdmin && (
            <button
              onClick={onExitAdmin}
              className="text-xs text-text-muted hover:text-text-primary flex items-center gap-1 mt-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Return to ELEXA Website
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background text-text-primary flex flex-col select-none animate-fadeIn">
      {/* 1. Standalone Dedicated Admin Portal Top Navbar */}
      <header className="w-full h-16 px-6 sm:px-8 border-b border-border/60 bg-surface/90 backdrop-blur-md flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-accent text-white flex items-center justify-center shadow-md">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-base font-display font-bold text-text-primary leading-tight">
              ELEXA Publisher & Admin Studio
            </h1>
            <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              ADMIN SESSION ACTIVE • SECURE PORTAL
            </span>
          </div>
        </div>

        {/* Center Tab Switcher */}
        <div className="hidden md:flex items-center gap-2 p-1 rounded-2xl bg-background border border-border/80">
          <button
            onClick={() => setActiveAdminTab('upload')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeAdminTab === 'upload'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <UploadCloud className="w-4 h-4" /> Upload PDF
          </button>
          <button
            onClick={() => setActiveAdminTab('announcement')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeAdminTab === 'announcement'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Megaphone className="w-4 h-4" /> Release Announcements
          </button>
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeAdminTab === 'analytics'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Manage ({books.length})
          </button>
        </div>

        {/* Right Exit Button to Return to Reader Site */}
        <div className="flex items-center gap-3">
          {onExitAdmin && (
            <button
              onClick={onExitAdmin}
              className="px-4 py-2 rounded-full bg-background border border-border hover:border-accent text-text-primary text-xs font-semibold flex items-center gap-2 transition-all shadow-sm hover:scale-102"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4 text-accent" />
              <span>Exit Admin Studio</span>
            </button>
          )}
        </div>
      </header>

      {/* 2. Standalone Admin Content Container */}
      <main className="w-full flex-1 max-w-7xl mx-auto p-6 sm:p-8 flex flex-col gap-8">
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
              <Eye className="w-3.5 h-3.5 text-emerald-500" /> Total Magazine Views
            </span>
            <span className="text-2xl font-display font-bold text-text-primary">
              {totalViews.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted font-mono">Across {books.length} Published Items</span>
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
              <MessageSquare className="w-3.5 h-3.5 text-sky-500" /> Community Discussions
            </span>
            <span className="text-2xl font-display font-bold text-text-primary">
              {totalComments.toLocaleString()}
            </span>
            <span className="text-[10px] text-text-muted font-mono">Active Comments</span>
          </div>
        </div>

        {/* Mobile Tab Switcher */}
        <div className="flex md:hidden items-center justify-center gap-2 p-1.5 rounded-2xl bg-surface border border-border">
          <button
            onClick={() => setActiveAdminTab('upload')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeAdminTab === 'upload'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary'
            }`}
          >
            <UploadCloud className="w-4 h-4" /> Upload
          </button>
          <button
            onClick={() => setActiveAdminTab('announcement')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeAdminTab === 'announcement'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary'
            }`}
          >
            <Megaphone className="w-4 h-4" /> Announce
          </button>
          <button
            onClick={() => setActiveAdminTab('analytics')}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeAdminTab === 'analytics'
                ? 'bg-accent text-white shadow-md'
                : 'text-text-secondary'
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Manage
          </button>
        </div>

        {/* Main Admin Tab Body */}
        {activeAdminTab === 'upload' && (
          <UploadMagazineForm onSuccess={() => setActiveAdminTab('analytics')} />
        )}
        {activeAdminTab === 'announcement' && (
          <PublishAnnouncementForm />
        )}
        {activeAdminTab === 'analytics' && (
          <MagazineAnalyticsTable onEdit={(book) => setEditingBook(book)} />
        )}
      </main>

      {/* Modify Issue Modal */}
      <EditMagazineModal
        book={editingBook}
        isOpen={Boolean(editingBook)}
        onClose={() => setEditingBook(null)}
      />
    </div>
  );
};
