import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, createMovie, updateMovie, deleteMovieApi } from "../services/api/movie";

import { mapMovieFromApi, imageKeyBySrc, initialMovies } from "../utils/movieMapper";
import { setMovies, addMovie, updateMovieInStore, removeMovie } from "../store/slices/movieSlice";

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

function Home() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movie.movies);
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

        dispatch(addMovie(mapMovieFromApi(result)));

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

      dispatch(setMovies(moviesFromApi));

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

      dispatch(removeMovie(movieToDelete.id));

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

      dispatch(updateMovieInStore(updatedMovieFromApi));

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
