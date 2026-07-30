import React from 'react';
import { Sun, Moon, Clock, Keyboard, ShieldCheck, Download, Smartphone } from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';
import { useOfflineStatus } from '../../hooks/useOfflineStatus';

export const SettingsView: React.FC = () => {
  const { theme, setTheme, circadian, setCircadianEnabled } = useThemeStore();
  const { isOnline } = useOfflineStatus();

  const shortcuts = [
    { key: '⌘ + K', desc: 'Open Command Palette' },
    { key: 'J / →', desc: 'Next Page' },
    { key: 'K / ←', desc: 'Previous Page' },
    { key: 'F', desc: 'Toggle Focus Mode' },
    { key: 'Z', desc: 'Toggle Zen Distraction-Free Mode' },
    { key: 'T', desc: 'Toggle Table of Contents' },
    { key: '/', desc: 'Search Inside Book' },
    { key: '1 - 6', desc: 'Switch Themes (Light to AMOLED)' },
  ];

  return (
    <div className="w-full flex-1 flex flex-col gap-8 select-none max-w-4xl">
      <div>
        <h1 className="text-3xl font-serif font-bold text-text-primary">
          Platform Settings
        </h1>
        <p className="text-xs text-text-muted mt-1">
          Customize themes, circadian schedules, offline synchronization, and view keyboard shortcuts.
        </p>
      </div>

      {/* Theme Settings Section */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-accent" />
            <h3 className="font-serif font-bold text-lg text-text-primary">
              Active Color Theme
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-accent uppercase">{theme}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            { id: 'light', label: 'Light', color: 'bg-white text-slate-900 border-slate-200' },
            { id: 'cream', label: 'Cream (Warm Paper)', color: 'bg-[#FAF7F0] text-[#1C1917] border-[#E2DACD]' },
            { id: 'sepia', label: 'Sepia Vintage', color: 'bg-[#F4ECD8] text-[#3B2E1E] border-[#D6C898]' },
            { id: 'dark', label: 'Dark Slate', color: 'bg-[#1E1E24] text-white border-slate-700' },
            { id: 'charcoal', label: 'Night Charcoal', color: 'bg-[#121212] text-gray-200 border-gray-800' },
            { id: 'amoled', label: 'AMOLED Pure Black', color: 'bg-black text-white border-neutral-900' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${t.color} ${
                theme === t.id ? 'ring-2 ring-accent scale-102 shadow-md' : 'hover:scale-101'
              }`}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard Shortcuts Reference Sheet */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Keyboard className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-bold text-lg text-text-primary">
            Keyboard Shortcuts (Arc / VS Code Style)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-background border border-border/60 flex items-center justify-between">
              <span className="text-xs text-text-secondary">{s.desc}</span>
              <kbd className="px-2 py-1 text-xs font-mono font-bold text-accent bg-surface rounded border border-border">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>

      {/* PWA & Offline Storage */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-accent" />
          <h3 className="font-serif font-bold text-lg text-text-primary">
            PWA & Offline Capability
          </h3>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border/60">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Offline Reading Ready
            </span>
            <span className="text-[11px] text-text-muted mt-0.5">
              Network status: {isOnline ? 'Online' : 'Offline'} • IndexedDB storage active
            </span>
          </div>

          <button className="px-4 py-2 rounded-full bg-accent text-white text-xs font-semibold hover:scale-105 transition-transform">
            Install PWA
          </button>
        </div>
      </div>
    </div>
  );
};
