import React, { useState } from 'react';
import { ArrowUpRight, Heart, Send, Sparkles, MessageSquare, ChevronDown, Award, Star, Flame, Eye } from 'lucide-react';
import { Book } from '../../types/book';
import { BookCard } from '../bookshelf/BookCard';
import { MOCK_FRIENDS } from '../../data/mockFriends';
import { MOCK_ANNOUNCEMENTS } from '../../data/mockAnnouncements';
import { MOCK_AUTHORS } from '../../data/mockAuthors';

interface HomeDashboardViewProps {
  books: Book[];
  onReadBook: (book: Book) => void;
  onDetailBook: (book: Book) => void;
}

export const HomeDashboardView: React.FC<HomeDashboardViewProps> = ({
  books,
  onReadBook,
  onDetailBook,
}) => {
  const [popularTab, setPopularTab] = useState<'most_popular' | 'last_read'>('most_popular');
  const [comments, setComments] = useState(MOCK_FRIENDS);
  const [newCommentText, setNewCommentText] = useState('');
  const [friendsLimit, setFriendsLimit] = useState(3);
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({
    'deadpool-samurai': true,
    'upcoming-design': true,
  });

  const currentReadingBook = books.find((b) => b.id === 'hp-6') || books[0];
  const announcements = MOCK_ANNOUNCEMENTS;

  // Filter popular books based on tab selection
  const filteredPopularBooks = popularTab === 'most_popular'
    ? [...books].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0))
    : [...books].sort((a, b) => new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime());

  // Upcoming books
  const upcomingBooks = books.filter(b => b.isUpcoming || b.publicationYear >= 2026);
  // Highest liked magazines
  const highestLikedBooks = [...books].sort((a, b) => (b.likesCount || 0) - (a.likesCount || 0)).slice(0, 4);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    const newEntry = {
      id: `comment-${Date.now()}`,
      name: 'Alexander Mark',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      bookId: currentReadingBook.id,
      bookTitle: currentReadingBook.title,
      chapterTitle: 'Issue Review',
      comment: newCommentText,
      timestamp: 'Just now'
    };
    setComments([newEntry, ...comments]);
    setNewCommentText('');
  };

  return (
    <div className="w-full flex-1 flex flex-col xl:flex-row gap-8 select-none">
      {/* Left Main Content Column */}
      <div className="flex-1 flex flex-col gap-10">
        
        {/* Main Hero Banner — No Progress Bar, No Editorial Badge, No Page Numbers */}
        <div className="p-8 rounded-3xl bg-surface border border-border/80 shadow-sm relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent-light/40 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />

          <div className="flex flex-col gap-4 max-w-md z-10">
            <h1 className="text-3xl sm:text-4xl font-display font-semibold text-text-primary leading-[1.15] tracking-tight">
              Happy reading, <br />
              <span className="text-accent italic font-normal">Harvey</span>
            </h1>
            <p className="text-sm text-text-secondary leading-relaxed">
              Immerse yourself in the latest magazines, editorial features, and curated digital columns.
            </p>

            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => onReadBook(currentReadingBook)}
                className="px-6 py-3 rounded-full bg-text-primary text-background font-semibold text-sm flex items-center gap-2 hover:bg-accent hover:text-white transition-all shadow-md group"
              >
                Start reading <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Magazine Cover Card Graphic (No Progress Bar) */}
          <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 cursor-pointer" onClick={() => onReadBook(currentReadingBook)}>
            <div className="w-64 h-44 rounded-xl bg-background border border-border/80 shadow-2xl p-4 flex items-center gap-4 transform rotate-1">
              <img
                src={currentReadingBook.coverImage}
                alt={currentReadingBook.title}
                className="w-24 h-full object-cover rounded shadow-md"
              />
              <div className="flex flex-col justify-between h-full py-1">
                <div className="flex flex-col">
                  <span className="text-[10px] font-mono uppercase text-accent font-semibold">
                    {currentReadingBook.edition || 'Current Issue'}
                  </span>
                  <h4 className="text-xs font-bold text-text-primary line-clamp-2 mt-1 font-display">
                    {currentReadingBook.title}
                  </h4>
                </div>
                <div className="text-[11px] text-text-muted font-mono">
                  By {currentReadingBook.author}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Now Section — Tabs: Most Popular / Last Read, No Progress Bars */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-xl font-display font-bold text-text-primary">
              Popular Magazines
            </h2>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-surface border border-border/80">
              <button
                onClick={() => setPopularTab('most_popular')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  popularTab === 'most_popular'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Most Popular
              </button>
              <button
                onClick={() => setPopularTab('last_read')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  popularTab === 'last_read'
                    ? 'bg-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                Last Read
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {filteredPopularBooks.slice(0, 4).map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onRead={onReadBook}
                onDetail={onDetailBook}
              />
            ))}
          </div>
        </div>

        {/* Highest Likes of Magazine Section */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-2">
              <Flame className="w-5 h-5 text-accent" /> Highest Likes of Magazine
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highestLikedBooks.map((book) => (
              <div 
                key={book.id}
                className="p-4 rounded-2xl bg-surface border border-border/80 hover:border-accent/50 transition-all flex items-center gap-4 group"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded-lg shadow-sm flex-shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-accent uppercase font-semibold">
                      {book.edition || book.category}
                    </span>
                    <h4 className="text-sm font-display font-semibold text-text-primary line-clamp-1">
                      {book.title}
                    </h4>
                    <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                      By {book.author}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40">
                    <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                      <Heart className="w-3.5 h-3.5 fill-accent text-accent" />
                      {(book.likesCount || 12000).toLocaleString()} Likes
                    </span>
                    <button
                      onClick={() => onReadBook(book)}
                      className="text-xs font-semibold text-accent hover:underline flex items-center gap-0.5"
                    >
                      Read <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Best Author Section */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-2">
              <Award className="w-5 h-5 text-accent" /> Best Magazine Authors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_AUTHORS.map((author) => (
              <div key={author.id} className="p-5 rounded-2xl bg-surface border border-border/80 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-accent/20"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-sm font-display font-semibold text-text-primary">
                      {author.name}
                    </h3>
                    <span className="text-[11px] text-accent font-mono">
                      {author.designation} • {author.followers} readers
                    </span>
                  </div>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                  {author.bio}
                </p>
                <div className="mt-1 pt-2 border-t border-border/40 text-[11px] font-mono text-text-muted">
                  Featured: <span className="text-text-primary font-medium">{author.featuredIssueTitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Magazines Grid — Wishlist Button */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h2 className="text-xl font-display font-bold text-text-primary flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" /> Upcoming Magazine Editions
            </h2>
            <span className="text-xs font-mono text-text-muted">Sneak Previews</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {upcomingBooks.map((book) => (
              <div 
                key={book.id} 
                className="p-5 rounded-2xl bg-surface border border-border/80 flex items-start gap-4 hover:border-accent/40 transition-colors"
              >
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-xl shadow-md flex-shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase text-accent font-semibold">
                        Release 2026/2027
                      </span>
                      <button
                        onClick={() => toggleWishlist(book.id)}
                        className={`p-1.5 rounded-full transition-colors ${
                          wishlist[book.id]
                            ? 'bg-accent/10 text-accent'
                            : 'text-text-muted hover:text-accent hover:bg-surface-hover'
                        }`}
                        title="Add to Wishlist"
                      >
                        <Heart className={`w-4 h-4 ${wishlist[book.id] ? 'fill-accent' : ''}`} />
                      </button>
                    </div>
                    <h3 className="text-sm font-display font-bold text-text-primary mt-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-2 mt-1">
                      {book.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-text-muted">
                      Wishlisted by {wishlist[book.id] ? 'You & 1,420 others' : '1,420 readers'}
                    </span>
                    <button
                      onClick={() => onDetailBook(book)}
                      className="px-3 py-1 rounded-full bg-background border border-border text-xs font-semibold text-text-primary hover:bg-accent hover:text-white transition-colors"
                    >
                      Preview Issue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Right Sidebar Column */}
      <div className="w-full xl:w-80 flex flex-col gap-8">
        
        {/* Announcements Section (Conditionally rendered if announcements exist) */}
        {announcements.length > 0 && (
          <div className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-display font-bold text-base text-text-primary flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent fill-accent" /> Announcements
              </h3>
              <span className="text-xs text-accent font-mono font-medium">
                {announcements.length} New
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {announcements.map((ann) => (
                <div key={ann.id} className="p-3.5 rounded-2xl bg-background/60 border border-border/40 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-text-primary font-display">{ann.title}</span>
                    <span className="text-[10px] text-text-muted font-mono">{ann.date}</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {ann.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Friends Community Section — Comment Box + Show More */}
        <div className="p-6 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-border/60 pb-3">
            <h3 className="font-display font-bold text-base text-text-primary flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-accent" /> Friends
            </h3>
            <span className="text-xs text-text-muted font-mono">
              {comments.length} Posts
            </span>
          </div>

          {/* Interactive Comment Box */}
          <form onSubmit={handlePostComment} className="flex gap-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Share a message or review..."
              className="flex-1 px-3.5 py-2 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-accent text-white hover:bg-accent-hover transition-colors"
              title="Post comment"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Comments List */}
          <div className="flex flex-col gap-3">
            {comments.slice(0, friendsLimit).map((friend) => (
              <div key={friend.id} className="flex items-start gap-3 p-3 rounded-2xl bg-background/60 border border-border/40">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-9 h-9 rounded-full object-cover ring-2 ring-border/80"
                />
                <div className="flex flex-col text-xs flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-text-primary">{friend.name}</span>
                    <span className="text-[10px] text-text-muted font-mono">{friend.timestamp}</span>
                  </div>
                  <p className="text-text-secondary italic mt-1 leading-relaxed">
                    "{friend.comment}"
                  </p>
                  <span className="text-[10px] font-mono font-medium text-accent mt-1">
                    ✓ {friend.chapterTitle}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Expand Button */}
          {friendsLimit < comments.length && (
            <button
              onClick={() => setFriendsLimit(prev => prev + 3)}
              className="w-full py-2.5 rounded-xl bg-background border border-border text-xs font-semibold text-text-primary hover:bg-surface-hover transition-colors flex items-center justify-center gap-1.5"
            >
              Show More <ChevronDown className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
