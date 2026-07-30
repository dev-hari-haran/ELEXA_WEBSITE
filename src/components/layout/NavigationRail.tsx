import React from 'react';
import { Home, BookOpen, Clock, Bookmark, Settings, SlidersHorizontal, Command } from 'lucide-react';
import { useCommandStore } from '../../stores/useCommandStore';

interface NavigationRailProps {
  activeTab: 'home' | 'library' | 'reader' | 'analytics' | 'notes' | 'settings';
  setActiveTab: (tab: 'home' | 'library' | 'reader' | 'analytics' | 'notes' | 'settings') => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({ activeTab, setActiveTab }) => {
  const { openCommandPalette } = useCommandStore();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'reader', label: 'Reader', icon: BookOpen },
    { id: 'analytics', label: 'Schedule & Stats', icon: Clock },
    { id: 'notes', label: 'Bookmarks & Notes', icon: Bookmark },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <aside className="w-20 h-screen sticky top-0 flex flex-col items-center justify-between py-6 bg-surface border-r border-border z-30 select-none transition-colors duration-300">
      {/* Top Logo / Brand */}
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={() => setActiveTab('home')}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-accent-light text-accent hover:scale-105 transition-transform duration-200"
          title="ELEXA Reader"
        >
          {/* Custom Hand/Book Scribble Icon matching reference design */}
          <svg className="w-7 h-7 stroke-current fill-none stroke-[2.2]" viewBox="0 0 24 24">
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" strokeDasharray="2 2"/>
            <path d="M8 12C8 10 10 8 12 8C14 8 16 10 16 12C16 15 12 17 12 17C12 17 8 15 8 12Z"/>
          </svg>
        </button>

        {/* Navigation Items */}
        <nav className="flex flex-col items-center gap-4 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-full transition-all duration-300 relative group ${
                  isActive
                    ? 'bg-accent text-white shadow-lg shadow-accent/30 scale-105'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
                {/* Tooltip */}
                <span className="absolute left-16 bg-text-primary text-background text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={openCommandPalette}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors group relative"
          title="Command Palette (⌘K)"
        >
          <Command className="w-5 h-5" />
          <span className="absolute left-16 bg-text-primary text-background text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
            Command Palette (⌘K)
          </span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors group relative"
          title="All Collections"
        >
          <SlidersHorizontal className="w-5 h-5" />
          <span className="absolute left-16 bg-text-primary text-background text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
            Library Catalog
          </span>
        </button>
      </div>
    </aside>
  );
};
