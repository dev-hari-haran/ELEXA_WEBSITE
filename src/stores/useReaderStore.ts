import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ReaderSettings, FontFamily, PageAnimation, ColumnMargin, TextAlign } from '../types/reader';
import { Highlight, Bookmark, Note } from '../types/book';

interface ReaderState {
  activeBookId: string | null;
  activeChapterId: string | null;
  currentPage: number;
  settings: ReaderSettings;
  highlights: Highlight[];
  notes: Note[];
  bookmarks: Bookmark[];
  isTocOpen: boolean;
  isSearchOpen: boolean;
  isSettingsOpen: boolean;
  isSpeaking: boolean;
  speechRate: number;
  searchQuery: string;

  // Actions
  setActiveBook: (bookId: string, chapterId?: string, page?: number) => void;
  setActiveChapter: (chapterId: string) => void;
  setCurrentPage: (page: number) => void;
  updateSettings: (newSettings: Partial<ReaderSettings>) => void;
  toggleToc: () => void;
  toggleSearch: () => void;
  toggleSettings: () => void;
  setSearchQuery: (query: string) => void;
  addHighlight: (highlight: Highlight) => void;
  removeHighlight: (id: string) => void;
  addNote: (note: Note) => void;
  addBookmark: (bookmark: Bookmark) => void;
  setSpeaking: (speaking: boolean) => void;
  setSpeechRate: (rate: number) => void;
}

const DEFAULT_SETTINGS: ReaderSettings = {
  fontFamily: 'serif',
  fontSize: 18,
  lineHeight: 1.7,
  letterSpacing: 0,
  columnMargin: 'medium',
  textAlign: 'left',
  pageAnimation: 'flip3d',
  focusMode: false,
  zenMode: false,
  bionicReading: false,
  autoScroll: false,
  autoScrollSpeed: 2,
};

export const useReaderStore = create<ReaderState>()(
  persist(
    (set) => ({
      activeBookId: 'hp-6',
      activeChapterId: 'hp6-ch2',
      currentPage: 200,
      settings: DEFAULT_SETTINGS,
      highlights: [
        {
          id: 'h-1',
          bookId: 'hp-6',
          chapterId: 'hp6-ch2',
          selectedText: 'bunch of grapes next to him," said Professor McGonagall. "We think he was trying to sneak up here to visit Potter."',
          color: 'pink',
          tags: ['plot', 'quote'],
          createdAt: new Date().toISOString(),
        }
      ],
      notes: [],
      bookmarks: [
        {
          id: 'bm-1',
          bookId: 'hp-6',
          chapterId: 'hp6-ch2',
          chapterTitle: 'Chapter Two: Spinner\'s End',
          pageNumber: 200,
          snippet: 'There was a bunch of grapes next to him...',
          createdAt: new Date().toISOString(),
        }
      ],
      isTocOpen: false,
      isSearchOpen: false,
      isSettingsOpen: false,
      isSpeaking: false,
      speechRate: 1.0,
      searchQuery: '',

      setActiveBook: (bookId, chapterId, page) =>
        set((state) => ({
          activeBookId: bookId,
          activeChapterId: chapterId || state.activeChapterId,
          currentPage: page || 1,
        })),

      setActiveChapter: (chapterId) => set({ activeChapterId: chapterId }),
      setCurrentPage: (page) => set({ currentPage: page }),

      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      toggleToc: () => set((state) => ({ isTocOpen: !state.isTocOpen })),
      toggleSearch: () => set((state) => ({ isSearchOpen: !state.isSearchOpen })),
      toggleSettings: () => set((state) => ({ isSettingsOpen: !state.isSettingsOpen })),
      setSearchQuery: (query) => set({ searchQuery: query }),

      addHighlight: (highlight) =>
        set((state) => ({ highlights: [...state.highlights, highlight] })),
      removeHighlight: (id) =>
        set((state) => ({
          highlights: state.highlights.filter((h) => h.id !== id),
        })),

      addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
      addBookmark: (bookmark) =>
        set((state) => ({ bookmarks: [...state.bookmarks, bookmark] })),

      setSpeaking: (speaking) => set({ isSpeaking: speaking }),
      setSpeechRate: (rate) => set({ speechRate: rate }),
    }),
    {
      name: 'elexa-reader-storage',
    }
  )
);
