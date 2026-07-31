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
  status?: 'to_read' | 'in_progress' | 'completed';
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
  edition?: string;
  author: string;
  authorBio?: string;
  authorAvatar?: string;
  coverImage: string;
  spineColor?: string;
  description: string;
  category: 'Fantasy' | 'Sci-Fi' | 'Classics' | 'Non-Fiction' | 'Technology' | 'Biography' | 'Design' | 'Architecture';
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
  likesCount?: number;
  viewsCount?: number;
  bookmarksCount?: number;
  commentsCount?: number;
  isWishlisted?: boolean;
  publicationYear: number;
  chapters: Chapter[];
  isFavorite: boolean;
  isUpcoming?: boolean;
  isScheduled?: boolean;
  scheduledReleaseDate?: string;
  coverMode?: 'first_page' | 'custom';
  pdfUrl?: string;
  pdfDataUrl?: string;
  readingStatus: 'reading' | 'completed' | 'want_to_read';
  lastReadAt: string;
}
