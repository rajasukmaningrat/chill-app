import { useEffect, useRef, useState } from "react";
import { getMovies, createMovie, updateMovie, deleteMovieApi } from "../services/api/movie";

import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Mood from "../components/home/Mood";
import Journal from "../components/home/Journal";
import Music from "../components/home/Music";
import Sleep from "../components/home/Sleep";
import Footer from "../components/home/Footer";

import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Button from "../components/common/Button";

// melnajutlkan noton

import dontLookup from "../assets/images/desktop/dontlookupD.png";
import batman from "../assets/images/desktop/batmanD.png";
import blackAdam from "../assets/images/desktop/blackadamD.png";
import avatarD from "../assets/images/desktop/avatarD.png";
import sonicD from "../assets/images/desktop/sonicD.png";
import alice from "../assets/images/desktop/alice.png";
import bnhaD from "../assets/images/desktop/bnhaD.jpg";
import dutyD from "../assets/images/desktop/dutyD.png";

// top rating dan seris

import avatarM from "../assets/images/mobile/avatarM.png";
import antman from "../assets/images/mobile/antmanM.png";
import rioM from "../assets/images/mobile/rioM.png";
import shazamM from "../assets/images/mobile/shazamM.png";
import fast10 from "../assets/images/mobile/fast10M.png";
import dilan from "../assets/images/mobile/dilanM.png";
import devilAllTime from "../assets/images/mobile/devilalltimeM.png";

// trending

import tomorrow from "../assets/images/mobile/tomorrowM.png";
import happines from "../assets/images/mobile/happinesM.png";
import littleMermaid from "../assets/images/mobile/littlemermaidM.png";
import blueLock from "../assets/images/mobile/bluelockM.png";

// rilis terbaru

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

function Home() {
  const [movies, setMovies] = useState(initialMovies);
  const [editMovie, setEditMovie] = useState(null);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const seedStarted = useRef(false);

  const seedMovies = async () => {
    try {
      const existingMovies = await getMovies();

      if (existingMovies.length > 0) {
        console.log("Movie sudah ada, seed dibatalkan.");
        return;
      }

      for (const movie of initialMovies) {
        const movieData = {
          title: movie.title,
          imageKey: imageKeyBySrc[movie.image],
          rating: movie.rating,
          age: movie.age,
          type: movie.type,
          genres: movie.genres,
          section: movie.section,
        };

        const result = await createMovie(movieData);

        console.log("Berhasil tambah:", result);
      }

      console.log("SELESAI SEED MOVIE");
    } catch (error) {
      console.error("Gagal seed movie:", error);
    }
  };

  const loadMovies = async () => {
    try {
      const data = await getMovies();

      const moviesFromApi = data.map(mapMovieFromApi);

      setMovies(moviesFromApi);

      console.log("Movie dari API:", moviesFromApi);
    } catch (error) {
      console.error("Gagal mengambil movie:", error);
    }
  };

  useEffect(() => {
    if (seedStarted.current) return;

    seedStarted.current = true;

    const loadData = async () => {
      try {
        const existingMovies = await getMovies();

        if (existingMovies.length === 0) {
          await seedMovies();
        }

        await loadMovies();
      } catch (error) {
        console.error("Gagal memuat movie:", error);
      }
    };

    loadData();
  }, []);

  const bySection = (section) => {
    return movies.filter((movie) => movie.section === section);
  };

  const confirmDeleteMovie = (movie) => {
    setMovieToDelete(movie);
  };

  const deleteMovie = async () => {
    if (!movieToDelete) return;

    try {
      await deleteMovieApi(movieToDelete.id);

      setMovies((currentMovies) =>
        currentMovies.filter(
          (movie) => movie.id !== movieToDelete.id
        )
      );

      setMovieToDelete(null);

      console.log("Berhasil menghapus movie");
    } catch (error) {
      console.error("Gagal menghapus movie:", error);
    }
  };

  const openEditMovie = (movie) => {
    setEditMovie({
      ...movie,
      genres: Array.isArray(movie.genres)
        ? movie.genres.join(", ")
        : movie.genres || "",
    });
  };

  const submitEditMovie = async (event) => {
    event.preventDefault();

    if (!editMovie) return;

    const updatedMovie = {
      ...editMovie,
      genres:
        typeof editMovie.genres === "string"
          ? editMovie.genres
              .split(",")
              .map((genre) => genre.trim())
              .filter(Boolean)
          : editMovie.genres || [],
    };

    const movieData = {
      title: updatedMovie.title,
      imageKey:
        imageKeyBySrc[updatedMovie.image] ||
        updatedMovie.imageKey,
      rating: updatedMovie.rating,
      age: updatedMovie.age,
      type: updatedMovie.type,
      genres: updatedMovie.genres,
      section: updatedMovie.section,
    };

    try {
      const result = await updateMovie(
        updatedMovie.id,
        movieData
      );

      console.log("Berhasil update:", result);

      const updatedMovieFromApi = mapMovieFromApi(result);

      setMovies((currentMovies) =>
        currentMovies.map((movie) =>
          movie.id === updatedMovieFromApi.id
            ? updatedMovieFromApi
            : movie
        )
      );

      setEditMovie(null);
    } catch (error) {
      console.error("Gagal update movie:", error);
    }
  };

  return (
    <>
      <Navbar />

      <Hero />

      <main className="main-content">
        <Mood
          movies={bySection("continue")}
          onDeleteMovie={confirmDeleteMovie}
          onEditMovie={openEditMovie}
        />

        <Journal
          movies={bySection("top")}
          onDeleteMovie={confirmDeleteMovie}
          onEditMovie={openEditMovie}
        />

        <Music
          movies={bySection("trending")}
          onDeleteMovie={confirmDeleteMovie}
          onEditMovie={openEditMovie}
        />

        <Sleep
          movies={bySection("new")}
          onDeleteMovie={confirmDeleteMovie}
          onEditMovie={openEditMovie}
        />
      </main>

      <Footer />


      <Modal
        open={!!editMovie}
        onClose={() => setEditMovie(null)}
        title="Ubah Film / Series"
      >
        {editMovie && (
          <form className="add-movie-form" onSubmit={submitEditMovie}>
            <Input
              placeholder="Judul"
              value={editMovie.title}
              onChange={(e) =>
                setEditMovie({
                  ...editMovie,
                  title: e.target.value,
                })
              }
              required
            />

            <Input
              placeholder="URL Poster"
              value={editMovie.image}
              onChange={(e) =>
                setEditMovie({
                  ...editMovie,
                  image: e.target.value,
                })
              }
            />

            <Input
              placeholder="Rating (contoh: 4.5/5)"
              value={editMovie.rating || ""}
              onChange={(e) =>
                setEditMovie({
                  ...editMovie,
                  rating: e.target.value,
                })
              }
              required
            />

            <Input
              placeholder="Usia (contoh: 13+)"
              value={editMovie.age || ""}
              onChange={(e) =>
                setEditMovie({
                  ...editMovie,
                  age: e.target.value,
                })
              }
            />

            <Input
              placeholder="Genre, pisahkan dengan koma"
              value={editMovie.genres || ""}
              onChange={(e) =>
                setEditMovie({
                  ...editMovie,
                  genres: e.target.value,
                })
              }
            />

            <select
              value={editMovie.type || "Movie"}
              onChange={(e) =>
                setEditMovie({
                  ...editMovie,
                  type: e.target.value,
                })
              }
            >
              <option value="Movie">Film</option>
              <option value="Series">Series</option>
            </select>

            <select
              value={editMovie.section || "continue"}
              onChange={(e) =>
                setEditMovie({
                  ...editMovie,
                  section: e.target.value,
                })
              }
            >
              <option value="continue">Melanjutkan Tonton</option>
              <option value="top">Top Rating</option>
              <option value="trending">Trending</option>
              <option value="new">Rilis Baru</option>
            </select>

            <Button type="submit">Simpan Perubahan</Button>
          </form>
        )}
      </Modal>

      <Modal
        open={!!movieToDelete}
        onClose={() => setMovieToDelete(null)}
        title="Hapus Film / Series"
      >
        {movieToDelete && (
          <div className="delete-confirmation">
            <p>
              Apakah kamu yakin ingin menghapus{" "}
              <strong>{movieToDelete.title}</strong>?
            </p>

            <p className="delete-warning">
              Data yang dihapus tidak dapat dikembalikan.
            </p>

            <div className="delete-actions">
              <Button
                type="button"
                onClick={() => setMovieToDelete(null)}
              >
                Batal
              </Button>

              <Button
                type="button"
                onClick={deleteMovie}
              >
                Hapus
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default Home;
