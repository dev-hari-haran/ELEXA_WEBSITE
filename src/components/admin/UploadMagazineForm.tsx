import React, { useState } from 'react';
import { UploadCloud, FileText, Image as ImageIcon, Calendar, Clock, CheckCircle2, UserCheck, Sparkles, Plus, X, Upload, Eye } from 'lucide-react';
import * as pdfjsLib from 'pdfjs-dist';
import { useLibraryStore } from '../../stores/useLibraryStore';
import { useReaderStore } from '../../stores/useReaderStore';
import { Book } from '../../types/book';
import { saveMagazineToSupabase } from '../../services/supabaseClient';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface UploadMagazineFormProps {
  onSuccess?: () => void;
}

export const UploadMagazineForm: React.FC<UploadMagazineFormProps> = ({ onSuccess }) => {
  const { addBook } = useLibraryStore();
  const { setActiveBook } = useReaderStore();

  // Form State
  const [pdfFileName, setPdfFileName] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [edition, setEdition] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Fantasy' | 'Sci-Fi' | 'Classics' | 'Non-Fiction' | 'Technology' | 'Biography' | 'Design' | 'Architecture'>('Design');
  
  // Cover Mode
  const [coverMode, setCoverMode] = useState<'first_page' | 'custom'>('first_page');
  const [customCoverUrl, setCustomCoverUrl] = useState('');
  const [pdfFirstPageCoverUrl, setPdfFirstPageCoverUrl] = useState<string | null>(null);
  const [coverFileName, setCoverFileName] = useState<string | null>(null);
  const [isExtractingCover, setIsExtractingCover] = useState<boolean>(false);

  // Authors & Editors
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>(['Elexa Editorial Team']);
  const [authorInput, setAuthorInput] = useState('');
  const [selectedEditors, setSelectedEditors] = useState<string[]>(['Elena Rostova', 'Christopher Reath']);
  const [editorInput, setEditorInput] = useState('');

  // Publishing Schedule
  const [publishMode, setPublishMode] = useState<'now' | 'schedule'>('now');
  const [scheduledDate, setScheduledDate] = useState('2026-08-15');
  const [scheduledTime, setScheduledTime] = useState('10:00');

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);
  const [pdfDataUrl, setPdfDataUrl] = useState<string | null>(null);

  // PDF Upload & Automatic Page 1 Cover Extraction Handler
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPdfFileName(file.name);
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '));
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      if (typeof reader.result === 'string') {
        const dataUrl = reader.result;
        setPdfDataUrl(dataUrl);

        // Extract Page 1 of PDF as High-Res Cover Graphic
        try {
          setIsExtractingCover(true);
          const loadingTask = pdfjsLib.getDocument(dataUrl);
          const pdfDoc = await loadingTask.promise;
          const page = await pdfDoc.getPage(1);
          const viewport = page.getViewport({ scale: 1.8 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          if (context) {
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: context, viewport }).promise;
            const page1Cover = canvas.toDataURL('image/jpeg', 0.85);
            setPdfFirstPageCoverUrl(page1Cover);
            if (coverMode === 'first_page') {
              setCustomCoverUrl(page1Cover);
            }
          }
        } catch (err) {
          console.error('Error rendering Page 1 cover:', err);
        } finally {
          setIsExtractingCover(false);
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Image File Upload Handler (Custom Cover Image)
  const handleCoverImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setCustomCoverUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddAuthor = () => {
    if (authorInput.trim() && !selectedAuthors.includes(authorInput.trim())) {
      setSelectedAuthors([...selectedAuthors, authorInput.trim()]);
      setAuthorInput('');
    }
  };

  const handleRemoveAuthor = (name: string) => {
    setSelectedAuthors(selectedAuthors.filter(a => a !== name));
  };

  const handleAddEditor = () => {
    if (editorInput.trim() && !selectedEditors.includes(editorInput.trim())) {
      setSelectedEditors([...selectedEditors, editorInput.trim()]);
      setEditorInput('');
    }
  };

  const handleRemoveEditor = (name: string) => {
    setSelectedEditors(selectedEditors.filter(e => e !== name));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a magazine title.');
      return;
    }

    // Determine final cover graphic
    const finalCover = coverMode === 'first_page'
      ? (pdfFirstPageCoverUrl || customCoverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop')
      : (customCoverUrl || pdfFirstPageCoverUrl || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop');

    const newMagazine: Book = {
      id: `mag-${Date.now()}`,
      title,
      subtitle: subtitle || 'Special Editorial Edition',
      edition: edition || 'Magazine Special — 2026',
      author: selectedAuthors.join(', ') || 'Elexa Editorial Team',
      authorBio: 'Featured magazine author on Elexa Platform.',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      coverImage: finalCover,
      spineColor: '#1E4D3B',
      description: description || 'High-gloss digital magazine exploring modern design, literature, and architectural arts.',
      category,
      collection: 'Editorial Series',
      editors: selectedEditors,
      language: 'English',
      format: 'PDF Digital Magazine',
      isbn: `978-0-${Math.floor(100000 + Math.random() * 900000)}`,
      totalPages: 120,
      currentPage: 0,
      currentChapterId: 'ch-1',
      progressPercentage: 0,
      rating: 5.0,
      likesCount: 18500,
      viewsCount: 34200,
      bookmarksCount: 120,
      commentsCount: 45,
      isWishlisted: false,
      publicationYear: 2026,
      chapters: [
        {
          id: 'ch-1',
          title: 'Opening Feature: Keynote Editorial',
          order: 1,
          wordCount: 2400,
          estimatedMinutes: 10,
          content: `<p>Welcome to this special digital edition of ${title}. In this magazine, we explore groundbreaking perspectives in modern literature and architectural design...</p>`
        }
      ],
      isFavorite: true,
      isUpcoming: publishMode === 'schedule',
      isScheduled: publishMode === 'schedule',
      scheduledReleaseDate: publishMode === 'schedule' ? `${scheduledDate} ${scheduledTime}` : undefined,
      coverMode,
      pdfUrl: pdfFileName || 'digital_edition.pdf',
      pdfDataUrl: pdfDataUrl || undefined,
      readingStatus: 'reading',
      lastReadAt: new Date().toISOString(),
    };

    // Add magazine to library store & set as active reader magazine across whole site!
    addBook(newMagazine);
    setActiveBook(newMagazine.id);
    saveMagazineToSupabase(newMagazine);

    const msg = publishMode === 'now' 
      ? `"${title}" uploaded live! Reflected across the entire website.`
      : `"${title}" scheduled for release on ${scheduledDate} at ${scheduledTime}!`;

    setNotificationMsg(msg);
    setTimeout(() => {
      setNotificationMsg(null);
      if (onSuccess) onSuccess();
    }, 2500);
  };

  const activeCoverPreview = coverMode === 'first_page' ? pdfFirstPageCoverUrl : customCoverUrl;

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-8 select-none">
      {/* Toast Alert */}
      {notificationMsg && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-sm font-semibold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* 1. PDF Upload Dropzone */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-4">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <UploadCloud className="w-5 h-5 text-accent" />
          <h3 className="font-display font-semibold text-base text-text-primary">
            Step 1: Upload Magazine PDF Document
          </h3>
        </div>

        <div className="relative border-2 border-dashed border-border/80 hover:border-accent rounded-2xl p-8 flex flex-col items-center justify-center text-center gap-3 bg-background/50 hover:bg-surface-hover/50 transition-all cursor-pointer group">
          <input
            type="file"
            accept=".pdf"
            onChange={handlePdfUpload}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="w-14 h-14 rounded-2xl bg-accent-light text-accent flex items-center justify-center group-hover:scale-110 transition-transform">
            <FileText className="w-7 h-7" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-display font-bold text-text-primary">
              {pdfFileName ? `Selected PDF: ${pdfFileName}` : 'Drag & Drop Magazine PDF Here'}
            </span>
            <span className="text-xs text-text-muted font-mono">
              PDF file will power the 2-Page Spread Reader and auto-generate the Cover Page
            </span>
          </div>
        </div>
      </div>

      {/* 2. Cover Page Configuration (First Page PDF Extraction or Custom Image) */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-5">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-accent" />
            <h3 className="font-display font-semibold text-base text-text-primary">
              Step 2: Cover Page Configuration
            </h3>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-background border border-border/80">
            <button
              type="button"
              onClick={() => {
                setCoverMode('first_page');
                if (pdfFirstPageCoverUrl) setCustomCoverUrl(pdfFirstPageCoverUrl);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                coverMode === 'first_page'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Use First PDF Page
            </button>
            <button
              type="button"
              onClick={() => setCoverMode('custom')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                coverMode === 'custom'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Upload Custom Image
            </button>
          </div>
        </div>

        {/* Live Cover Preview Window */}
        <div className="p-4 rounded-2xl bg-background border border-border/70 flex flex-col sm:flex-row items-center gap-4">
          {activeCoverPreview ? (
            <img
              src={activeCoverPreview}
              alt="Cover Preview"
              className="w-24 h-32 object-cover rounded-xl border border-border/80 shadow-md flex-shrink-0"
            />
          ) : (
            <div className="w-24 h-32 rounded-xl border-2 border-dashed border-border/80 flex flex-col items-center justify-center text-text-muted text-center p-2 flex-shrink-0">
              <Eye className="w-6 h-6" />
              <span className="text-[10px] font-mono mt-1">No Cover Yet</span>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-mono text-accent uppercase font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Live Cover Preview
            </span>
            <p className="text-xs text-text-secondary leading-relaxed">
              {coverMode === 'first_page'
                ? isExtractingCover
                  ? 'Extracting Page 1 from PDF as Cover Graphic...'
                  : pdfFirstPageCoverUrl
                  ? '✓ First page of uploaded PDF extracted as official cover page!'
                  : 'Upload a PDF above to automatically extract Page 1 as the Cover Page.'
                : 'Upload a custom cover image or enter an image URL below.'}
            </p>
          </div>
        </div>

        {coverMode === 'custom' && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted uppercase">Upload Local Image File</label>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2.5 rounded-xl bg-background border border-border/80 hover:border-accent text-xs font-semibold text-text-primary cursor-pointer flex items-center gap-2 transition-colors">
                  <Upload className="w-4 h-4 text-accent" />
                  <span>{coverFileName ? `File: ${coverFileName}` : 'Choose Custom Image File...'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleCoverImageFileUpload}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-text-muted">OR paste URL:</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted uppercase">Cover Image URL</label>
              <input
                type="url"
                value={customCoverUrl}
                onChange={(e) => setCustomCoverUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent font-mono"
              />
            </div>
          </div>
        )}
      </div>

      {/* 3. Metadata, Authors & Editors */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-6">
        <div className="flex items-center gap-2 border-b border-border/60 pb-3">
          <UserCheck className="w-5 h-5 text-accent" />
          <h3 className="font-display font-semibold text-base text-text-primary">
            Step 3: Magazine Details, Authors & Editors
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted uppercase">Magazine Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Magazine Title"
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted uppercase">Magazine Tag / Edition</label>
            <input
              type="text"
              value={edition}
              onChange={(e) => setEdition(e.target.value)}
              placeholder="Magazine Edition Tag"
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted uppercase">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {['Design', 'Architecture', 'Fantasy', 'Sci-Fi', 'Classics', 'Non-Fiction', 'Technology', 'Biography'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted uppercase">Subtitle</label>
            <input
              type="text"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Magazine Subtitle"
              className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-text-muted uppercase">Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Overview of magazine content..."
            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>

        {/* Multi-Author Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-text-muted uppercase">Authors</label>
          <div className="flex flex-wrap gap-2 mb-1">
            {selectedAuthors.map((auth) => (
              <span key={auth} className="px-3 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 text-xs font-medium flex items-center gap-1.5">
                {auth}
                <button type="button" onClick={() => handleRemoveAuthor(auth)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              placeholder="Add author name..."
              className="flex-1 px-4 py-2 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="button"
              onClick={handleAddAuthor}
              className="px-4 py-2 rounded-xl bg-surface-hover text-text-primary text-xs font-semibold flex items-center gap-1 hover:bg-accent hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Author
            </button>
          </div>
        </div>

        {/* Multi-Editor Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-text-muted uppercase">Editors</label>
          <div className="flex flex-wrap gap-2 mb-1">
            {selectedEditors.map((ed) => (
              <span key={ed} className="px-3 py-1 rounded-full bg-surface-hover text-text-primary border border-border text-xs font-medium flex items-center gap-1.5">
                {ed}
                <button type="button" onClick={() => handleRemoveEditor(ed)} className="hover:text-red-500">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={editorInput}
              onChange={(e) => setEditorInput(e.target.value)}
              placeholder="Add editor name..."
              className="flex-1 px-4 py-2 rounded-xl bg-background border border-border/80 text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="button"
              onClick={handleAddEditor}
              className="px-4 py-2 rounded-xl bg-surface-hover text-text-primary text-xs font-semibold flex items-center gap-1 hover:bg-accent hover:text-white transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> Add Editor
            </button>
          </div>
        </div>
      </div>

      {/* 4. Publishing Schedule */}
      <div className="p-6 rounded-3xl bg-surface border border-border/80 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-accent" />
            <h3 className="font-display font-semibold text-base text-text-primary">
              Step 4: Release Schedule Options
            </h3>
          </div>

          <div className="flex items-center gap-1 p-1 rounded-xl bg-background border border-border/80">
            <button
              type="button"
              onClick={() => setPublishMode('now')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                publishMode === 'now'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Upload Now (Instant)
            </button>
            <button
              type="button"
              onClick={() => setPublishMode('schedule')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                publishMode === 'schedule'
                  ? 'bg-accent text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              Schedule Release
            </button>
          </div>
        </div>

        {publishMode === 'schedule' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-background border border-border/60">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-text-muted uppercase flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-accent" /> Release Date
              </label>
              <input
                type="date"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-surface border border-border text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-mono text-text-muted uppercase flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-accent" /> Release Time
              </label>
              <input
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="px-3.5 py-2 rounded-xl bg-surface border border-border text-xs text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        )}

        {/* Submit Action */}
        <div className="flex items-center justify-end gap-4 pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-accent text-white font-semibold text-sm hover:bg-accent-hover transition-all shadow-md flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            {publishMode === 'now' ? 'Upload Magazine Now' : 'Schedule Magazine Release'}
          </button>
        </div>
      </div>
    </form>
  );
};
