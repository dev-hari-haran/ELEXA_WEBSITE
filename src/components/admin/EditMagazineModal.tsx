import React, { useState, useEffect } from 'react';
import { X, Edit3, Save, Trash2, Image as ImageIcon } from 'lucide-react';
import { Book } from '../../types/book';
import { useLibraryStore } from '../../stores/useLibraryStore';

interface EditMagazineModalProps {
  book: Book | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EditMagazineModal: React.FC<EditMagazineModalProps> = ({ book, isOpen, onClose }) => {
  const { updateBook, deleteBook } = useLibraryStore();

  const [title, setTitle] = useState('');
  const [edition, setEdition] = useState('');
  const [author, setAuthor] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Fantasy' | 'Sci-Fi' | 'Classics' | 'Non-Fiction' | 'Technology' | 'Biography' | 'Design' | 'Architecture'>('Design');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setEdition(book.edition || '');
      setAuthor(book.author);
      setCoverImage(book.coverImage);
      setDescription(book.description);
      setCategory(book.category);
    }
  }, [book]);

  if (!isOpen || !book) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBook(book.id, {
      title,
      edition,
      author,
      coverImage,
      description,
      category,
    });
    onClose();
  };

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete "${book.title}"? This cannot be undone.`)) {
      deleteBook(book.id);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-xl bg-surface border border-border rounded-3xl shadow-elevation overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border/70 flex items-center justify-between bg-background/50">
          <div className="flex items-center gap-2 font-display font-semibold text-lg text-text-primary">
            <Edit3 className="w-5 h-5 text-accent" />
            Modify Magazine Issue
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-surface-hover text-text-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-text-muted uppercase">Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-text-muted uppercase">Edition / Tag</label>
              <input
                type="text"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-text-muted uppercase">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-text-muted uppercase">Cover Image URL</label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono text-text-muted uppercase">Description</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-border/70">
            <button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Delete Issue
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-background border border-border text-xs font-semibold text-text-secondary hover:bg-surface-hover"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-accent text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-accent-hover transition-colors"
              >
                <Save className="w-4 h-4" /> Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
