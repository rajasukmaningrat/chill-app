import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import BrowseHero from "../components/browse/BrowseHero";
import Carousel from "../components/browse/Carousel";
import Loading from "../components/common/Loading";

import { useAuth } from "../context/AuthContext";

import { fetchMovies } from "../store/slices/movieSlice";
import { fetchMyList } from "../store/slices/mylistSlice";
import { fetchAllEpisodes } from "../store/slices/episodeSlice";

import {
  ALL_GENRE,
  BROWSE_SECTIONS,
  getByType,
  getGenres,
  filterByGenre,
  getSectionMovies,
  pickHeroMovie,
  buildEpisodeCount,
} from "../utils/browse";

// Series dan Film memakai tampilan yang sama, hanya bedanya type movie
function BrowsePage({ type, onPlay, onOpenDetail }) {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [genre, setGenre] = useState(ALL_GENRE);

  const movies = useSelector((state) => state.movie.movies);
  const loading = useSelector((state) => state.movie.loading);
  const error = useSelector((state) => state.movie.error);
  const allEpisodes = useSelector((state) => state.episode.allEpisodes);

  // Ambil film, Daftar Saya, dan jumlah episode sekali saja
  useEffect(() => {
    dispatch(fetchMovies());

    if (user?.id) {
      dispatch(fetchMyList(user.id));
    }
  }, [dispatch, user?.id]);

  useEffect(() => {
    dispatch(fetchAllEpisodes());
  }, [dispatch]);

  const typeMovies = useMemo(() => getByType(movies, type), [movies, type]);

  // Genre dropdown hanya berisi genre dari film di halaman ini
  const genres = useMemo(() => getGenres(typeMovies), [typeMovies]);

  const filteredMovies = useMemo(
    () => filterByGenre(typeMovies, genre),
    [typeMovies, genre]
  );

  const heroMovie = pickHeroMovie(filteredMovies);

  const episodeCount = useMemo(
    () => buildEpisodeCount(allEpisodes),
    [allEpisodes]
  );

  const hasAnyMovie = BROWSE_SECTIONS.some(
    (section) => getSectionMovies(filteredMovies, section.key).length > 0
  );

  return (
    <>
      <Navbar />

      <main className="browse-page">
        <BrowseHero
          movie={heroMovie}
          genres={genres}
          genre={genre}
          onGenreChange={setGenre}
          onPlay={() => onPlay?.(heroMovie)}
          onMore={() => onOpenDetail?.(heroMovie)}
        />

        {loading ? (
          <Loading label="Memuat film..." />
        ) : error ? (
          <p className="browse-error">{error}</p>
        ) : !hasAnyMovie ? (
          <p className="browse-empty">
            Belum ada film untuk genre ini. Coba pilih genre lain.
          </p>
        ) : (
          BROWSE_SECTIONS.map((section) => (
            <Carousel
              key={section.key}
              title={section.title}
              variant={section.variant}
              movies={getSectionMovies(filteredMovies, section.key)}
              episodeCount={episodeCount}
              onPlay={onPlay}
              onOpenDetail={onOpenDetail}
            />
          ))
        )}
      </main>

      <Footer />
    </>
  );
}

export default BrowsePage;
