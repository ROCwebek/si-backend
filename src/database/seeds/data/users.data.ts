// Test users for development. They all have the password SEED_PASSWORD, so
// you can log in as any of them. Watchlists and reviews refer to movies by
// title. A user never has the same movie on both their watchlist and their
// loglist, because reviewing a movie takes it off the watchlist.
export const SEED_PASSWORD = 'password';

export type SeedUser = {
  user_name: string;
  user_email: string;
  role: 'admin' | 'user';
  watchlist: string[];
  reviews: { title: string; rating: number; review: string }[];
};

export const users: SeedUser[] = [
  {
    user_name: 'admin',
    user_email: 'admin@example.com',
    role: 'admin',
    watchlist: ['Dune: Part Two'],
    reviews: [
      {
        title: 'The Godfather',
        rating: 5,
        review: 'En tidløs klassiker. Skuespillet er i særklasse.',
      },
    ],
  },
  {
    user_name: 'anna',
    user_email: 'anna@example.com',
    role: 'user',
    watchlist: ['Interstellar', 'Whiplash'],
    reviews: [
      {
        title: 'The Dark Knight',
        rating: 5,
        review: 'Heath Ledger som Jokeren er helt fantastisk.',
      },
    ],
  },
  {
    user_name: 'mads',
    user_email: 'mads@example.com',
    role: 'user',
    watchlist: ['The Godfather'],
    reviews: [
      {
        title: 'The Matrix',
        rating: 4,
        review: 'Stadig imponerende effekter efter så mange år.',
      },
      {
        title: 'Fight Club',
        rating: 5,
        review: 'Twistet fik mig til at se den igen med det samme.',
      },
    ],
  },
  {
    user_name: 'sofie',
    user_email: 'sofie@example.com',
    role: 'user',
    watchlist: ['Shutter Island'],
    reviews: [
      {
        title: 'Forrest Gump',
        rating: 5,
        review: 'Rørende og sjov på samme tid. Jeg græd flere gange.',
      },
    ],
  },
  {
    user_name: 'frederik',
    user_email: 'frederik@example.com',
    role: 'user',
    watchlist: ['Blade Runner 2049', 'Joker'],
    reviews: [
      {
        title: 'Gladiator',
        rating: 4,
        review: 'Episke kampscener, men lidt for lang.',
      },
    ],
  },
  {
    user_name: 'emma',
    user_email: 'emma@example.com',
    role: 'user',
    watchlist: ['Pulp Fiction'],
    reviews: [
      {
        title: 'Inception',
        rating: 5,
        review: 'Smart historie, der kræver, at man følger med.',
      },
      {
        title: 'Interstellar',
        rating: 4,
        review: 'Smuk musik og flotte billeder, men slutningen forvirrede mig.',
      },
    ],
  },
  {
    user_name: 'lucas',
    user_email: 'lucas@example.com',
    role: 'user',
    watchlist: ['The Prestige'],
    reviews: [
      {
        title: 'Django Unchained',
        rating: 4,
        review: 'Underholdende og brutal. Christoph Waltz stjæler hver scene.',
      },
    ],
  },
  {
    user_name: 'ida',
    user_email: 'ida@example.com',
    role: 'user',
    watchlist: ['The Lord of the Rings: The Two Towers'],
    reviews: [
      {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        rating: 5,
        review: 'Det perfekte eventyr. Jeg glæder mig til de næste.',
      },
    ],
  },
  {
    user_name: 'oliver',
    user_email: 'oliver@example.com',
    role: 'user',
    watchlist: ['Dune'],
    reviews: [
      {
        title: 'Whiplash',
        rating: 5,
        review: 'Intens fra start til slut. Slutscenen er genial.',
      },
      {
        title: 'Joker',
        rating: 3,
        review: 'Stærk præstation af Joaquin Phoenix, men en tung film.',
      },
    ],
  },
  {
    user_name: 'freja',
    user_email: 'freja@example.com',
    role: 'user',
    watchlist: ['Gladiator', 'The Matrix'],
    reviews: [
      {
        title: 'Shutter Island',
        rating: 4,
        review: 'Uhyggelig stemning hele vejen igennem.',
      },
    ],
  },
  {
    user_name: 'william',
    user_email: 'william@example.com',
    role: 'user',
    watchlist: ['Oppenheimer'],
    reviews: [
      {
        title: 'Pulp Fiction',
        rating: 5,
        review: 'Dialogen er fantastisk. Tarantino, når han er bedst.',
      },
    ],
  },
  {
    user_name: 'clara',
    user_email: 'clara@example.com',
    role: 'user',
    watchlist: ['Forrest Gump'],
    reviews: [
      {
        title: 'The Shawshank Redemption',
        rating: 5,
        review: 'En af de bedste film, jeg har set. En smuk historie om håb.',
      },
    ],
  },
  {
    user_name: 'noah',
    user_email: 'noah@example.com',
    role: 'user',
    watchlist: ['Django Unchained'],
    reviews: [
      {
        title: 'Dune',
        rating: 4,
        review: 'Flot univers og lyd, men den føles som en opvarmning.',
      },
      {
        title: 'Dune: Part Two',
        rating: 5,
        review: 'Bedre end den første. Kampscenerne er enorme.',
      },
    ],
  },
  {
    user_name: 'alma',
    user_email: 'alma@example.com',
    role: 'user',
    watchlist: ['The Lord of the Rings: The Fellowship of the Ring'],
    reviews: [
      {
        title: 'The Prestige',
        rating: 4,
        review: 'Fed slutning. Man skal se den to gange.',
      },
    ],
  },
  {
    user_name: 'victor',
    user_email: 'victor@example.com',
    role: 'user',
    watchlist: ['Inception'],
    reviews: [
      {
        title: 'Blade Runner 2049',
        rating: 3,
        review: 'Utroligt flot, men alt for langsom til min smag.',
      },
    ],
  },
  {
    user_name: 'ella',
    user_email: 'ella@example.com',
    role: 'user',
    watchlist: ['Fight Club', 'The Dark Knight'],
    reviews: [
      {
        title: 'The Lord of the Rings: The Return of the King',
        rating: 5,
        review: 'En værdig afslutning på trilogien.',
      },
    ],
  },
  {
    user_name: 'oscar',
    user_email: 'oscar@example.com',
    role: 'user',
    watchlist: ['The Shawshank Redemption'],
    reviews: [
      {
        title: 'Oppenheimer',
        rating: 4,
        review: 'Imponerende, men tre timer er lang tid.',
      },
      {
        title: 'The Matrix',
        rating: 2,
        review: 'Forstår ikke helt hypen. Lidt for meget filosofi.',
      },
    ],
  },
  {
    user_name: 'karla',
    user_email: 'karla@example.com',
    role: 'user',
    watchlist: ['Joker'],
    reviews: [
      {
        title: 'Interstellar',
        rating: 5,
        review: 'Jeg havde gåsehud i hele den sidste time.',
      },
    ],
  },
  {
    user_name: 'malthe',
    user_email: 'malthe@example.com',
    role: 'user',
    watchlist: ['The Lord of the Rings: The Return of the King'],
    reviews: [
      {
        title: 'The Dark Knight',
        rating: 4,
        review: 'Rigtig god actionfilm med en stærk skurk.',
      },
      {
        title: 'Gladiator',
        rating: 5,
        review: 'Russell Crowe er fremragende.',
      },
    ],
  },
  {
    user_name: 'josefine',
    user_email: 'josefine@example.com',
    role: 'user',
    watchlist: ['Whiplash', 'Dune: Part Two'],
    reviews: [
      {
        title: 'The Lord of the Rings: The Two Towers',
        rating: 4,
        review: 'Slaget ved Helms Dyb er fantastisk.',
      },
    ],
  },
];
