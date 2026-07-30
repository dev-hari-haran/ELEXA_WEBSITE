import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Book, Highlight, Note, Bookmark } from '../types/book';

interface ElexaDB extends DBSchema {
  books: {
    key: string;
    value: Book;
  };
  highlights: {
    key: string;
    value: Highlight;
    indexes: { 'by-book': string };
  };
  notes: {
    key: string;
    value: Note;
    indexes: { 'by-book': string };
  };
  bookmarks: {
    key: string;
    value: Bookmark;
    indexes: { 'by-book': string };
  };
}

let dbPromise: Promise<IDBPDatabase<ElexaDB>> | null = null;

export const getDB = () => {
  if (!dbPromise) {
    dbPromise = openDB<ElexaDB>('elexa-reader-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('books')) {
          db.createObjectStore('books', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('highlights')) {
          const highlightStore = db.createObjectStore('highlights', { keyPath: 'id' });
          highlightStore.createIndex('by-book', 'bookId');
        }
        if (!db.objectStoreNames.contains('notes')) {
          const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
          noteStore.createIndex('by-book', 'bookId');
        }
        if (!db.objectStoreNames.contains('bookmarks')) {
          const bookmarkStore = db.createObjectStore('bookmarks', { keyPath: 'id' });
          bookmarkStore.createIndex('by-book', 'bookId');
        }
      },
    });
  }
  return dbPromise;
};

// Storage APIs
export const dbService = {
  async saveBook(book: Book): Promise<void> {
    const db = await getDB();
    await db.put('books', book);
  },

  async getAllBooks(): Promise<Book[]> {
    const db = await getDB();
    return db.getAll('books');
  },

  async addHighlight(highlight: Highlight): Promise<void> {
    const db = await getDB();
    await db.put('highlights', highlight);
  },

  async getHighlightsByBook(bookId: string): Promise<Highlight[]> {
    const db = await getDB();
    return db.getAllFromIndex('highlights', 'by-book', bookId);
  },

  async deleteHighlight(id: string): Promise<void> {
    const db = await getDB();
    await db.delete('highlights', id);
  },

  async addNote(note: Note): Promise<void> {
    const db = await getDB();
    await db.put('notes', note);
  },

  async getNotesByBook(bookId: string): Promise<Note[]> {
    const db = await getDB();
    return db.getAllFromIndex('notes', 'by-book', bookId);
  },

  async addBookmark(bookmark: Bookmark): Promise<void> {
    const db = await getDB();
    await db.put('bookmarks', bookmark);
  },

  async getBookmarksByBook(bookId: string): Promise<Bookmark[]> {
    const db = await getDB();
    return db.getAllFromIndex('bookmarks', 'by-book', bookId);
  }
};
