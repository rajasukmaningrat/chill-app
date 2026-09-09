import dontLookup from "../assets/images/desktop/dontlookupD.png";
import batman from "../assets/images/desktop/batmanD.png";
import blackAdam from "../assets/images/desktop/blackadamD.png";
import avatarD from "../assets/images/desktop/avatarD.png";
import sonicD from "../assets/images/desktop/sonicD.png";
import alice from "../assets/images/desktop/alice.png";
import bnhaD from "../assets/images/desktop/bnhaD.jpg";
import dutyD from "../assets/images/desktop/dutyD.png";

import avatarM from "../assets/images/mobile/avatarM.png";
import antman from "../assets/images/mobile/antmanM.png";
import rioM from "../assets/images/mobile/rioM.png";
import shazamM from "../assets/images/mobile/shazamM.png";
import fast10 from "../assets/images/mobile/fast10M.png";
import dilan from "../assets/images/mobile/dilanM.png";
import devilAllTime from "../assets/images/mobile/devilalltimeM.png";

import tomorrow from "../assets/images/mobile/tomorrowM.png";
import happines from "../assets/images/mobile/happinesM.png";
import littleMermaid from "../assets/images/mobile/littlemermaidM.png";
import blueLock from "../assets/images/mobile/bluelockM.png";

import guardian from "../assets/images/mobile/guardianM.png";
import moralles from "../assets/images/mobile/morallesM.png";
import stuartLittle from "../assets/images/mobile/stuartlittelM.png";
import megan from "../assets/images/mobile/meganM.png";

const movieImages = {
  dontLookup,
  batman,
  blackAdam,
  avatarD,
  sonicD,
  alice,
  bnhaD,
  dutyD,
  avatarM,
  antman,
  rioM,
  shazamM,
  fast10,
  dilan,
  devilAllTime,
  tomorrow,
  happines,
  littleMermaid,
  blueLock,
  guardian,
  moralles,
  stuartLittle,
  megan,
};

const mapMovieFromApi = (movie) => ({
  ...movie,
  image: movieImages[movie.imageKey] ?? "",
});

const imageKeyBySrc = {
  [dontLookup]: "dontLookup",
  [batman]: "batman",
  [blackAdam]: "blackAdam",
  [avatarD]: "avatarD",
  [sonicD]: "sonicD",
  [alice]: "alice",
  [bnhaD]: "bnhaD",
  [dutyD]: "dutyD",
  [avatarM]: "avatarM",
  [antman]: "antman",
  [rioM]: "rioM",
  [shazamM]: "shazamM",
  [fast10]: "fast10",
  [dilan]: "dilan",
  [devilAllTime]: "devilAllTime",
  [tomorrow]: "tomorrow",
  [happines]: "happines",
  [littleMermaid]: "littleMermaid",
  [blueLock]: "blueLock",
  [guardian]: "guardian",
  [moralles]: "moralles",
  [stuartLittle]: "stuartLittle",
  [megan]: "megan",
};

const initialMovies = [
  // mwlanjutklan nonton
  {
    id: 1,
    title: "Don't Look Up",
    image: dontLookup,
    rating: "4.5/5",
    age: "13+",
    type: "Movie",
    genres: ["Komedi", "Drama", "Sains & Fiksi"],
    section: "continue",
  },

  {
    id: 2,
    title: "Batman",
    image: batman,
    rating: "4.5/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Drama", "Crime"],
    section: "continue",
  },

  {
    id: 3,
    title: "Black Adam",
    image: blackAdam,
    rating: "4.8/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Adventure", "Fantasy"],
    section: "continue",
  },

  {
    id: 4,
    title: "Avatar",
    image: avatarD,
    rating: "4.8/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Adventure", "Fantasy"],
    section: "continue",
  },

  {
    id: 5,
    title: "Sonic The Hedgehog",
    image: sonicD,
    rating: "4.8/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Adventure", "Comedy"],
    section: "continue",
  },

  {
    id: 21,
    title: "Alice in Borderland",
    image: alice,
    rating: "4.7/5",
    age: "16+",
    type: "Series",
    genres: ["Action", "Thriller", "Mystery"],
    section: "continue",
  },

  {
    id: 22,
    title: "My Hero Academia",
    image: bnhaD,
    rating: "4.8/5",
    age: "13+",
    type: "Series",
    genres: ["Anime", "Action", "Fantasy"],
    section: "continue",
  },

  {
    id: 23,
    title: "Duty After School",
    image: dutyD,
    rating: "4.6/5",
    age: "16+",
    type: "Series",
    genres: ["Action", "Drama", "Sci-Fi"],
    section: "continue",
  },

  // ==top rating
  {
    id: 6,
    title: "Avatar",
    image: avatarM,
    rating: "4.7/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Adventure", "Fantasy"],
    section: "top",
  },

  {
    id: 7,
    title: "Ant-Man",
    image: antman,
    rating: "4.4/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Comedy", "Sci-Fi"],
    section: "top",
  },

  {
    id: 8,
    title: "Rio",
    image: rioM,
    rating: "4.3/5",
    age: "SU",
    type: "Movie",
    genres: ["Animation", "Comedy", "Adventure"],
    section: "top",
  },

  {
    id: 9,
    title: "Shazam!",
    image: shazamM,
    rating: "4.4/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Fantasy", "Comedy"],
    section: "top",
  },

  {
    id: 10,
    title: "Fast X",
    image: fast10,
    rating: "4.2/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Crime", "Adventure"],
    section: "top",
  },

  {
    id: 24,
    title: "Dilan",
    image: dilan,
    rating: "4.3/5",
    age: "13+",
    type: "Movie",
    genres: ["Drama", "Romance"],
    section: "top",
  },

  {
    id: 25,
    title: "The Devil All the Time",
    image: devilAllTime,
    rating: "4.4/5",
    age: "17+",
    type: "Movie",
    genres: ["Drama", "Thriller", "Crime"],
    section: "top",
  },

  {
    id: 26,
    title: "M3GAN",
    image: megan,
    rating: "4.5/5",
    age: "17+",
    type: "Movie",
    genres: ["Horror", "Sci-Fi", "Thriller"],
    section: "top",
  },

  // =trending
  {
    id: 11,
    title: "Shazam!",
    image: shazamM,
    rating: "4.4/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Fantasy", "Comedy"],
    section: "trending",
  },

  {
    id: 12,
    title: "The Tomorrow War",
    image: tomorrow,
    rating: "4.5/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Sains & Fiksi", "Adventure"],
    section: "trending",
  },

  {
    id: 13,
    title: "Happiness",
    image: happines,
    rating: "4.6/5",
    age: "16+",
    type: "Series",
    genres: ["Drama", "Thriller", "Action"],
    section: "trending",
  },

  {
    id: 14,
    title: "The Little Mermaid",
    image: littleMermaid,
    rating: "4.3/5",
    age: "13+",
    type: "Movie",
    genres: ["Fantasy", "Adventure", "Family"],
    section: "trending",
  },

  {
    id: 15,
    title: "Blue Lock",
    image: blueLock,
    rating: "4.7/5",
    age: "13+",
    type: "Series",
    genres: ["Anime", "Sport", "Drama"],
    section: "trending",
  },

  {
    id: 27,
    title: "Guardians of the Galaxy",
    image: guardian,
    rating: "4.7/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Comedy", "Adventure"],
    section: "trending",
  },

  {
    id: 28,
    title: "Spider-Man: Miles Morales",
    image: moralles,
    rating: "4.8/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Adventure", "Fantasy"],
    section: "trending",
  },

  {
    id: 29,
    title: "Blue Lock",
    image: blueLock,
    rating: "4.7/5",
    age: "13+",
    type: "Series",
    genres: ["Anime", "Sport", "Drama"],
    section: "trending",
  },

  // =rilis terbaru

  {
    id: 16,
    title: "Guardians of the Galaxy",
    image: guardian,
    rating: "4.7/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Comedy", "Adventure"],
    section: "new",
  },

  {
    id: 17,
    title: "Spider-Man: Miles Morales",
    image: moralles,
    rating: "4.8/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Adventure", "Fantasy"],
    section: "new",
  },

  {
    id: 18,
    title: "Rio",
    image: rioM,
    rating: "4.3/5",
    age: "SU",
    type: "Movie",
    genres: ["Animation", "Comedy", "Adventure"],
    section: "new",
  },

  {
    id: 19,
    title: "Stuart Little",
    image: stuartLittle,
    rating: "4.4/5",
    age: "SU",
    type: "Movie",
    genres: ["Family", "Comedy", "Adventure"],
    section: "new",
  },

  {
    id: 20,
    title: "M3GAN",
    image: megan,
    rating: "4.5/5",
    age: "17+",
    type: "Movie",
    genres: ["Horror", "Sci-Fi", "Thriller"],
    section: "new",
  },

  {
    id: 30,
    title: "Ant-Man",
    image: antman,
    rating: "4.4/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Comedy", "Sci-Fi"],
    section: "new",
  },

  {
    id: 31,
    title: "Rio",
    image: rioM,
    rating: "4.3/5",
    age: "SU",
    type: "Movie",
    genres: ["Animation", "Comedy", "Adventure"],
    section: "new",
  },

  {
    id: 32,
    title: "Shazam!",
    image: shazamM,
    rating: "4.4/5",
    age: "13+",
    type: "Movie",
    genres: ["Action", "Fantasy", "Comedy"],
    section: "new",
  },
];

export { movieImages, mapMovieFromApi, imageKeyBySrc, initialMovies };
