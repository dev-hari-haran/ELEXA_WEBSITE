import { Book } from '../types/book';

export const MOCK_BOOKS: Book[] = [
  {
    id: 'hp-6',
    title: 'Harry Potter: Half Blood Prince',
    subtitle: 'Volume VI of the Hogwarts Chronicles',
    author: 'J.K. Rowling',
    authorBio: 'J.K. Rowling is the author of the enduringly popular Harry Potter series, which has sold over 500 million copies worldwide.',
    coverImage: 'https://images.unsplash.com/photo-1618663741645-9d1678d71680?q=80&w=800&auto=format&fit=crop',
    spineColor: '#1E4D3B',
    description: 'The story takes place during Harry\'s sixth year at Hogwarts School of Witchcraft and Wizardry, where he discovers more about Lord Voldemort\'s past and the prophecy that foretells his defeat. With action-packed sequences, shocking twists, and moments of heart-wrenching tragedy, Half-Blood Prince is a must-read for any fan of fantasy literature.',
    category: 'Fantasy',
    collection: 'Hogwarts Saga',
    editors: ['J.K. Rowling', 'Christopher Reath', 'Alena Gestabon', 'Steve Korg'],
    language: 'Standard English (USA & UK)',
    format: 'paper textured, full colour, 345 pages',
    isbn: '987 3 32564 455 B',
    totalPages: 345,
    currentPage: 200,
    currentChapterId: 'hp6-ch2',
    progressPercentage: 57.9,
    rating: 4.9,
    publicationYear: 2005,
    isFavorite: true,
    readingStatus: 'reading',
    lastReadAt: new Date().toISOString(),
    chapters: [
      {
        id: 'hp6-ch1',
        title: 'Chapter One: The Other Minister',
        order: 1,
        wordCount: 3400,
        estimatedMinutes: 14,
        content: `
          <p>It was nearing midnight and the Prime Minister was sitting alone in his office, reading a long memo that was slipping through his brain without leaving the slightest trace of meaning behind. He was waiting for a call from the President of a far-off country, and between wondering when the wretched man would call and trying to suppress unpleasant memories of a very long, very tiring, and very difficult week, there was very little space in his head for anything else.</p>
          <p>The more he tried to concentrate on the print on the page before him, the more clearly the Prime Minister could see the gloating face of one of his political opponents. This particular opponent had appeared on the news that very day, not only listing all the terrible things that had happened in the last week (as though anyone needed reminding), but also explaining why each and every one of them was the government's fault.</p>
          <p>The Prime Minister's pulse quickened at the thought of these accusations, for they were neither fair nor true. How on earth was the government supposed to have prevented the collapse of that bridge? It was outrageous that anyone should suggest there was a lack of funds for bridge maintenance. The bridge was less than ten years old, and the best experts were at a loss to explain why it had snapped cleanly in two, sending a dozen cars into the watery depths of the river below.</p>
        `
      },
      {
        id: 'hp6-ch2',
        title: 'Chapter Two: Spinner\'s End',
        order: 2,
        wordCount: 4100,
        estimatedMinutes: 16,
        content: `
          <p>Many miles away, the chill damp that had hung over the city was broken by a sudden quiet rustle of autumn leaves. A solitary figure in a dark cloak moved swiftly through the narrow, cobbled alleyway of Spinner\'s End.</p>
          <p>"What happened?" Madam Pomfrey whispered to Dumbledore, bending over the statue on the bed.</p>
          <p>"Another attack," said Dumbledore. "He was found unconscious near the stairs."</p>
          <p>"There was a bunch of grapes next to him," said Professor McGonagall. "We think he was trying to sneak up here to visit Potter." Harry's stomach gave a horrible lurch. Slowly and carefully, he raised himself a few inches so he could look at the statue on the bed. A ray of moonlight lay across its staring face. It was Colin Creevey. His eyes were wide and his hands were stuck up in front of him, holding his camera.</p>
          <p>"Petrified?" whispered Madam Pomfrey.</p>
          <p>"Yes," said Professor McGonagall. "But I shudder to think... If Albus hadn't been on the way downstairs for hot chocolate — who knows what might have —"</p>
          <p>Harry lay back on his pillow, staring at the darkened ceiling. The quiet murmurs of the professors drifted away into the shadows of the hospital wing, leaving only the sound of rain tapping gently against the tall stained-glass windows.</p>
        `
      },
      {
        id: 'hp6-ch3',
        title: 'Chapter Three: Will and Won\'t',
        order: 3,
        wordCount: 3800,
        estimatedMinutes: 15,
        content: `
          <p>Harry Potter was snoring loudly. He had been sitting in a chair by his bedroom window for the best part of the evening, watching the street outside grow darker and darker, and had finally fallen asleep with one side of his face pressed against the cold glass pane, his glasses askew and his mouth wide open.</p>
          <p>The room was littered with trunk contents, books, and robes. Hedwig sat perched atop her cage, her golden eyes following the movement of a tiny moth circling the desk lamp.</p>
        `
      }
    ]
  },
  {
    id: 'fire-blood',
    title: 'Fire & Blood - A Game of Thrones series',
    subtitle: '300 Years Before A Game of Thrones',
    author: 'George R.R. Martin',
    authorBio: 'George R.R. Martin is the #1 New York Times bestselling author of many novels, including the acclaimed series A Song of Ice and Fire.',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800&auto=format&fit=crop',
    spineColor: '#8B0000',
    description: 'Fire and Blood tells the story of the Targaryen dynasty in Westeros, chronicling the conquest of the Seven Kingdoms by House Targaryen. It also covers the devastating Targaryen civil war known as the Dance of the Dragons.',
    category: 'Fantasy',
    collection: 'Westeros Lore',
    editors: ['George R.R. Martin', 'Doug Wheatley'],
    language: 'English',
    format: 'hardcover, illustrated, 736 pages',
    isbn: '978 1 52479 628 0',
    totalPages: 736,
    currentPage: 154,
    currentChapterId: 'fb-ch1',
    progressPercentage: 20.9,
    rating: 4.8,
    publicationYear: 2018,
    isFavorite: true,
    readingStatus: 'reading',
    lastReadAt: new Date(Date.now() - 3600000).toISOString(),
    chapters: [
      {
        id: 'fb-ch1',
        title: 'Aegon\'s Conquest',
        order: 1,
        wordCount: 5200,
        estimatedMinutes: 21,
        content: `
          <p>The Targaryens were of pure Valyrian blood, dragonlords of ancient lineage. Twelve years before the Doom of Valyria (114 BC), Jaenis Targaryen sold his estates in the Freehold and moved his family, his wealth, and his dragons to Dragonstone, a bleak island citadel beneath a smoking mountain in the narrow sea.</p>
          <p>For a century Dragonstone remained the westernmost outpost of Valyrian power. Aegon Targaryen was twenty-seven years old when he set sail from Dragonstone to conquer the Westerosi continent, mounted upon Balerion the Black Dread.</p>
        `
      }
    ]
  },
  {
    id: 'chronicles-narnia',
    title: 'The Chronicles of Narnia',
    subtitle: 'The Lion, the Witch and the Wardrobe',
    author: 'C.S. Lewis',
    authorBio: 'Clive Staples Lewis was a British writer and lay theologian, best known for his fiction work.',
    coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop',
    spineColor: '#1F2937',
    description: 'Four adventurous siblings step through a wardrobe door and into the land of Narnia, a land frozen in eternal winter and enslaved by the power of the White Witch.',
    category: 'Classics',
    collection: 'Narnia Chronicles',
    editors: ['C.S. Lewis', 'Pauline Baynes'],
    language: 'English',
    format: 'paperback, 208 pages',
    isbn: '978 0 00711 561 7',
    totalPages: 208,
    currentPage: 208,
    currentChapterId: 'cn-ch1',
    progressPercentage: 100,
    rating: 4.9,
    publicationYear: 1950,
    isFavorite: false,
    readingStatus: 'completed',
    lastReadAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    chapters: [
      {
        id: 'cn-ch1',
        title: 'Lucy Looks into a Wardrobe',
        order: 1,
        wordCount: 2800,
        estimatedMinutes: 11,
        content: `
          <p>Once there were four children whose names were Peter, Susan, Edmund and Lucy. This story is about something that happened to them when they were sent away from London during the war because of the air-raids.</p>
          <p>Lucy opened the door of the wardrobe and stepped inside. It was a very large wardrobe, full of long fur coats hanging up. She rubbed her face against them with delight...</p>
        `
      }
    ]
  },
  {
    id: 'deadpool-samurai',
    title: 'Deadpool Samurai: Marvel Edition',
    subtitle: 'Volume 1',
    author: 'Sanshiro Kasama',
    authorBio: 'Sanshiro Kasama is a celebrated Japanese manga artist and writer.',
    coverImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=800&auto=format&fit=crop',
    spineColor: '#991B1B',
    description: 'Deadpool moves to Tokyo and joins the Samurai Squad! Packed with hilarious action and fourth-wall-breaking manga mayhem.',
    category: 'Sci-Fi',
    collection: 'Marvel Manga',
    editors: ['Sanshiro Kasama', 'Hikaru Uesugi'],
    language: 'English Translation',
    format: 'graphic novel, 216 pages',
    isbn: '978 1 97472 531 1',
    totalPages: 216,
    currentPage: 45,
    currentChapterId: 'ds-ch1',
    progressPercentage: 20.8,
    rating: 4.6,
    publicationYear: 2021,
    isFavorite: false,
    readingStatus: 'reading',
    lastReadAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    chapters: [
      {
        id: 'ds-ch1',
        title: 'Chapter 1: Merc with a Manga',
        order: 1,
        wordCount: 1500,
        estimatedMinutes: 6,
        content: `<p>Deadpool lands in Tokyo with two katanas and an appetite for ramen...</p>`
      }
    ]
  },
  {
    id: 'wise-man-fear',
    title: 'The Wise Man\'s Fear',
    subtitle: 'The Kingkiller Chronicle: Day Two',
    author: 'Patrick Rothfuss',
    authorBio: 'Patrick Rothfuss is an American author of epic fantasy.',
    coverImage: 'https://images.unsplash.com/photo-1543002588-bFA74002ED7E?q=80&w=800&auto=format&fit=crop',
    spineColor: '#064E3B',
    description: 'In The Wise Man\'s Fear, Kvothe takes his first steps on the path of wisdom and delves into ancient secrets across distant lands.',
    category: 'Fantasy',
    collection: 'Kingkiller Chronicle',
    editors: ['Patrick Rothfuss'],
    language: 'English',
    format: 'paperback, 992 pages',
    isbn: '978 0 75640 712 4',
    totalPages: 992,
    currentPage: 310,
    currentChapterId: 'wmf-ch1',
    progressPercentage: 31.2,
    rating: 4.9,
    publicationYear: 2011,
    isFavorite: true,
    readingStatus: 'reading',
    lastReadAt: new Date(Date.now() - 86400000).toISOString(),
    chapters: [
      {
        id: 'wmf-ch1',
        title: 'Chapter 1: Apple and Elder',
        order: 1,
        wordCount: 4200,
        estimatedMinutes: 17,
        content: `<p>There are three things all wise men fear: the sea in storm, a night with no moon, and the anger of a gentle man...</p>`
      }
    ]
  },
  {
    id: 'beauty-beast',
    title: 'Beauty and the Beast: Disney',
    subtitle: 'Illustrated Heritage Collection',
    author: 'Disney Classic',
    authorBio: 'Walt Disney Archives collection of timeless fairy tales.',
    coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=800&auto=format&fit=crop',
    spineColor: '#1E3A8A',
    description: 'Step into the enchanted castle of Beauty and the Beast in this breathtakingly illustrated digital hardcover edition.',
    category: 'Classics',
    collection: 'Disney Classics',
    editors: ['Disney Storybook Artists'],
    language: 'English',
    format: 'full colour, 128 pages',
    isbn: '978 1 78905 214 5',
    totalPages: 128,
    currentPage: 128,
    currentChapterId: 'bb-ch1',
    progressPercentage: 100,
    rating: 4.7,
    publicationYear: 1991,
    isFavorite: false,
    readingStatus: 'completed',
    lastReadAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    chapters: [
      {
        id: 'bb-ch1',
        title: 'Chapter 1: The Enchanted Castle',
        order: 1,
        wordCount: 1800,
        estimatedMinutes: 7,
        content: `<p>Once upon a time, in a faraway land, a young prince lived in a shining castle...</p>`
      }
    ]
  }
];
