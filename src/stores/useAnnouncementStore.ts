import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Announcement } from '../types/announcement';
import { fetchAnnouncementsFromSupabase, deleteAnnouncementFromSupabase } from '../services/supabaseClient';

interface AnnouncementStore {
  announcements: Announcement[];
  addAnnouncement: (announcement: Announcement | Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;
  clearAllAnnouncements: () => void;
  markAllAsRead: () => void;
  syncFromDatabase: () => Promise<void>;
}

export const useAnnouncementStore = create<AnnouncementStore>()(
  persist(
    (set) => ({
      announcements: [],

      addAnnouncement: (annData) => {
        const newAnnouncement: Announcement = 'id' in annData && annData.id
          ? (annData as Announcement)
          : { ...annData, id: `ann-${Date.now()}` };

        set((state) => ({
          announcements: [newAnnouncement, ...state.announcements.filter(a => a.id !== newAnnouncement.id)],
        }));
      },

      deleteAnnouncement: (id) => {
        deleteAnnouncementFromSupabase(id);
        set((state) => ({
          announcements: state.announcements.filter((a) => a.id !== id),
        }));
      },

      clearAllAnnouncements: () => {
        set({ announcements: [] });
      },

      markAllAsRead: () => {
        set((state) => ({
          announcements: state.announcements.map((a) => ({ ...a, isNew: false })),
        }));
      },

      syncFromDatabase: async () => {
        const dbAnnouncements = await fetchAnnouncementsFromSupabase();
        if (dbAnnouncements) {
          set({ announcements: dbAnnouncements });
        }
      },
    }),
    {
      name: 'elexa-announcements-store',
    }
  )
);
