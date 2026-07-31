import React from 'react';
import { Home, BookOpen, Bookmark, Settings, Layers, ShieldCheck } from 'lucide-react';

interface NavigationRailProps {
  activeTab: 'home' | 'library' | 'reader' | 'analytics' | 'notes' | 'settings' | 'admin';
  setActiveTab: (tab: 'home' | 'library' | 'reader' | 'analytics' | 'notes' | 'settings' | 'admin') => void;
}

export const NavigationRail: React.FC<NavigationRailProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'Home Feed', icon: Home },
    { id: 'library', label: 'Magazine Library', icon: Layers },
    { id: 'reader', label: 'Magazine Reader', icon: BookOpen },
    { id: 'notes', label: 'Bookmarks & Notes', icon: Bookmark },
    { id: 'admin', label: 'Admin Studio', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ] as const;

  return (
    <aside className="w-20 h-screen sticky top-0 flex flex-col items-center justify-between py-6 bg-surface border-r border-border z-30 select-none transition-colors duration-300">
      {/* Top Logo / Brand */}
      <div className="flex flex-col items-center gap-6">
        <button 
          onClick={() => setActiveTab('home')}
          className="w-12 h-12 flex items-center justify-center rounded-2xl bg-accent-light text-accent hover:scale-105 transition-transform duration-200"
          title="ELEXA Magazine"
        >
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
                className={`w-11 h-11 flex items-center justify-center rounded-full transition-all duration-200 relative group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent ${
                  isActive
                    ? 'bg-accent text-white shadow-md scale-105'
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
                }`}
                title={item.label}
              >
                <Icon className={`w-5 h-5 transition-transform duration-200 group-hover:scale-105 ${isActive ? 'stroke-[2.2]' : 'stroke-[1.8]'}`} />
                {/* Tooltip */}
                <span className="absolute left-16 bg-text-primary text-background font-sans font-medium text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 whitespace-nowrap shadow-md z-50">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Info */}
      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => setActiveTab('library')}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-text-muted hover:text-text-primary hover:bg-surface-hover transition-colors group relative"
          title="All Collections"
        >
          <Layers className="w-5 h-5" />
          <span className="absolute left-16 bg-text-primary text-background text-xs px-2.5 py-1 rounded-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap shadow-md">
            Library Catalog
          </span>
        </button>
      </div>
    </aside>
  );
};
