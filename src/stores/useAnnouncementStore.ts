import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Announcement } from '../types/announcement';

interface AnnouncementStore {
  announcements: Announcement[];
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;
  clearAllAnnouncements: () => void;
  markAllAsRead: () => void;
}

export const useAnnouncementStore = create<AnnouncementStore>()(
  persist(
    (set) => ({
      announcements: [],

      addAnnouncement: (annData) => {
        const newAnnouncement: Announcement = {
          ...annData,
          id: `ann-${Date.now()}`,
        };
        set((state) => ({
          announcements: [newAnnouncement, ...state.announcements],
        }));
      },

      deleteAnnouncement: (id) => {
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
    }),
    {
      name: 'elexa-announcements-store',
    }
  )
);
