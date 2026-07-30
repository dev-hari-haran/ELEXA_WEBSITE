export interface Chapter {
  id: string;
  title: string;
  order: number;
  content: string; // Formatted HTML / text content
  wordCount: number;
  estimatedMinutes: number;
}

export interface Highlight {
  id: string;
  bookId: string;
  chapterId: string;
  selectedText: string;
  color: 'yellow' | 'green' | 'pink' | 'blue' | 'purple';
  tags: string[];
  note?: string;
  createdAt: string;
  startOffset?: number;
  endOffset?: number;
}

export interface Bookmark {
  id: string;
  bookId: string;
  chapterId: string;
  chapterTitle: string;
  pageNumber: number;
  snippet: string;
  createdAt: string;
}

export interface Note {
  id: string;
  bookId: string;
  chapterId: string;
  title: string;
  content: string;
  highlightId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  authorBio?: string;
  coverImage: string;
  spineColor?: string;
  description: string;
  category: 'Fantasy' | 'Sci-Fi' | 'Classics' | 'Non-Fiction' | 'Technology' | 'Biography';
  collection?: string;
  editors?: string[];
  language: string;
  format: string; // e.g. "paper textured, full colour, 345 pages"
  isbn: string;
  totalPages: number;
  currentPage: number;
  currentChapterId: string;
  progressPercentage: number;
  rating: number;
  publicationYear: number;
  chapters: Chapter[];
  isFavorite: boolean;
  readingStatus: 'reading' | 'completed' | 'want_to_read';
  lastReadAt: string;
}
