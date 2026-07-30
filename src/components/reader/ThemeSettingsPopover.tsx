import React from 'react';
import { X, Sun, Moon, Clock, Check } from 'lucide-react';
import { useThemeStore } from '../../stores/useThemeStore';
import { ThemeMode } from '../../types/theme';

interface ThemeSettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeSettingsPopover: React.FC<ThemeSettingsPopoverProps> = ({ isOpen, onClose }) => {
  const { theme, setTheme, circadian, setCircadianEnabled } = useThemeStore();

  if (!isOpen) return null;

  const themeOptions: Array<{ id: ThemeMode; label: string; bg: string; text: string; border: string }> = [
    { id: 'light', label: 'Light', bg: 'bg-white', text: 'text-slate-900', border: 'border-slate-300' },
    { id: 'cream', label: 'Cream', bg: 'bg-[#FAF7F0]', text: 'text-[#1C1917]', border: 'border-[#E2DACD]' },
    { id: 'sepia', label: 'Sepia', bg: 'bg-[#F4ECD8]', text: 'text-[#3B2E1E]', border: 'border-[#D6C898]' },
    { id: 'dark', label: 'Dark', bg: 'bg-[#1E1E24]', text: 'text-slate-100', border: 'border-slate-700' },
    { id: 'charcoal', label: 'Charcoal', bg: 'bg-[#121212]', text: 'text-gray-200', border: 'border-gray-800' },
    { id: 'amoled', label: 'AMOLED', bg: 'bg-black', text: 'text-white', border: 'border-neutral-900' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none animate-fadeIn">
      <div className="w-full max-w-sm p-6 rounded-3xl bg-surface border border-border/80 shadow-2xl flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-accent" />
            <h3 className="font-serif font-bold text-lg text-text-primary">
              Theme System
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-hover text-text-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Theme Palette Grid */}
        <div className="grid grid-cols-2 gap-3">
          {themeOptions.map((t) => (
            <button
              key={t.id}
              onClick={() => setTheme(t.id)}
              className={`p-3 rounded-2xl border flex items-center justify-between transition-all ${t.bg} ${t.text} ${t.border} ${
                theme === t.id ? 'ring-2 ring-accent scale-102 shadow-md' : 'hover:scale-101'
              }`}
            >
              <span className="text-xs font-semibold">{t.label}</span>
              {theme === t.id && <Check className="w-4 h-4 text-accent" />}
            </button>
          ))}
        </div>

        {/* Circadian Rhythm Mode Switch */}
        <div className="pt-4 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-accent" /> Circadian Rhythm Mode
            </span>
            <span className="text-[11px] text-text-muted mt-0.5">
              Auto switch theme based on time of day
            </span>
          </div>

          <button
            onClick={() => setCircadianEnabled(!circadian.enabled)}
            className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
              circadian.enabled ? 'bg-accent' : 'bg-surface-hover border border-border'
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white transition-transform ${
                circadian.enabled ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
