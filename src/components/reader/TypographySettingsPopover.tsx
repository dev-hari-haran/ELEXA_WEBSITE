import React from 'react';
import { X, Type, Eye, Layers, Sparkles } from 'lucide-react';
import { useReaderStore } from '../../stores/useReaderStore';
import { FontFamily, PageAnimation, ColumnMargin } from '../../types/reader';

interface TypographySettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TypographySettingsPopover: React.FC<TypographySettingsPopoverProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useReaderStore();

  if (!isOpen) return null;

  const fontFamilies: Array<{ id: FontFamily; label: string; fontClass: string }> = [
    { id: 'serif', label: 'Serif', fontClass: 'font-serif' },
    { id: 'sans', label: 'Sans', fontClass: 'font-sans' },
    { id: 'mono', label: 'Mono', fontClass: 'font-mono' },
    { id: 'dyslexic', label: 'Dyslexic', fontClass: 'font-dyslexic' },
  ];

  const columnMargins: Array<{ id: ColumnMargin; label: string }> = [
    { id: 'narrow', label: 'Narrow' },
    { id: 'medium', label: 'Standard' },
    { id: 'wide', label: 'Wide' },
  ];

  const pageAnimations: Array<{ id: PageAnimation; label: string }> = [
    { id: 'flip3d', label: '3D Page Flip' },
    { id: 'slide', label: 'Smooth Slide' },
    { id: 'fade', label: 'Fade' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none animate-fadeIn">
      <div className="w-full max-w-md p-6 rounded-3xl bg-surface border border-border/80 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Type className="w-5 h-5 text-accent" />
            <h3 className="font-serif font-bold text-lg text-text-primary">
              Reading Customization
            </h3>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-hover text-text-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Font Family Selection */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Font Family
          </label>
          <div className="grid grid-cols-2 gap-2">
            {fontFamilies.map((f) => (
              <button
                key={f.id}
                onClick={() => updateSettings({ fontFamily: f.id })}
                className={`py-2.5 px-3 rounded-xl border text-xs font-medium transition-all ${f.fontClass} ${
                  settings.fontFamily === f.id
                    ? 'border-accent bg-accent-light text-accent shadow-sm'
                    : 'border-border bg-background text-text-secondary hover:bg-surface-hover'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-text-muted uppercase tracking-wider">Font Size</span>
            <span className="font-mono text-accent font-bold">{settings.fontSize}px</span>
          </div>
          <input
            type="range"
            min="14"
            max="32"
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: Number(e.target.value) })}
            className="w-full accent-accent cursor-pointer"
          />
        </div>

        {/* Line Height Slider */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-text-muted uppercase tracking-wider">Line Height</span>
            <span className="font-mono text-accent font-bold">{settings.lineHeight}</span>
          </div>
          <input
            type="range"
            min="1.2"
            max="2.4"
            step="0.1"
            value={settings.lineHeight}
            onChange={(e) => updateSettings({ lineHeight: Number(e.target.value) })}
            className="w-full accent-accent cursor-pointer"
          />
        </div>

        {/* Column Margins */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
            Page Margins
          </label>
          <div className="grid grid-cols-3 gap-2">
            {columnMargins.map((m) => (
              <button
                key={m.id}
                onClick={() => updateSettings({ columnMargin: m.id })}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  settings.columnMargin === m.id
                    ? 'border-accent bg-accent-light text-accent'
                    : 'border-border bg-background text-text-secondary hover:bg-surface-hover'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Page Animation Transition */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-text-muted uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-accent" /> Page Turn Effect
          </label>
          <div className="grid grid-cols-3 gap-2">
            {pageAnimations.map((a) => (
              <button
                key={a.id}
                onClick={() => updateSettings({ pageAnimation: a.id })}
                className={`py-2 px-2 text-[11px] rounded-xl border font-medium transition-all ${
                  settings.pageAnimation === a.id
                    ? 'border-accent bg-accent-light text-accent font-semibold'
                    : 'border-border bg-background text-text-secondary hover:bg-surface-hover'
                }`}
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>

        {/* Zen & Focus Toggles */}
        <div className="pt-3 border-t border-border flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-accent" /> Zen Distraction-Free Mode
            </span>
            <button
              onClick={() => updateSettings({ zenMode: !settings.zenMode })}
              className={`w-10 h-5 rounded-full transition-colors relative p-0.5 ${
                settings.zenMode ? 'bg-accent' : 'bg-surface-hover border border-border'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.zenMode ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
