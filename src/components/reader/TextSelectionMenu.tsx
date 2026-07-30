import React, { useState } from 'react';
import { Copy, Volume2, Share2, Edit3, Check } from 'lucide-react';
import { speechService } from '../../services/speechService';
import { useReaderStore } from '../../stores/useReaderStore';

interface TextSelectionMenuProps {
  position: { top: number; left: number } | null;
  selectedText: string;
  onHighlight: (color: 'yellow' | 'green' | 'pink' | 'blue' | 'purple', noteText?: string) => void;
  onClose: () => void;
}

export const TextSelectionMenu: React.FC<TextSelectionMenuProps> = ({
  position,
  selectedText,
  onHighlight,
  onClose,
}) => {
  const [showNoteInput, setShowNoteInput] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [selectedColor, setSelectedColor] = useState<'yellow' | 'green' | 'pink' | 'blue' | 'purple'>('pink');
  const { speechRate } = useReaderStore();

  if (!position || !selectedText) return null;

  const handleSpeak = () => {
    speechService.speak(selectedText, speechRate);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(selectedText);
    onClose();
  };

  const colors: Array<{ id: 'yellow' | 'green' | 'pink' | 'blue' | 'purple'; bg: string }> = [
    { id: 'pink', bg: 'bg-rose-400' },
    { id: 'yellow', bg: 'bg-amber-300' },
    { id: 'green', bg: 'bg-emerald-400' },
    { id: 'blue', bg: 'bg-sky-400' },
    { id: 'purple', bg: 'bg-purple-400' },
  ];

  return (
    <div
      style={{ top: `${position.top - 60}px`, left: `${position.left}px` }}
      className="fixed z-50 transform -translate-x-1/2 select-none animate-fadeIn"
    >
      <div className="flex flex-col gap-2 p-1.5 rounded-full bg-surface/90 backdrop-blur-xl border border-border/80 shadow-pill text-text-primary">
        <div className="flex items-center gap-1.5 px-2">
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
            title="Copy selection"
          >
            <Copy className="w-4 h-4" />
          </button>

          {/* TTS Audio Speaker Button (matching Reference Image 1 coral speaker) */}
          <button
            onClick={handleSpeak}
            className="p-2 rounded-full bg-accent text-white shadow-sm hover:scale-105 transition-transform"
            title="Read Selection Aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Share */}
          <button
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
            title="Share quote"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Note Toggle */}
          <button
            onClick={() => setShowNoteInput(!showNoteInput)}
            className="p-2 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors"
            title="Add Note"
          >
            <Edit3 className="w-4 h-4" />
          </button>

          {/* Color palette */}
          <div className="flex items-center gap-1 pl-2 border-l border-border/60">
            {colors.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedColor(c.id);
                  onHighlight(c.id, noteText);
                }}
                className={`w-5 h-5 rounded-full ${c.bg} hover:scale-115 transition-transform flex items-center justify-center`}
              >
                {selectedColor === c.id && <Check className="w-3 h-3 text-black/70" />}
              </button>
            ))}
          </div>
        </div>

        {/* Note Input Popover */}
        {showNoteInput && (
          <div className="p-3 bg-surface rounded-2xl border border-border flex flex-col gap-2 mt-1 shadow-lg w-64">
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write your note or thoughts here..."
              className="w-full h-16 text-xs p-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-accent"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowNoteInput(false)}
                className="px-2.5 py-1 text-[11px] text-text-muted hover:text-text-primary"
              >
                Cancel
              </button>
              <button
                onClick={() => onHighlight(selectedColor, noteText)}
                className="px-3 py-1 text-[11px] bg-accent text-white rounded-md font-medium"
              >
                Save Note
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
