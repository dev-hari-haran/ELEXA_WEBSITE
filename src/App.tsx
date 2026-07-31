import React, { useState, useEffect } from 'react';
import { NavigationRail } from './components/layout/NavigationRail';
import { HeaderBar } from './components/layout/HeaderBar';
import { HomeDashboardView } from './components/views/HomeDashboardView';
import { LibraryView } from './components/views/LibraryView';
import { ReaderContainer } from './components/reader/ReaderContainer';
import { NotesView } from './components/views/NotesView';
import { AnalyticsView } from './components/views/AnalyticsView';
import { SettingsView } from './components/views/SettingsView';
import { AdminView } from './components/views/AdminView';
import { BookDetailModal } from './components/bookshelf/BookDetailModal';

import { useLibraryStore } from './stores/useLibraryStore';
import { useReaderStore } from './stores/useReaderStore';
import { useThemeStore } from './stores/useThemeStore';
import { useCircadian } from './hooks/useCircadian';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Book } from './types/book';

export function App() {
  // Determine if initial URL path is /admin
  const initialIsAdmin = typeof window !== 'undefined' && window.location.pathname.toLowerCase().startsWith('/admin');

  const [activeTab, setActiveTabState] = useState<'home' | 'library' | 'reader' | 'analytics' | 'notes' | 'settings' | 'admin'>(
    initialIsAdmin ? 'admin' : 'home'
  );

  const { books, selectedBookDetail, openBookDetail } = useLibraryStore();
  const { activeBookId, setActiveBook } = useReaderStore();
  const { theme } = useThemeStore();

  // Helper to switch active tab and sync browser URL path (/admin vs /)
  const handleTabChange = (tab: 'home' | 'library' | 'reader' | 'analytics' | 'notes' | 'settings' | 'admin') => {
    setActiveTabState(tab);
    if (tab === 'admin') {
      if (window.location.pathname.toLowerCase() !== '/admin') {
        window.history.pushState({}, '', '/admin');
      }
    } else {
      if (window.location.pathname.toLowerCase() === '/admin') {
        window.history.pushState({}, '', '/');
      }
    }
  };

  // Sync tab state on browser back/forward buttons (popstate)
  useEffect(() => {
    const handlePopState = () => {
      const isAdmin = window.location.pathname.toLowerCase().startsWith('/admin');
      setActiveTabState(isAdmin ? 'admin' : 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize circadian timer & keyboard shortcuts
  useCircadian();
  useKeyboardShortcuts();

  // Sync theme attribute on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Current active book for Reader
  const activeBook = books.find((b) => b.id === activeBookId) || books[0];

  const handleStartReading = (book: Book) => {
    setActiveBook(book.id);
    handleTabChange('reader');
  };

  // Dedicated URL Route for Admin (/admin)
  if (activeTab === 'admin') {
    return <AdminView onExitAdmin={() => handleTabChange('home')} />;
  }

  return (
    <div className="min-h-screen flex bg-background text-text-primary transition-colors duration-300 font-sans">
      {/* Navigation Rail (Left Column) - Hidden when reading */}
      {activeTab !== 'reader' && (
        <NavigationRail activeTab={activeTab} setActiveTab={handleTabChange} />
      )}

      {/* Right Main Content View */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar - Rendered only when not reading */}
        {activeTab !== 'reader' && <HeaderBar onOpenAdmin={() => handleTabChange('admin')} />}

        {/* Main Workspace Body */}
        <main className={`flex-1 flex flex-col ${activeTab === 'reader' ? '' : 'px-8 pb-12'}`}>
          {activeTab === 'home' && (
            <HomeDashboardView
              books={books}
              onReadBook={handleStartReading}
              onDetailBook={openBookDetail}
            />
          )}

          {activeTab === 'library' && (
            <LibraryView
              onReadBook={handleStartReading}
              onDetailBook={openBookDetail}
            />
          )}

          {activeTab === 'reader' && (
            <ReaderContainer
              book={activeBook}
              onGoHome={() => handleTabChange('home')}
            />
          )}

          {activeTab === 'notes' && <NotesView />}

          {activeTab === 'analytics' && <AnalyticsView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Magazine Detail Modal */}
      <BookDetailModal
        book={selectedBookDetail}
        onClose={() => openBookDetail(null)}
        onRead={handleStartReading}
      />
    </div>
  );
}

export default App;
