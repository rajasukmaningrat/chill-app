import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import PosterCard from "../components/browse/PosterCard";
import DetailModal from "../components/browse/DetailModal";
import Loading from "../components/common/Loading";

import { useAuth } from "../context/AuthContext";

import { fetchMovies } from "../store/slices/movieSlice";
import { fetchMyList } from "../store/slices/mylistSlice";
import { buildEpisodeCount } from "../utils/browse";

function DaftarSaya({ onPlay }) {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const [detailMovie, setDetailMovie] = useState(null);

  const movies = useSelector((state) => state.movie.movies);
  const moviesLoading = useSelector((state) => state.movie.loading);
  const moviesError = useSelector((state) => state.movie.error);

  const myList = useSelector((state) => state.mylist.myList);
  const myListLoading = useSelector((state) => state.mylist.loading);
  const myListError = useSelector((state) => state.mylist.error);

  const allEpisodes = useSelector((state) => state.episode.allEpisodes);

  useEffect(() => {
    dispatch(fetchMovies());

    if (user?.id) {
      dispatch(fetchMyList(user.id));
    }
  }, [dispatch, user?.id]);

  const episodeCount = useMemo(
    () => buildEpisodeCount(allEpisodes),
    [allEpisodes]
  );

  // Daftar Saya menyimpan movieId, disambungkan lagi ke filmnya
  const savedMovies = useMemo(
    () =>
      myList
        .map((item) =>
          movies.find(
            (movie) => String(movie.id) === String(item.movieId)
          )
        )
        .filter(Boolean),
    [myList, movies]
  );

  const isLoading = moviesLoading || myListLoading;
  const error = moviesError || myListError;

  return (
    <>
      <Navbar />

      <main className="daftar-page">
        <h1 className="daftar-title">Daftar Saya</h1>

        {isLoading ? (
          <Loading label="Memuat Daftar Saya..." />
        ) : error ? (
          <p className="browse-error">{error}</p>
        ) : savedMovies.length === 0 ? (
          <div className="daftar-empty">
            <p>Daftar Saya kamu masih kosong.</p>

            <Link to="/series" className="btn-play">
              Jelajahi Series
            </Link>
          </div>
        ) : (
          <div className="daftar-grid">
            {savedMovies.map((movie) => (
              <PosterCard
                key={movie.id}
                movie={movie}
                episodesCount={episodeCount[String(movie.id)] || 0}
                onPlay={onPlay}
                onOpenDetail={setDetailMovie}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />

      <DetailModal
        movie={detailMovie}
        movies={movies}
        onClose={() => setDetailMovie(null)}
        onPlay={onPlay}
        onOpenDetail={setDetailMovie}
      />
    </>
  );
}

export default DaftarSaya;
