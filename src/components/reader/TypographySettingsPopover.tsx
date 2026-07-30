import React from 'react';
import { X, ZoomIn, Eye, Layers } from 'lucide-react';
import { useReaderStore } from '../../stores/useReaderStore';
import { ColumnMargin, PageAnimation } from '../../types/reader';

interface TypographySettingsPopoverProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TypographySettingsPopover: React.FC<TypographySettingsPopoverProps> = ({ isOpen, onClose }) => {
  const { settings, updateSettings } = useReaderStore();

  if (!isOpen) return null;

  const zoomLevels = [80, 90, 100, 110, 125, 150];

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

  const currentZoom = settings.zoomLevel || 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm select-none animate-fadeIn">
      <div className="w-full max-w-md p-6 rounded-3xl bg-surface border border-border/80 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <ZoomIn className="w-5 h-5 text-accent" />
            <h3 className="font-display font-semibold text-lg text-text-primary">
              Reader Zoom & Display
            </h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-surface-hover text-text-muted">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Level Control */}
        <div className="flex flex-col gap-3">
          <div className="flex justify-between items-center text-xs">
            <span className="font-mono text-text-muted uppercase tracking-wider">Magazine Zoom Level</span>
            <span className="font-mono text-accent font-bold text-sm">{currentZoom}%</span>
          </div>
          
          <div className="grid grid-cols-6 gap-1.5">
            {zoomLevels.map((z) => (
              <button
                key={z}
                onClick={() => updateSettings({ zoomLevel: z })}
                className={`py-2 text-xs font-mono font-medium rounded-xl border transition-all ${
                  currentZoom === z
                    ? 'border-accent bg-accent text-white shadow-sm'
                    : 'border-border bg-background text-text-secondary hover:bg-surface-hover'
                }`}
              >
                {z}%
              </button>
            ))}
          </div>
        </div>

        {/* Column Margins */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-text-muted uppercase tracking-wider">
            Page Margins
          </label>
          <div className="grid grid-cols-3 gap-2">
            {columnMargins.map((m) => (
              <button
                key={m.id}
                onClick={() => updateSettings({ columnMargin: m.id })}
                className={`py-2 px-3 rounded-xl border text-xs font-medium transition-all ${
                  settings.columnMargin === m.id
                    ? 'border-accent bg-accent-light text-accent font-semibold'
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
          <label className="text-xs font-mono text-text-muted uppercase tracking-wider flex items-center gap-1.5">
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
