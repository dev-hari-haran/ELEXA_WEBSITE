import React from 'react';
import { LayoutGrid, List, Layers, Search, Filter } from 'lucide-react';
import { Book } from '../../types/book';
import { useLibraryStore } from '../../stores/useLibraryStore';
import { BookCard } from '../bookshelf/BookCard';
import { Bookshelf3D } from '../bookshelf/Bookshelf3D';

interface LibraryViewProps {
  onReadBook: (book: Book) => void;
  onDetailBook: (book: Book) => void;
}

export const LibraryView: React.FC<LibraryViewProps> = ({ onReadBook, onDetailBook }) => {
  const {
    books,
    selectedCategory,
    setCategory,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
  } = useLibraryStore();

  const categories = ['All', 'Fantasy', 'Sci-Fi', 'Classics', 'Non-Fiction', 'Technology'];

  // Filter books
  const filteredBooks = books.filter((b) => {
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full flex-1 flex flex-col gap-8 select-none">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-text-primary">
            Library Catalog
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Browse your enterprise collection of ebooks, audiobooks, and documents.
          </p>
        </div>

        {/* View Mode & Sort Controls */}
        <div className="flex items-center gap-3">
          {/* View Mode Toggle */}
          <div className="flex items-center p-1 rounded-2xl bg-surface border border-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-background text-accent shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" /> Grid
            </button>

            <button
              onClick={() => setViewMode('bookshelf3d')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'bookshelf3d'
                  ? 'bg-background text-accent shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              title="3D Bookshelf View"
            >
              <Layers className="w-4 h-4" /> 3D Shelf
            </button>

            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-background text-accent shadow-sm'
                  : 'text-text-muted hover:text-text-primary'
              }`}
              title="List View"
            >
              <List className="w-4 h-4" /> List
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat === 'All' ? null : cat)}
            className={`px-4 py-2 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              (cat === 'All' && !selectedCategory) || selectedCategory === cat
                ? 'bg-accent text-white shadow-md'
                : 'bg-surface border border-border text-text-secondary hover:bg-surface-hover'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Content Rendering based on ViewMode */}
      {viewMode === 'bookshelf3d' ? (
        <Bookshelf3D books={filteredBooks} onRead={onReadBook} onDetail={onDetailBook} />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onRead={onReadBook}
              onDetail={onDetailBook}
            />
          ))}
        </div>
      ) : (
        /* List View */
        <div className="flex flex-col gap-3">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => onDetailBook(book)}
              className="p-4 rounded-2xl bg-surface border border-border/80 hover:border-accent/40 flex items-center justify-between gap-4 cursor-pointer transition-all hover:shadow-md group"
            >
              <div className="flex items-center gap-4">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded-lg shadow-sm"
                />
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold text-text-primary group-hover:text-accent transition-colors">
                    {book.title}
                  </h3>
                  <span className="text-xs text-text-muted italic">{book.author}</span>
                  <span className="text-[10px] text-accent mt-1">{book.category}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-mono text-text-primary">
                    {book.currentPage} / {book.totalPages} p
                  </span>
                  <span className="text-[10px] text-text-muted">
                    {book.progressPercentage}% completed
                  </span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onReadBook(book);
                  }}
                  className="px-4 py-2 rounded-full bg-accent text-white text-xs font-semibold hover:scale-105 transition-transform"
                >
                  Read
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
