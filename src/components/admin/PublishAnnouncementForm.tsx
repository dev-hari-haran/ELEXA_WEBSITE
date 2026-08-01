import React, { useState } from 'react';
import { Sparkles, Send, Trash2, CheckCircle2, Megaphone, Clock, AlertCircle } from 'lucide-react';
import { useAnnouncementStore } from '../../stores/useAnnouncementStore';

export const PublishAnnouncementForm: React.FC = () => {
  const { announcements, addAnnouncement, deleteAnnouncement, clearAllAnnouncements } = useAnnouncementStore();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'New Issue' | 'Event' | 'Update' | 'Editorial'>('New Issue');
  const [publishMode, setPublishMode] = useState<'now' | 'schedule'>('now');
  const [scheduleDate, setScheduleDate] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addAnnouncement({
      title,
      content,
      category,
      date: publishMode === 'now' ? 'Just now' : `Scheduled for ${scheduleDate || 'Tomorrow'}`,
      isNew: true,
    });

    setSuccessMessage(`Announcement "${title}" released live to the main website!`);
    setTitle('');
    setContent('');
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  return (
    <div className="w-full flex flex-col gap-8 select-none">
      {/* Toast Notification */}
      {successMessage && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-semibold flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{successMessage}</span>
          </div>
        </div>
      )}

      {/* Form Container */}
      <div className="p-8 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-accent/10 text-accent flex items-center justify-center">
              <Megaphone className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-xl font-display font-bold text-text-primary">
                Release New Announcement
              </h2>
              <p className="text-xs text-text-muted font-mono">
                Broadcast live notifications to website readers & community dashboard.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted uppercase">Announcement Title</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (e.g. New Magazine Issue Released!)"
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted uppercase">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option value="New Issue">New Issue</option>
                <option value="Event">Event</option>
                <option value="Update">Update</option>
                <option value="Editorial">Editorial</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted uppercase">Announcement Details</label>
            <textarea
              rows={3}
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write announcement message for readers..."
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Release Option Switcher */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-background border border-border/70">
            <button
              type="button"
              onClick={() => setPublishMode('now')}
              className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                publishMode === 'now'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Send className="w-4 h-4" /> Publish Live Immediately
            </button>
            <button
              type="button"
              onClick={() => setPublishMode('schedule')}
              className={`p-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                publishMode === 'schedule'
                  ? 'bg-accent text-white shadow-md'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Clock className="w-4 h-4" /> Schedule Broadcast
            </button>
          </div>

          {publishMode === 'schedule' && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted uppercase">Broadcast Date</label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-accent text-white font-semibold text-xs hover:bg-accent-hover transition-colors shadow-md flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>{publishMode === 'now' ? 'Release Announcement Now' : 'Schedule Announcement Broadcast'}</span>
          </button>
        </form>
      </div>

      {/* Currently Released Announcements Management List */}
      <div className="p-8 rounded-3xl bg-surface border border-border/80 shadow-sm flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-4">
          <div className="flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-accent" />
            <h3 className="text-lg font-display font-bold text-text-primary">
              Active Announcements ({announcements.length})
            </h3>
          </div>

          {announcements.length > 0 && (
            <button
              onClick={clearAllAnnouncements}
              className="px-3.5 py-1.5 rounded-full bg-rose-500/10 text-rose-600 hover:bg-rose-500 hover:text-white text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          )}
        </div>

        {announcements.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center gap-2">
            <AlertCircle className="w-8 h-8 text-text-muted" />
            <span className="text-xs font-mono text-text-muted">
              No active announcements. When count is 0, the section is auto-hidden from website.
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="p-4 rounded-2xl bg-background border border-border/80 flex items-start justify-between gap-4"
              >
                <div className="flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-mono font-bold">
                      {ann.category}
                    </span>
                    <h4 className="text-sm font-display font-semibold text-text-primary">
                      {ann.title}
                    </h4>
                    <span className="text-[10px] text-text-muted font-mono">• {ann.date}</span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed mt-1">
                    {ann.content}
                  </p>
                </div>

                <button
                  onClick={() => deleteAnnouncement(ann.id)}
                  className="p-2 rounded-xl text-text-muted hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                  title="Delete Announcement"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
