export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'New Issue' | 'Event' | 'Update' | 'Editorial';
  isNew?: boolean;
}
