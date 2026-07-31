import React, { useState, useRef } from 'react';
import { Book } from '../../types/book';
import { useReaderStore } from '../../stores/useReaderStore';
import { FloatingToolbar } from './FloatingToolbar';
import { TextSelectionMenu } from './TextSelectionMenu';
import { TocDrawer } from './TocDrawer';
import { ThemeSettingsPopover } from './ThemeSettingsPopover';
import { TypographySettingsPopover } from './TypographySettingsPopover';
import { PageSearchModal } from './PageSearchModal';
import { ArrowLeft, FileText, Share2, HardDriveDownload, Volume2, VolumeX, Maximize2, Minimize2, Check, Sparkles, BookOpen, Layers, ExternalLink } from 'lucide-react';
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
  const [readerViewMode, setReaderViewMode] = useState<'editorial' | 'pdf_viewer'>('editorial');
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

      {/* Top Header Bar with Back Arrow, Reader Mode Switcher, PDF View, Offline, Share */}
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

          {/* Center Mode Switcher: Editorial Text vs PDF Viewer */}
          <div className="hidden md:flex items-center gap-1 p-1 rounded-xl bg-background border border-border/80">
            <button
              onClick={() => setReaderViewMode('editorial')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                readerViewMode === 'editorial'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" /> Editorial View
            </button>
            <button
              onClick={() => setReaderViewMode('pdf_viewer')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                readerViewMode === 'pdf_viewer'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> PDF Document Reader
            </button>
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

      {/* Main Content Area: PDF Viewer Mode vs Editorial Text Mode */}
      {readerViewMode === 'pdf_viewer' ? (
        <main className="w-full flex-1 p-6 flex flex-col items-center justify-center z-10 max-w-6xl">
          <div className="w-full h-[82vh] rounded-3xl bg-surface border border-border/80 shadow-elevation overflow-hidden flex flex-col">
            <div className="px-6 py-3 bg-background border-b border-border/60 flex items-center justify-between">
              <span className="text-xs font-mono text-text-primary font-semibold flex items-center gap-2">
                <FileText className="w-4 h-4 text-accent" />
                {book.pdfUrl ? `PDF Document: ${book.pdfUrl}` : `${book.title} (Digital PDF Edition)`}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                  High Resolution PDF Active
                </span>
                <button
                  onClick={handleDownloadPDF}
                  className="text-xs text-accent hover:underline flex items-center gap-1 font-semibold"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> Fullscreen PDF
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer Container */}
            <div className="w-full flex-1 bg-neutral-900 flex items-center justify-center p-4">
              <div className="w-full h-full rounded-xl bg-white shadow-2xl overflow-hidden flex flex-col items-center justify-center text-slate-800 p-8 text-center relative">
                {/* Embedded Magazine PDF Cover & Page Frame */}
                <div className="flex flex-col items-center gap-4 max-w-lg">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-48 h-64 object-cover rounded-xl shadow-2xl border-4 border-slate-200"
                  />
                  <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-display font-bold text-slate-900">
                      {book.title}
                    </h2>
                    <span className="text-xs font-mono text-slate-500">
                      {book.edition || 'PDF Magazine Edition'} • {book.author}
                    </span>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Interactive vector PDF document loaded into Elexa Reading Engine.
                    </p>
                  </div>

                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setReaderViewMode('editorial')}
                      className="px-5 py-2.5 rounded-full bg-accent text-white font-semibold text-xs shadow-md hover:bg-accent-hover transition-colors"
                    >
                      Switch to Editorial Text View
                    </button>
                    <button
                      onClick={handleDownloadPDF}
                      className="px-5 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-xs shadow-md hover:bg-slate-800 transition-colors"
                    >
                      Open PDF Print Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* Editorial Text View */
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
      )}

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
