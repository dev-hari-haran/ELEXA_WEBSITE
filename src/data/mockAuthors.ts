export interface AuthorProfile {
  id: string;
  name: string;
  designation: 'Author' | 'Lead Editor';
  avatar: string;
  bio: string;
  followers: string;
  publishedMagazines: number;
  featuredIssueTitle: string;
}

export const MOCK_AUTHORS: AuthorProfile[] = [
  {
    id: 'auth-1',
    name: 'J.K. Rowling',
    designation: 'Author',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    bio: 'Renowned fantasy author and mythic fiction columnist.',
    followers: '2.4M',
    publishedMagazines: 14,
    featuredIssueTitle: 'Vogue Editorial: Hogwarts Arcana'
  },
  {
    id: 'auth-2',
    name: 'George R.R. Martin',
    designation: 'Author',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    bio: 'Master of epic medieval lore, court politics, and dragon heraldry.',
    followers: '3.1M',
    publishedMagazines: 22,
    featuredIssueTitle: 'Dragonlord Chronicle: Fire & Blood'
  },
  {
    id: 'auth-3',
    name: 'Elena Rostova',
    designation: 'Lead Editor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
    bio: 'Architectural Digest editor focusing on modern Scandinavian aesthetics.',
    followers: '850K',
    publishedMagazines: 9,
    featuredIssueTitle: 'Architectural Digest: Neo-Minimalism'
  }
];
