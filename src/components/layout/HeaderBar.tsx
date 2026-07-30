import React, { useState } from 'react';
import { Bell, WifiOff, Sparkles, BookOpen, Check } from 'lucide-react';
import { useOfflineStatus } from '../../hooks/useOfflineStatus';
import { ProfileSubWindowModal } from './ProfileSubWindowModal';
import { MOCK_ANNOUNCEMENTS } from '../../data/mockAnnouncements';

export const HeaderBar: React.FC = () => {
  const { isOnline } = useOfflineStatus();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [announcements, setAnnouncements] = useState(MOCK_ANNOUNCEMENTS);

  const unreadCount = announcements.filter(a => a.isNew).length;

  const markAllAsRead = () => {
    setAnnouncements(prev => prev.map(a => ({ ...a, isNew: false })));
  };

  return (
    <header className="h-20 px-8 flex items-center justify-between bg-transparent z-20 select-none">
      {/* Magazine Platform Title Branding */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-accent-light flex items-center justify-center text-accent">
          <BookOpen className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <span className="font-display font-bold text-lg text-text-primary tracking-tight leading-tight">
            ELEXA Magazine
          </span>
          <span className="text-[11px] font-mono text-text-muted">
            Issue Archive & Editorial Hub
          </span>
        </div>
      </div>

      {/* Right Controls & Profile */}
      <div className="flex items-center gap-4">
        {/* Offline Status Badge */}
        {!isOnline && (
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 text-xs font-medium border border-amber-500/20">
            <WifiOff className="w-3.5 h-3.5" />
            <span>Offline Mode</span>
          </div>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotificationOpen(!isNotificationOpen)}
            className="relative p-2.5 rounded-full hover:bg-surface text-text-secondary hover:text-text-primary transition-colors"
            title="Notifications (New Magazine Available)"
          >
            <Bell className="w-5 h-5 stroke-[1.8]" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-accent rounded-full ring-2 ring-background animate-pulse" />
            )}
          </button>

          {isNotificationOpen && (
            <div className="absolute right-0 mt-3 w-80 bg-surface border border-border rounded-2xl shadow-elevation p-4 z-50 flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-border/60 pb-2">
                <span className="font-display font-semibold text-sm text-text-primary flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-accent fill-accent" /> Magazine Alerts
                </span>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead} 
                    className="text-[11px] text-accent hover:underline flex items-center gap-1"
                  >
                    <Check className="w-3 h-3" /> Mark all read
                  </button>
                )}
              </div>

              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
                {announcements.map((ann) => (
                  <div 
                    key={ann.id} 
                    className={`p-2.5 rounded-xl border transition-colors ${
                      ann.isNew 
                        ? 'bg-accent-light/50 border-accent/30 text-text-primary' 
                        : 'bg-background/50 border-border/50 text-text-secondary'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-accent">{ann.title}</span>
                      <span className="text-[10px] text-text-muted font-mono">{ann.date}</span>
                    </div>
                    <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Button -> Opens Profile Sub-Window */}
        <button
          onClick={() => setIsProfileModalOpen(true)}
          className="relative group p-0.5 rounded-full hover:ring-2 hover:ring-accent transition-all"
          title="Open Profile Sub-Window"
        >
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop"
            alt="Alexander Mark Profile"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-border/80 shadow-sm"
          />
          <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full ring-2 ring-background" />
        </button>
      </div>

      {/* Profile Sub Window Modal */}
      <ProfileSubWindowModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </header>
  );
};
