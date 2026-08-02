import React, { useState } from 'react';
import { Sun, Moon, Clock, Keyboard, ShieldCheck, UserCheck, Key, Mail, Sparkles, CheckCircle, Search, Sliders } from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';
import { useOfflineStatus } from '../../hooks/useOfflineStatus';

export const SettingsView: React.FC = () => {
  const { theme, setTheme, circadian, setCircadianEnabled } = useThemeStore();
  const { isOnline } = useOfflineStatus();

  // Profile parameters state
  const [designation, setDesignation] = useState<'Author' | 'Reader'>('Author');
  const [referralCode, setReferralCode] = useState('ELEXA-VIP-7892');
  const [referralStatus, setReferralStatus] = useState<string | null>(null);

  const handleValidateReferral = (e: React.FormEvent) => {
    e.preventDefault();
    if (!referralCode.trim()) return;
    setReferralStatus(`Code "${referralCode}" validated! +500 Magazine Credits unlocked.`);
  };

  // Keyboard shortcuts list (Two-Lane Grid + 4 new shortcuts)
  const shortcuts = [
    { key: 'J / →', desc: 'Next Page' },
    { key: 'K / ←', desc: 'Previous Page' },
    { key: 'Alt + N', desc: 'Next Magazine Chapter' },
    { key: 'Alt + P', desc: 'Previous Magazine Chapter' },
    { key: 'Ctrl + Shift + D', desc: 'Make Offline' },
    { key: 'Ctrl + Shift + S', desc: 'Share Magazine Issue' },
    { key: 'F', desc: 'Toggle Focus Mode' },
    { key: 'Z', desc: 'Toggle Zen Distraction-Free Mode' },
    { key: 'T', desc: 'Toggle Table of Contents' },
    { key: '/', desc: 'Search Inside Issue' },
    { key: '1 - 6', desc: 'Switch Theme Palettes' },
    { key: 'Esc', desc: 'Close Modals & Drawers' },
  ];

  return (
    <div className="w-full flex-1 flex flex-col gap-8 select-none max-w-5xl">
      <div>
        <h1 className="text-3xl font-display font-bold text-text-primary">
          Platform & Profile Settings
        </h1>
        <p className="text-xs text-text-muted mt-1 font-mono">
          Manage your author profile, default color toggles, timing-based circadian theme schedules, and 2-lane keyboard shortcuts.
        </p>
      </div>

      {/* 1. Full Profile Parameters Section */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <UserCheck className="w-5 h-5 text-accent" />
          <h3 className="font-display font-semibold text-lg text-text-primary">
            Profile Account Parameters
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Info Card */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-background border border-border/60">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"
              alt="Alexander Mark"
              className="w-16 h-16 rounded-full object-cover ring-2 ring-accent/30"
            />
            <div className="flex flex-col">
              <h4 className="font-display font-bold text-base text-text-primary">
                Alexander Mark
              </h4>
              <span className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                <Mail className="w-3.5 h-3.5" /> alexander.mark@elexa.magazine
              </span>
              <span className="text-[10px] font-mono text-accent mt-1 uppercase font-semibold">
                Role: {designation} • Pro Tier
              </span>
            </div>
          </div>

          {/* Designation Toggle */}
          <div className="flex flex-col justify-center gap-2">
            <label className="text-xs font-mono text-text-muted uppercase tracking-wider">
              Select Designation
            </label>
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-background border border-border/80">
              <button
                type="button"
                onClick={() => setDesignation('Author')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  designation === 'Author'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Author Mode
              </button>
              <button
                type="button"
                onClick={() => setDesignation('Reader')}
                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                  designation === 'Reader'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Reader Mode
              </button>
            </div>
          </div>
        </div>

        {/* Referral Code Form */}
        <div className="flex flex-col gap-2 pt-2 border-t border-border/60">
          <label className="text-xs font-mono text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-accent" /> Enter & Validate Referral Code
          </label>
          <form onSubmit={handleValidateReferral} className="flex gap-2">
            <input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="e.g. ELEXA-VIP-7892"
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent font-mono uppercase"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-accent text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-accent-hover transition-colors"
            >
              <Search className="w-3.5 h-3.5" /> Search Code
            </button>
          </form>

          {referralStatus && (
            <div className="mt-1 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{referralStatus}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Default Color Setting Toggle & Timing-Based Toggle */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-accent" />
            <h3 className="font-display font-semibold text-lg text-text-primary">
              Default Color Setting Toggle
            </h3>
          </div>
          <span className="text-xs font-mono font-bold text-accent uppercase">{theme}</span>
        </div>

        {/* Theme Palette Grid (All 10 Palettes) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { id: 'cream', label: 'Cream Paper', color: 'bg-[#FAF7F0] text-[#1C1917] border-[#E2DACD]' },
            { id: 'light', label: 'Light Clean', color: 'bg-white text-slate-900 border-slate-200' },
            { id: 'sepia', label: 'Sepia Vintage', color: 'bg-[#F4ECD8] text-[#3B2E1E] border-[#D6C898]' },
            { id: 'dark', label: 'Dark Slate', color: 'bg-[#1E1E24] text-white border-slate-700' },
            { id: 'charcoal', label: 'Night Charcoal', color: 'bg-[#121212] text-gray-200 border-gray-800' },
            { id: 'amoled', label: 'AMOLED Black', color: 'bg-black text-white border-neutral-900' },
            { id: 'emerald', label: 'Nordic Emerald', color: 'bg-[#061A14] text-[#ECFDF5] border-[#1F5243]' },
            { id: 'nordic', label: 'Nordic Sapphire', color: 'bg-[#0B132B] text-[#EDF2F7] border-[#3A4B7C]' },
            { id: 'rose', label: 'Rose Velvet', color: 'bg-[#1F1116] text-[#FDF2F5] border-[#52323E]' },
            { id: 'amber', label: 'Warm Amber', color: 'bg-[#1C1917] text-[#FAFAF9] border-[#44403C]' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id as any)}
              className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between transition-all ${t.color} ${
                theme === t.id ? 'ring-2 ring-accent scale-102 shadow-md' : 'hover:scale-101'
              }`}
            >
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Timing Based Color Setting Toggle (Circadian Auto-Schedule) */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border/60">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-amber-500" />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-text-primary">
                Timing-Based Color Setting Toggle
              </span>
              <span className="text-[11px] text-text-muted mt-0.5">
                Automatically adjusts warmth (Cream at day, Sepia at dusk, Dark at night) based on local time.
              </span>
            </div>
          </div>

          <button
            onClick={() => setCircadianEnabled(!circadian.enabled)}
            className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
              circadian.enabled ? 'bg-accent' : 'bg-surface-hover border border-border'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white transition-transform ${
                circadian.enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* 3. Redesigned Two-Lane Keyboard Shortcuts Sheet */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-accent" />
            <h3 className="font-display font-semibold text-lg text-text-primary">
              Keyboard Shortcuts
            </h3>
          </div>
          <span className="text-xs font-mono text-text-muted">Two-Lane Page View</span>
        </div>

        {/* Two-Lane (2-Column) Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {shortcuts.map((s, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-background border border-border/60 flex items-center justify-between">
              <span className="text-xs text-text-secondary font-medium">{s.desc}</span>
              <kbd className="px-2.5 py-1 text-xs font-mono font-bold text-accent bg-surface rounded-lg border border-border/80 shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>

      {/* 4. PWA & Storage */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-500" />
          <h3 className="font-display font-semibold text-lg text-text-primary">
            Offline Engine & Storage
          </h3>
        </div>

        <div className="flex items-center justify-between p-4 rounded-2xl bg-background border border-border/60">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">
              Network Status: {isOnline ? 'Online Sync Active' : 'Offline Mode Active'}
            </span>
            <span className="text-[11px] text-text-muted mt-0.5">
              Magazines marked for offline reading are saved directly to browser IndexedDB storage.
            </span>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-mono font-semibold">
            IndexedDB Active
          </span>
        </div>
      </div>
    </div>
  );
};
