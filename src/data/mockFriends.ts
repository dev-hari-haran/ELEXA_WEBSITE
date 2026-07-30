export interface ReaderFriendActivity {
  id: string;
  name: string;
  avatar: string;
  bookTitle: string;
  chapterTitle: string;
  comment: string;
  timestamp: string;
}

export const MOCK_FRIENDS: ReaderFriendActivity[] = [
  {
    id: 'f-1',
    name: 'Roberto Jordan',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    bookTitle: 'Harry Potter: Half Blood Prince',
    chapterTitle: 'Chapter Five: Diagon Alley',
    comment: 'What a delightful and magical chapter it is! It indeed transports readers to the wizarding world..',
    timestamp: '2 min ago'
  },
  {
    id: 'f-2',
    name: 'Anna Henry',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    bookTitle: 'Fire & Blood',
    chapterTitle: 'The Dance of the Dragons',
    comment: 'I finished reading the chapter last night and the tension between the factions is at an all time high!',
    timestamp: '15 min ago'
  },
  {
    id: 'f-3',
    name: 'Alexander Mark',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    bookTitle: 'The Wise Man\'s Fear',
    chapterTitle: 'Apple and Elder',
    comment: 'The prose in this chapter is pure poetry. Kvothe\'s journey at the University never gets old.',
    timestamp: '1 hour ago'
  }
];
