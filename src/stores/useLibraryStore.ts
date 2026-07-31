import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Book } from '../types/book';
import { MOCK_BOOKS } from '../data/mockBooks';

interface LibraryState {
  books: Book[];
  selectedCategory: string | null;
  selectedCollection: string | null;
  selectedBookDetail: Book | null;
  viewMode: 'grid' | 'list' | 'bookshelf3d';
  searchQuery: string;
  sortBy: 'recent' | 'title' | 'author' | 'progress';

  // Actions
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBook: (bookId: string, updatedFields: Partial<Book>) => void;
  deleteBook: (bookId: string) => void;
  setCategory: (category: string | null) => void;
  setCollection: (collection: string | null) => void;
  openBookDetail: (book: Book | null) => void;
  setViewMode: (mode: 'grid' | 'list' | 'bookshelf3d') => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sort: 'recent' | 'title' | 'author' | 'progress') => void;
  toggleFavorite: (bookId: string) => void;
  updateBookProgress: (bookId: string, page: number, chapterId?: string) => void;
}

export const useLibraryStore = create<LibraryState>()(
  persist(
    (set) => ({
      books: MOCK_BOOKS,
      selectedCategory: null,
      selectedCollection: null,
      selectedBookDetail: null,
      viewMode: 'grid',
      searchQuery: '',
      sortBy: 'recent',

      setBooks: (books) => set({ books }),
      addBook: (newBook) => set((state) => ({ books: [newBook, ...state.books] })),
      updateBook: (bookId, updatedFields) =>
        set((state) => ({
          books: state.books.map((b) => (b.id === bookId ? { ...b, ...updatedFields } : b)),
        })),
      deleteBook: (bookId) =>
        set((state) => ({
          books: state.books.filter((b) => b.id !== bookId),
        })),
      setCategory: (category) => set({ selectedCategory: category }),
      setCollection: (collection) => set({ selectedCollection: collection }),
      openBookDetail: (book) => set({ selectedBookDetail: book }),
      setViewMode: (mode) => set({ viewMode: mode }),
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSortBy: (sort) => set({ sortBy: sort }),

      toggleFavorite: (bookId) =>
        set((state) => ({
          books: state.books.map((b) =>
            b.id === bookId ? { ...b, isFavorite: !b.isFavorite } : b
          ),
        })),

      updateBookProgress: (bookId, page, chapterId) =>
        set((state) => ({
          books: state.books.map((b) => {
            if (b.id !== bookId) return b;
            const progress = Math.min(100, Math.round((page / b.totalPages) * 1000) / 10);
            return {
              ...b,
              currentPage: page,
              currentChapterId: chapterId || b.currentChapterId,
              progressPercentage: progress,
              readingStatus: progress >= 100 ? 'completed' : 'reading',
              lastReadAt: new Date().toISOString(),
            };
          }),
        })),
    }),
    {
      name: 'elexa-library-storage',
    }
  )
);
