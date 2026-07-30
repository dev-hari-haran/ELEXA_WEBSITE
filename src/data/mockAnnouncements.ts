import { Announcement } from '../types/announcement';

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'New Magazine Available!',
    content: 'Vogue Editorial: Hogwarts Arcana Issue #42 has just been released in high-gloss digital edition.',
    date: '10 mins ago',
    category: 'New Issue',
    isNew: true,
  },
  {
    id: 'ann-2',
    title: 'Author Live Q&A with George R.R. Martin',
    content: 'Join our exclusive magazine writer symposium on Westeros lore and royal dynasties this Friday.',
    date: '2 hours ago',
    category: 'Event',
    isNew: true,
  },
  {
    id: 'ann-3',
    title: 'Offline Reading Storage Upgrade',
    content: 'You can now cache up to 50 magazine issues directly to your local device IndexedDB storage.',
    date: '1 day ago',
    category: 'Update',
    isNew: false,
  }
];
