import React, { useState, useRef } from 'react';
import { Book } from '../../types/book';
import { useReaderStore } from '../../stores/useReaderStore';
import { FloatingToolbar } from './FloatingToolbar';
import { TextSelectionMenu } from './TextSelectionMenu';
import { TocDrawer } from './TocDrawer';
import { ThemeSettingsPopover } from './ThemeSettingsPopover';
import { TypographySettingsPopover } from './TypographySettingsPopover';
import { PageSearchModal } from './PageSearchModal';
import { Volume2, VolumeX, Maximize2, Minimize2 } from 'lucide-react';
import { speechService } from '../../services/speechService';

interface ReaderContainerProps {
  book: Book;
  onGoHome: () => void;
}

export const ReaderContainer: React.FC<ReaderContainerProps> = ({ book, onGoHome }) => {
  const {
    activeChapterId,
    setActiveChapter,
    currentPage,
    setCurrentPage,
    settings,
    isTocOpen,
    toggleToc,
    isSearchOpen,
    toggleSearch,
    isSettingsOpen,
    toggleSettings,
    addHighlight,
    addBookmark,
    bookmarks,
    isSpeaking,
    setSpeaking,
    speechRate,
  } = useReaderStore();

  const [isThemePopoverOpen, setIsThemePopoverOpen] = useState(false);
  const [isTypographyPopoverOpen, setIsTypographyPopoverOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectionMenuPos, setSelectionMenuPos] = useState<{ top: number; left: number } | null>(null);
  const [selectedText, setSelectedText] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  // Active Chapter lookup
  const currentChapter =
    book.chapters.find((c) => c.id === activeChapterId) || book.chapters[0];

  // Handle text selection
  const handleMouseUp = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim().length > 0) {
      const text = selection.toString().trim();
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedText(text);
      setSelectionMenuPos({
        top: rect.top + window.scrollY,
        left: rect.left + rect.width / 2,
      });
    } else {
      setSelectionMenuPos(null);
      setSelectedText('');
    }
  };

  const handleHighlightSelection = (color: 'yellow' | 'green' | 'pink' | 'blue' | 'purple', noteText?: string) => {
    if (!selectedText) return;
    addHighlight({
      id: `h-${Date.now()}`,
      bookId: book.id,
      chapterId: currentChapter.id,
      selectedText,
      color,
      tags: ['user-quote'],
      note: noteText,
      createdAt: new Date().toISOString(),
    });
    setSelectionMenuPos(null);
    setSelectedText('');
    window.getSelection()?.removeAllRanges();
  };

  const toggleBookmarkCurrentPage = () => {
    addBookmark({
      id: `bm-${Date.now()}`,
      bookId: book.id,
      chapterId: currentChapter.id,
      chapterTitle: currentChapter.title,
      pageNumber: currentPage,
      snippet: selectedText || currentChapter.title,
      createdAt: new Date().toISOString(),
    });
  };

  const isBookmarked = bookmarks.some(
    (bm) => bm.bookId === book.id && bm.pageNumber === currentPage
  );

  const toggleFullscreenMode = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleGlobalTTS = () => {
    if (isSpeaking) {
      speechService.stop();
      setSpeaking(false);
    } else {
      speechService.speak(currentChapter.content, speechRate, undefined, () => setSpeaking(false));
      setSpeaking(true);
    }
  };

  // Font family helper
  const getFontClass = () => {
    switch (settings.fontFamily) {
      case 'sans':
        return 'font-sans';
      case 'mono':
        return 'font-mono';
      case 'dyslexic':
        return 'font-dyslexic';
      default:
        return 'font-serif';
    }
  };

  // Margin container width helper
  const getMarginClass = () => {
    switch (settings.columnMargin) {
      case 'narrow':
        return 'max-w-2xl';
      case 'wide':
        return 'max-w-5xl';
      default:
        return 'max-w-3xl';
    }
  };

  return (
    <div className="relative min-h-screen bg-background text-text-primary transition-colors duration-300 flex flex-col items-center">
      {/* Background Graphic Accent inspired by Reference Image 1 (Arch Gothic Windows) */}
      <div className="fixed inset-0 pointer-events-none opacity-5 flex items-center justify-center">
        <svg className="w-[800px] h-[800px] stroke-current fill-none stroke-[1]" viewBox="0 0 100 100">
          <path d="M50 10 C 20 10, 10 40, 10 90 L 90 90 C 90 40, 80 10, 50 10 Z" />
          <path d="M50 20 C 30 20, 20 45, 20 90 L 80 90 C 80 45, 70 20, 50 20 Z" />
        </svg>
      </div>

      {/* Top Header Bar (Hidden in Zen Mode) */}
      {!settings.zenMode && (
        <header className="w-full h-16 px-8 flex items-center justify-between z-30 select-none border-b border-border/40">
          <div className="flex items-center gap-3">
            <button
              onClick={onGoHome}
              className="text-xs font-semibold text-text-secondary hover:text-accent flex items-center gap-1 transition-colors"
            >
              ← Library
            </button>
            <span className="text-text-muted">•</span>
            <span className="text-xs font-medium text-text-secondary line-clamp-1">
              {book.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Audio Reader Toggle */}
            <button
              onClick={toggleGlobalTTS}
              className={`p-2 rounded-full transition-colors ${
                isSpeaking
                  ? 'bg-accent text-white animate-pulse'
                  : 'hover:bg-surface text-text-secondary hover:text-text-primary'
              }`}
              title={isSpeaking ? 'Stop Audio Reader' : 'Listen with Audio Reader'}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreenMode}
              className="p-2 rounded-full hover:bg-surface text-text-secondary hover:text-text-primary transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </header>
      )}

      {/* Main Chapter Content Container */}
      <main
        onMouseUp={handleMouseUp}
        className={`w-full flex-1 px-6 py-12 ${getMarginClass()} transition-all duration-300 z-10`}
      >
        <article
          ref={contentRef}
          className={`${getFontClass()} transition-all duration-200 select-text leading-relaxed`}
          style={{
            fontSize: `${settings.fontSize}px`,
            lineHeight: settings.lineHeight,
            letterSpacing: `${settings.letterSpacing}px`,
          }}
        >
          {/* Chapter Title */}
          <h1 className="text-3xl sm:text-4xl font-bold font-serif text-text-primary mb-8 text-center tracking-tight">
            {currentChapter.title}
          </h1>

          {/* Formatted Chapter Body */}
          <div
            className="prose dark:prose-invert max-w-none space-y-6"
            dangerouslySetInnerHTML={{ __html: currentChapter.content }}
          />
        </article>
      </main>

      {/* Floating Selection Toolbar Popup */}
      <TextSelectionMenu
        position={selectionMenuPos}
        selectedText={selectedText}
        onHighlight={handleHighlightSelection}
        onClose={() => setSelectionMenuPos(null)}
      />

      {/* Bottom Floating Pill Control Toolbar (Hidden in Zen Mode) */}
      {!settings.zenMode && (
        <FloatingToolbar
          onGoHome={onGoHome}
          onOpenToc={toggleToc}
          onOpenSearch={toggleSearch}
          onOpenThemeSettings={() => setIsThemePopoverOpen(true)}
          onOpenTypographySettings={() => setIsTypographyPopoverOpen(true)}
          onNextPage={() => setCurrentPage(currentPage + 1)}
          isBookmarked={isBookmarked}
          onToggleBookmark={toggleBookmarkCurrentPage}
        />
      )}

      {/* Drawers & Modals */}
      <TocDrawer
        book={book}
        isOpen={isTocOpen}
        onClose={toggleToc}
        onSelectChapter={(id) => setActiveChapter(id)}
      />

      <ThemeSettingsPopover
        isOpen={isThemePopoverOpen}
        onClose={() => setIsThemePopoverOpen(false)}
      />

      <TypographySettingsPopover
        isOpen={isTypographyPopoverOpen}
        onClose={() => setIsTypographyPopoverOpen(false)}
      />

      <PageSearchModal
        book={book}
        isOpen={isSearchOpen}
        onClose={toggleSearch}
        onJumpToMatch={(id) => setActiveChapter(id)}
      />
    </div>
  );
};
