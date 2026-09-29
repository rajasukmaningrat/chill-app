import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Play, Check, X, Star } from "lucide-react";

import { fetchEpisodes, clearEpisodes } from "../../store/slices/episodeSlice";
import { toggleMyList } from "../../store/slices/mylistSlice";
import { getRecommendations } from "../../utils/browse";

import PosterCard from "./PosterCard";
import Loading from "../common/Loading";

function DetailModal({ movie, movies = [], onClose, onPlay, onOpenDetail }) {
  const dispatch = useDispatch();

  const episodes = useSelector((state) => state.episode.episodes);
  const episodesLoading = useSelector((state) => state.episode.loading);
  const episodesError = useSelector((state) => state.episode.error);

  const userId = useSelector((state) => state.mylist.userId);
  const myList = useSelector((state) => state.mylist.myList);

  const isSeries = movie?.type === "Series";
  const isSaved = myList.some(
    (item) => String(item.movieId) === String(movie?.id)
  );

  // Episode hanya dibutuhkan untuk series
  useEffect(() => {
    if (isSeries && movie) {
      dispatch(fetchEpisodes(movie.id));
    }

    return () => {
      dispatch(clearEpisodes());
    };
  }, [dispatch, isSeries, movie]);

  const recommendations = useMemo(
    () => getRecommendations(movie, movies),
    [movie, movies]
  );

  if (!movie) return null;

  const handleToggleMyList = () => {
    if (!userId) return;

    dispatch(toggleMyList({ userId, movieId: movie.id }));
  };

  return (
    <div className="modal-overlay detail-overlay" onClick={onClose}>
      <div
        className="detail-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="detail-close"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X size={20} />
        </button>

        <div
          className="detail-banner"
          style={{
            backgroundImage: `linear-gradient(to top, #1f1f1f 4%, rgba(0,0,0,.35) 60%, rgba(0,0,0,.55)), url(${movie.image})`,
          }}
        >
          {/* Badge Premium di header modal, Figma 8.2 dan 9.2 */}
          {movie.isPremium && (
            <span className="poster-badge badge-premium detail-premium">
              Premium
            </span>
          )}

          <h2 className="detail-title">{movie.title}</h2>

          <div className="detail-meta">
            <span className="age-rating">{movie.age}</span>

            <span>{isSeries ? "Series" : "Film"}</span>

            <span className="poster-rating">
              <Star size={13} fill="currentColor" />
              {movie.rating}
            </span>
          </div>
        </div>

        <div className="detail-body">
          <div className="detail-actions">
            <button
              className="btn-play"
              onClick={() => onPlay?.(movie)}
            >
              <Play size={17} fill="currentColor" /> Mulai
            </button>

            <button
              className={`poster-btn${isSaved ? " is-saved" : ""}`}
              onClick={handleToggleMyList}
              aria-label="Daftar Saya"
            >
              <Check size={18} />
            </button>
          </div>

          <p className="detail-description">
            {movie.description ||
              "Deskripsi film ini belum tersedia di database."}
          </p>

          <div className="detail-block">
            <h3 className="detail-label">Pemeran</h3>

            <p className="detail-cast">
              {(movie.cast || []).join(", ") ||
                "Data pemeran belum tersedia."}
            </p>
          </div>

          <div className="detail-block">
            <h3 className="detail-label">Genre</h3>

            <div className="detail-genres">
              {(movie.genres || []).map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </div>
          </div>

          {isSeries && (
            <div className="detail-block">
              <h3 className="detail-label">
                Episode {episodes.length > 0 && `(${episodes.length})`}
              </h3>

              {episodesLoading ? (
                <Loading label="Memuat episode..." />
              ) : episodesError ? (
                <p className="detail-hint">{episodesError}</p>
              ) : episodes.length === 0 ? (
                <p className="detail-hint">
                  Episode untuk judul ini belum tersedia.
                </p>
              ) : (
                <ul className="episode-list">
                  {episodes.map((episode) => (
                    <li className="episode-item" key={episode.id}>
                      <img
                        className="episode-thumb"
                        src={movie.image}
                        alt={episode.title}
                      />

                      <div className="episode-info">
                        <div className="episode-head">
                          <h4 className="episode-title">
                            Episode {episode.number} - {episode.title}
                          </h4>

                          <span className="episode-duration">
                            {episode.duration}
                          </span>
                        </div>

                        <p className="episode-description">
                          {episode.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {!isSeries && (
            <div className="detail-block">
              <h3 className="detail-label">Rekomendasi</h3>

              {recommendations.length === 0 ? (
                <p className="detail-hint">
                  Belum ada rekomendasi untuk judul ini.
                </p>
              ) : (
                <div className="movie-grid browse-grid portrait detail-recommendations">
                  {recommendations.map((item) => (
                    <PosterCard
                      key={item.id}
                      movie={item}
                      onPlay={onPlay}
                      onOpenDetail={onOpenDetail}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
