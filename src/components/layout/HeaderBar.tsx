import React from 'react';
import { Search, Bell, WifiOff, Sparkles } from 'lucide-react';
import { useCommandStore } from '../../stores/useCommandStore';
import { useOfflineStatus } from '../../hooks/useOfflineStatus';

interface HeaderBarProps {
  onSearchFocus?: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = () => {
  const { openCommandPalette } = useCommandStore();
  const { isOnline } = useOfflineStatus();

  return (
    <header className="h-20 px-8 flex items-center justify-between bg-transparent z-20 select-none">
      {/* Search Input Box matching reference design */}
      <div className="relative w-full max-w-md">
        <button
          onClick={openCommandPalette}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full bg-surface/80 hover:bg-surface border border-border/60 text-left text-sm text-text-muted hover:text-text-primary transition-all shadow-sm group"
        >
          <Search className="w-4 h-4 text-text-muted group-hover:text-accent transition-colors" />
          <span className="flex-1 font-normal">Search book name, author, edition ...</span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-medium text-text-muted bg-background/60 rounded border border-border">
            ⌘K
          </kbd>
        </button>
      </div>

      {/* Right User & Controls Area */}
      <div className="flex items-center gap-5">
        {/* Offline Status Badge */}
        {!isOnline && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium border border-amber-500/20">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline Mode</span>
          </div>
        )}

        {/* Notifications */}
        <button
          className="relative p-2.5 rounded-full hover:bg-surface text-text-secondary hover:text-text-primary transition-colors"
          title="Notifications"
        >
          <Bell className="w-5 h-5 stroke-[1.8]" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full ring-2 ring-background" />
        </button>

        {/* User Profile matching reference image: Alexander Mark */}
        <div className="flex items-center gap-3 pl-2 border-l border-border">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
            alt="Alexander Mark"
            className="w-9 h-9 rounded-full object-cover ring-2 ring-border/80 shadow-sm"
          />
          <div className="hidden md:flex flex-col">
            <span className="text-sm font-semibold text-text-primary leading-tight">
              Alexander Mark
            </span>
            <span className="text-[11px] text-text-muted flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" /> Pro Reader
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
