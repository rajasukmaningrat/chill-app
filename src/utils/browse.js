// Helper untuk halaman Series, Film, dan Daftar Saya

export const ALL_GENRE = "Semua Genre";

// Nilai section dari data /movie
export const SECTION = {
  CONTINUE: "continue",
  TOP: "top",
  TRENDING: "trending",
  NEW: "new",
};

// Daftar baris yang ditampilkan, urut dari atas ke bawah
// key "premium" tidak ada di data /movie, ia diambil dari field isPremium
export const BROWSE_SECTIONS = [
  { key: SECTION.CONTINUE, title: "Melanjutkan Tonton", variant: "landscape" },
  { key: "premium", title: "Persembahan Chill", variant: "portrait" },
  { key: SECTION.TOP, title: "Top Rating Hari ini", variant: "portrait" },
  { key: SECTION.TRENDING, title: "Trending", variant: "portrait" },
  { key: SECTION.NEW, title: "Rilis Baru", variant: "portrait" },
];

// Pisahkan Series dan Film memakai field type yang sudah ada
export const getByType = (movies, type) =>
  (movies || []).filter((movie) => movie.type === type);

// Genre dropdown diambil dari seluruh nilai movie.genres, unik dan berurutan
export const getGenres = (movies) => {
  const unique = new Set();

  (movies || []).forEach((movie) => {
    (movie.genres || []).forEach((genre) => unique.add(genre));
  });

  return [...unique].sort((a, b) => a.localeCompare(b));
};

export const filterByGenre = (movies, genre) => {
  if (!genre || genre === ALL_GENRE) return movies;

  return movies.filter((movie) => (movie.genres || []).includes(genre));
};

export const getSectionMovies = (movies, key) => {
  if (key === "premium") {
    return movies.filter((movie) => movie.isPremium);
  }

  return movies.filter((movie) => movie.section === key);
};

// Film untuk hero: yang pertama yang punya deskripsi, biar tidak kosong
export const pickHeroMovie = (movies) =>
  (movies || []).find((movie) => movie.description) || (movies || [])[0] || null;

// Jumlah episode per movie, dibuat sekali dari seluruh data episode
export const buildEpisodeCount = (allEpisodes) => {
  const count = {};

  (allEpisodes || []).forEach((episode) => {
    const key = String(episode.movieId);

    count[key] = (count[key] || 0) + 1;
  });

  return count;
};

// Badge kecil di atas poster: Premium, Top 10, dan Episode Baru
export const getMovieBadges = (movie) => {
  const badges = [];

  if (movie.isPremium) {
    badges.push({ label: "Premium", variant: "premium" });
  }

  if (movie.section === SECTION.TOP) {
    badges.push({ label: "Top 10", variant: "top" });
  }

  if (movie.type === "Series" && movie.section === SECTION.TRENDING) {
    badges.push({ label: "Episode Baru", variant: "new" });
  }

  return badges;
};

// Rekomendasi untuk film: film lain yang genre-nya paling banyak sama
export const getRecommendations = (movie, movies, limit = 8) => {
  const genres = movie?.genres || [];

  return (movies || [])
    .filter((item) => String(item.id) !== String(movie?.id))
    .map((item) => ({
      item,
      score: (item.genres || []).filter((genre) => genres.includes(genre))
        .length,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.item);
};
