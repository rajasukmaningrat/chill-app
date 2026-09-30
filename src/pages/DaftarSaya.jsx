import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from "../components/home/Navbar";
import Footer from "../components/home/Footer";
import PosterCard from "../components/browse/PosterCard";
import DetailModal from "../components/browse/DetailModal";
import PremiumModal from "../components/browse/PremiumModal";
import Loading from "../components/common/Loading";

import { useAuth } from "../context/AuthContext";
import { usePremiumPlayback } from "../hooks/usePremiumPlayback";

import { fetchMovies } from "../store/slices/movieSlice";
import { fetchMyList } from "../store/slices/mylistSlice";
import { buildEpisodeCount } from "../utils/browse";

// Label di UI boleh berbeda dari nilai movie.type di data
const LIST_TABS = [
  { label: "Film", type: "Movie" },
  { label: "Series", type: "Series" },
];

function DaftarSaya() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { handlePlay, premiumMovie, closePremium } = usePremiumPlayback();

  const [detailMovie, setDetailMovie] = useState(null);
  const [activeTab, setActiveTab] = useState(LIST_TABS[0].type);

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
        .filter(Boolean)
        .map((item) =>
          movies.find(
            (movie) => movie && String(movie.id) === String(item.movieId)
          )
        )
        .filter(Boolean),
    [myList, movies]
  );

  const savedCount = {
    Movie: savedMovies.filter((movie) => movie.type === "Movie").length,
    Series: savedMovies.filter((movie) => movie.type === "Series").length,
  };

  // Tab Film/Series hanya memisahkan tampilan, sumber datanya tetap sama
  const visibleMovies = savedMovies.filter(
    (movie) => movie.type === activeTab
  );

  const activeTabInfo = LIST_TABS.find((tab) => tab.type === activeTab);

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
          <>
            <div className="daftar-tabs" role="tablist">
              {LIST_TABS.map((tab) => (
                <button
                  key={tab.type}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab.type}
                  className={`daftar-tab${
                    activeTab === tab.type ? " is-active" : ""
                  }`}
                  onClick={() => setActiveTab(tab.type)}
                >
                  {tab.label}

                  <span className="daftar-tab-count">
                    {savedCount[tab.type]}
                  </span>
                </button>
              ))}
            </div>

            {savedCount[activeTab] === 0 ? (
              <div className="daftar-empty">
                <p>
                  Belum ada {activeTabInfo.label.toLowerCase()} di Daftar Saya
                  kamu.
                </p>

                <Link
                  to={activeTabInfo.type === "Series" ? "/series" : "/film"}
                  className="btn-play"
                >
                  Jelajahi {activeTabInfo.label}
                </Link>
              </div>
            ) : (
              <div className="daftar-grid">
                {visibleMovies.map((movie) => (
                  <PosterCard
                    key={movie.id}
                    movie={movie}
                    episodesCount={episodeCount[String(movie.id)] || 0}
                    onPlay={handlePlay}
                    onOpenDetail={setDetailMovie}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <DetailModal
        movie={detailMovie}
        movies={movies}
        onClose={() => setDetailMovie(null)}
        onPlay={handlePlay}
        onOpenDetail={setDetailMovie}
      />

      <PremiumModal movie={premiumMovie} onClose={closePremium} />
    </>
  );
}

export default DaftarSaya;
