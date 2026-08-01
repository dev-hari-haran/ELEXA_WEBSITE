import { createClient } from '@supabase/supabase-js';
import { Book } from '../types/book';
import { Announcement } from '../types/announcement';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Upload & persist Magazine metadata & PDF blob to Supabase
 */
export async function saveMagazineToSupabase(book: Book): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) return false;

  try {
    const { error } = await supabase
      .from('magazines')
      .upsert({
        id: book.id,
        title: book.title,
        subtitle: book.subtitle,
        edition: book.edition,
        author: book.author,
        cover_image: book.coverImage,
        description: book.description,
        category: book.category,
        pdf_url: book.pdfUrl,
        pdf_data_url: book.pdfDataUrl,
        likes_count: book.likesCount,
        views_count: book.viewsCount,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Supabase Magazine Save Error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase Error:', err);
    return false;
  }
}

/**
 * Fetch all persisted Magazines from Supabase Cloud Database
 */
export async function fetchMagazinesFromSupabase(): Promise<Book[] | null> {
  if (!supabase || !isSupabaseConfigured) return null;

  try {
    const { data, error } = await supabase
      .from('magazines')
      .select('*')
      .order('created_at', { ascending: false });

    if (error || !data) return null;

    return data.map((item: any) => ({
      id: item.id,
      title: item.title,
      subtitle: item.subtitle || 'Special Edition',
      edition: item.edition || 'Magazine Issue',
      author: item.author || 'Editorial Team',
      authorBio: 'Featured magazine author on Elexa Platform.',
      authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      coverImage: item.cover_image,
      spineColor: '#1E4D3B',
      description: item.description,
      category: item.category || 'Design',
      collection: 'Editorial Series',
      editors: ['Elena Rostova'],
      language: 'English',
      format: 'PDF Digital Magazine',
      isbn: `978-0-${Math.floor(100000 + Math.random() * 900000)}`,
      totalPages: 120,
      currentPage: 0,
      currentChapterId: 'ch-1',
      progressPercentage: 0,
      rating: 5.0,
      likesCount: item.likes_count || 1200,
      viewsCount: item.views_count || 3400,
      bookmarksCount: 45,
      commentsCount: 12,
      isWishlisted: false,
      publicationYear: 2026,
      chapters: [
        {
          id: 'ch-1',
          title: 'Opening Feature',
          order: 1,
          wordCount: 2400,
          estimatedMinutes: 10,
          content: `<p>Welcome to this digital issue of ${item.title}.</p>`
        }
      ],
      isFavorite: false,
      isUpcoming: false,
      isScheduled: false,
      coverMode: 'custom',
      pdfUrl: item.pdf_url,
      pdfDataUrl: item.pdf_data_url,
      readingStatus: 'reading',
      lastReadAt: new Date().toISOString(),
    }));
  } catch (err) {
    console.error('Supabase Fetch Error:', err);
    return null;
  }
}

/**
 * Upload Announcement to Supabase
 */
export async function saveAnnouncementToSupabase(announcement: Announcement): Promise<boolean> {
  if (!supabase || !isSupabaseConfigured) return false;

  try {
    const { error } = await supabase
      .from('announcements')
      .upsert({
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        category: announcement.category,
        image_url: announcement.imageUrl,
        date_text: announcement.date,
        is_new: announcement.isNew ?? true,
        created_at: new Date().toISOString(),
      });

    if (error) {
      console.error('Supabase Announcement Save Error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Supabase Error:', err);
    return false;
  }
}
