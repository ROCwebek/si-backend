import type { Movie } from '../../../movies/types/movie.type.js';
import { v4 as uuidv4 } from 'uuid';

export const movies: Movie[] = [
  {
    movie_pk: uuidv4(),
    title: 'The Dark Knight',
    release_year: 2008,
    description:
      'Sammen med politikommissær Jim Gordon og chef-anklageren Harvey Dent fortsætter Batman, alias Bruce Wayne, kampen mod forbryderne i Gotham City. Og det går ganske godt - lige indtil en mystisk og skruppelløs skurk ved navn Jokeren dukker op og spreder kaos.',
    runtime_minutes: 152,
    poster_url: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    genre_names: ['Action', 'Crime', 'Drama', 'Thriller'],
  },
  {
    movie_pk: uuidv4(),
    title: 'The Matrix',
    release_year: 1999,
    description:
      'Neo leder efter sandheden om The Matrix, der optræder i hans drømme. Han er overbevist om, at Morpheus - en af verdens farligste mænd - ved alt om The Matrix. En aften bliver Neo bortført af Trinity, og pludselig står han ansigt til ansigt med Morpheus.',
    runtime_minutes: 136,
    poster_url: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',    genre_names: ['Action', 'Sci-Fi'],
  },
    {
    movie_pk: uuidv4(),
    title: 'Inception',
    release_year: 2010,
    description:
      'Dom Cobb stjæler information fra menneskers underbevidsthed gennem deres drømme. Han får en sidste opgave, hvor han i stedet skal plante en idé.',
    runtime_minutes: 148,
    poster_url: 'https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    genre_names: ['Action', 'Adventure', 'Sci-Fi'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Interstellar',
    release_year: 2014,
    description:
      'En gruppe astronauter rejser gennem et ormehul for at finde en ny planet, hvor menneskeheden kan overleve.',
    runtime_minutes: 169,
    poster_url: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    genre_names: ['Adventure', 'Drama', 'Sci-Fi'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Fight Club',
    release_year: 1999,
    description:
      'En utilfreds kontormedarbejder møder Tyler Durden, og sammen starter de en hemmelig bokseklub.',
    runtime_minutes: 139,
    poster_url: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    genre_names: ['Drama'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Pulp Fiction',
    release_year: 1994,
    description:
      'En række kriminelle skæbner flettes sammen i Los Angeles gennem en række uventede begivenheder.',
    runtime_minutes: 154,
    poster_url: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    genre_names: ['Crime', 'Drama'],
  },
  {
    movie_pk: uuidv4(),
    title: 'The Shawshank Redemption',
    release_year: 1994,
    description:
      'Bankmanden Andy Dufresne bliver idømt livsvarigt fængsel, hvor han udvikler et stærkt venskab med medfangen Red.',
    runtime_minutes: 142,
    poster_url: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    genre_names: ['Drama'],
  },
  {
    movie_pk: uuidv4(),
    title: 'The Godfather',
    release_year: 1972,
    description:
      'Michael Corleone bliver gradvist trukket ind i sin families kriminelle imperium.',
    runtime_minutes: 175,
    poster_url: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    genre_names: ['Crime', 'Drama'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Gladiator',
    release_year: 2000,
    description:
      'Den romerske general Maximus bliver forrådt og tvunget til at kæmpe som gladiator, mens han søger hævn.',
    runtime_minutes: 155,
    poster_url: 'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
    genre_names: ['Action', 'Adventure', 'Drama'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Forrest Gump',
    release_year: 1994,
    description:
      'Forrest Gump oplever flere af USA’s historiske begivenheder, mens han forsøger at finde kærligheden.',
    runtime_minutes: 142,
    poster_url: 'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    genre_names: ['Drama', 'Romance'],
  },
  {
    movie_pk: uuidv4(),
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    release_year: 2001,
    description:
      'Hobbitten Frodo begiver sig ud på en farefuld rejse for at ødelægge en magtfuld ring og redde Midgård.',
    runtime_minutes: 178,
    poster_url: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
    genre_names: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    movie_pk: uuidv4(),
    title: 'The Lord of the Rings: The Two Towers',
    release_year: 2002,
    description:
      'Frodo og Sam fortsætter deres rejse mod Mordor, mens deres venner forsvarer kongeriget Rohan.',
    runtime_minutes: 179,
    poster_url: 'https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg',
    genre_names: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    movie_pk: uuidv4(),
    title: 'The Lord of the Rings: The Return of the King',
    release_year: 2003,
    description:
      'Midgårds skæbne afhænger af Frodo og Sams forsøg på at ødelægge den ene ring.',
    runtime_minutes: 201,
    poster_url: 'https://image.tmdb.org/t/p/w500/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
    genre_names: ['Action', 'Adventure', 'Fantasy'],
  },
  {
    movie_pk: uuidv4(),
    title: 'The Prestige',
    release_year: 2006,
    description:
      'To rivaliserende tryllekunstnere bliver besat af at skabe den ultimative illusion med alvorlige konsekvenser.',
    runtime_minutes: 130,
    poster_url: 'https://image.tmdb.org/t/p/w500/Ag2B2KHKQPukjH7WutmgnnSNurZ.jpg',
    genre_names: ['Drama', 'Mystery', 'Sci-Fi'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Shutter Island',
    release_year: 2010,
    description:
      'To efterforskere undersøger en mystisk forsvinden på et psykiatrisk hospital på en isoleret ø.',
    runtime_minutes: 138,
    poster_url: 'https://image.tmdb.org/t/p/w500/4GDy0PHYX3VRXUtwK5ysFbg3kEx.jpg',
    genre_names: ['Mystery', 'Thriller'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Django Unchained',
    release_year: 2012,
    description:
      'En tidligere slave og en dusørjæger drager ud for at befri hans kone fra en brutal plantageejer.',
    runtime_minutes: 165,
    poster_url: 'https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzWh3OKYRkWUlD5.jpg',
    genre_names: ['Drama', 'Western'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Whiplash',
    release_year: 2014,
    description:
      'En ung trommeslager presses til det yderste af en kompromisløs og krævende musiklærer.',
    runtime_minutes: 106,
    poster_url: 'https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCeuedmO.jpg',
    genre_names: ['Drama', 'Music'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Blade Runner 2049',
    release_year: 2017,
    description:
      'En blade runner opdager en hemmelighed, der fører ham på sporet af den forsvundne Rick Deckard.',
    runtime_minutes: 164,
    poster_url: 'https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg',
    genre_names: ['Drama', 'Mystery', 'Sci-Fi'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Joker',
    release_year: 2019,
    description:
      'Arthur Fleck forsøger at skabe sig en karriere som komiker, men hans liv tager en mørk drejning.',
    runtime_minutes: 122,
    poster_url: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    genre_names: ['Crime', 'Drama', 'Thriller'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Oppenheimer',
    release_year: 2023,
    description:
      'Fysikeren Robert Oppenheimer leder udviklingen af atombomben og konfronteres med konsekvenserne.',
    runtime_minutes: 180,
    poster_url: 'https://image.tmdb.org/t/p/w500/ptpr0kGAckfQkJeJIt8st5dglvd.jpg',
    genre_names: ['Drama', 'History'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Dune',
    release_year: 2021,
    description:
      'Paul Atreides rejser til ørkenplaneten Arrakis, hvor en konflikt om en værdifuld ressource truer hans familie.',
    runtime_minutes: 155,
    poster_url: 'https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg',
    genre_names: ['Adventure', 'Sci-Fi'],
  },
  {
    movie_pk: uuidv4(),
    title: 'Dune: Part Two',
    release_year: 2024,
    description:
      'Paul Atreides slutter sig til fremenfolket og forsøger at hævne sin familie og opfylde sin skæbne.',
    runtime_minutes: 166,
    poster_url: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    genre_names: ['Adventure', 'Sci-Fi'],
  },
];

function getAllMovies(): Movie[] {
  return movies;
}
