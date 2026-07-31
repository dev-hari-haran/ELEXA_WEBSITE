import React, { useState, useRef } from 'react';
import { Book } from '../../types/book';
import { useReaderStore } from '../../stores/useReaderStore';
import { FloatingToolbar } from './FloatingToolbar';
import { TextSelectionMenu } from './TextSelectionMenu';
import { TocDrawer } from './TocDrawer';
import { ThemeSettingsPopover } from './ThemeSettingsPopover';
import { TypographySettingsPopover } from './TypographySettingsPopover';
import { PageSearchModal } from './PageSearchModal';
import { ArrowLeft, FileText, Share2, HardDriveDownload, Volume2, VolumeX, Maximize2, Minimize2, Check, Sparkles } from 'lucide-react';
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
  const [isOfflineCached, setIsOfflineCached] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

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
    showToast("Bookmark saved to Kanban!");
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

  // Make Offline action
  const handleMakeOffline = () => {
    setIsOfflineCached(true);
    showToast(`"${book.title}" saved locally for offline reading!`);
  };

  // Download PDF action
  const handleDownloadPDF = () => {
    window.print();
  };

  // Share action
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast("Magazine link copied to clipboard!");
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

  const zoomFactor = (settings.zoomLevel || 100) / 100;

  return (
    <div className="relative min-h-screen bg-background text-text-primary transition-colors duration-300 flex flex-col items-center select-none">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-20 z-50 px-4 py-2 rounded-full bg-accent text-white text-xs font-semibold shadow-elevation flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 fill-white" />
          {toastMessage}
        </div>
      )}

      {/* Top Header Bar with Back Arrow, Title, Offline, Download PDF, Share */}
      {!settings.zenMode && (
        <header className="w-full h-16 px-6 sm:px-8 flex items-center justify-between z-30 border-b border-border/60 bg-surface/80 backdrop-blur-md">
          {/* Back Arrow Button & Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onGoHome}
              className="p-2 rounded-full hover:bg-surface-hover text-text-primary transition-all flex items-center gap-2 font-display font-medium text-xs border border-border/80"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
            <span className="text-text-muted">•</span>
            <div className="flex flex-col">
              <span className="text-xs font-display font-semibold text-text-primary line-clamp-1">
                {book.title}
              </span>
              <span className="text-[10px] font-mono text-accent">
                {book.edition || 'Special Magazine'}
              </span>
            </div>
          </div>

          {/* Action Controls Header */}
          <div className="flex items-center gap-2">
            {/* Make Offline Button */}
            <button
              onClick={handleMakeOffline}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all border ${
                isOfflineCached
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                  : 'bg-background border-border text-text-secondary hover:text-text-primary hover:border-accent'
              }`}
              title="Save Magazine Locally for Offline Reading"
            >
              {isOfflineCached ? <Check className="w-3.5 h-3.5" /> : <HardDriveDownload className="w-3.5 h-3.5 text-accent" />}
              <span className="hidden md:inline">{isOfflineCached ? 'Offline Ready' : 'Make Offline'}</span>
            </button>

            {/* Download PDF Button */}
            <button
              onClick={handleDownloadPDF}
              className="px-3 py-1.5 rounded-full bg-background border border-border text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-accent transition-all flex items-center gap-1.5"
              title="Download Magazine PDF"
            >
              <FileText className="w-3.5 h-3.5 text-accent" />
              <span className="hidden md:inline">Download PDF</span>
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-background border border-border text-text-secondary hover:text-text-primary hover:border-accent transition-all"
              title="Share Magazine Link"
            >
              <Share2 className="w-4 h-4 text-accent" />
            </button>

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

      {/* Main Editorial Text View */}
      <main
        onMouseUp={handleMouseUp}
        className={`w-full flex-1 px-6 py-12 ${getMarginClass()} transition-all duration-300 z-10`}
        style={{
          transform: `scale(${zoomFactor})`,
          transformOrigin: 'top center',
        }}
      >
        <article
          ref={contentRef}
          className="font-reader transition-all duration-200 select-text leading-relaxed text-base"
        >
          {/* Chapter Title */}
          <h1 className="text-3xl sm:text-4xl font-bold font-display text-text-primary mb-8 text-center tracking-tight">
            {currentChapter.title}
          </h1>

          {/* Formatted Chapter Body */}
          <div
            className="prose dark:prose-invert max-w-none space-y-6 text-text-primary"
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
