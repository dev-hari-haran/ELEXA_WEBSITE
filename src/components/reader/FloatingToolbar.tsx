import React from 'react';
import { Home, Share2, Bookmark, Clock, Sun, Settings, ArrowRight, ListFilter, Search } from 'lucide-react';
import { useReaderStore } from '../../stores/useReaderStore';

interface FloatingToolbarProps {
  onGoHome: () => void;
  onOpenToc: () => void;
  onOpenSearch: () => void;
  onOpenThemeSettings: () => void;
  onOpenTypographySettings: () => void;
  onNextPage: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
}

export const FloatingToolbar: React.FC<FloatingToolbarProps> = ({
  onGoHome,
  onOpenToc,
  onOpenSearch,
  onOpenThemeSettings,
  onOpenTypographySettings,
  onNextPage,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { currentPage, isSpeaking, setSpeaking } = useReaderStore();

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 flex items-center justify-between px-6 pointer-events-none select-none">
      {/* Page Number Diamond Badge (matching Reference Image 1: 200 in diamond) */}
      <div className="pointer-events-auto flex items-center justify-center">
        <div className="relative w-11 h-11 rotate-45 border-2 border-text-primary/60 bg-surface/90 backdrop-blur-md rounded-md flex items-center justify-center shadow-lg group hover:scale-105 transition-transform">
          <span className="-rotate-45 font-mono text-xs font-bold text-text-primary">
            {currentPage}
          </span>
        </div>
      </div>

      {/* Floating Central Pill Toolbar matching Reference Image 1 */}
      <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-3 px-4 py-2.5 rounded-full bg-surface/85 backdrop-blur-xl border border-border/80 shadow-pill transition-all duration-300">
        <button
          onClick={onGoHome}
          className="p-2.5 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
          title="Return to Home"
        >
          <Home className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenToc}
          className="p-2.5 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
          title="Table of Contents"
        >
          <ListFilter className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleBookmark}
          className={`p-2.5 rounded-full transition-colors ${
            isBookmarked
              ? 'text-accent bg-accent-light'
              : 'text-text-secondary hover:bg-surface-hover hover:text-text-primary'
          }`}
          title="Bookmark Page"
        >
          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={onOpenSearch}
          className="p-2.5 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
          title="Search in Book (/)"
        >
          <Search className="w-4 h-4" />
        </button>

        <button
          onClick={onOpenThemeSettings}
          className="p-2.5 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
          title="Theme Engine"
        >
          <Sun className="w-4 h-4" />
        </button>

        {/* Accent Red Settings Button matching Reference Image 1 */}
        <button
          onClick={onOpenTypographySettings}
          className="p-2.5 rounded-full bg-accent text-white shadow-md hover:scale-105 transition-transform"
          title="Reader Typography Settings"
        >
          <Settings className="w-4 h-4" />
        </button>
      </div>

      {/* Next Page Circular Arrow Button matching Reference Image 1 */}
      <div className="pointer-events-auto">
        <button
          onClick={onNextPage}
          className="w-11 h-11 rounded-full bg-text-primary text-background flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          title="Next Page (J / Right Arrow)"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
