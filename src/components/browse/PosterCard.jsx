import { useDispatch, useSelector } from "react-redux";
import { Play, Check, ChevronRight, Star } from "lucide-react";

import { toggleMyList } from "../../store/slices/mylistSlice";
import { getMovieBadges } from "../../utils/browse";

function PosterCard({ movie, episodesCount = 0, onPlay, onOpenDetail }) {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.mylist.userId);
  const myList = useSelector((state) => state.mylist.myList);

  // Film yang id-nya sama dengan movieId yang sedang disimpan user
  const isSaved = myList.some(
    (item) => item && String(item.movieId) === String(movie?.id)
  );

  const badges = getMovieBadges(movie);
  const isSeries = movie.type === "Series";

  // Tombol di dalam kartu tidak boleh memicu klik kartu
  const stopAnd = (handler) => (event) => {
    event.stopPropagation();

    handler?.();
  };

  const handleToggleMyList = () => {
    if (!userId) return;

    dispatch(toggleMyList({ userId, movieId: movie.id }));
  };

  return (
    <article className="poster-card">
      <img className="poster-image" src={movie.image} alt={movie.title} />

      {badges.length > 0 && (
        <div className="poster-badges">
          {badges.map((badge) => (
            <span
              key={badge.label}
              className={`poster-badge badge-${badge.variant}`}
            >
              {badge.label}
            </span>
          ))}
        </div>
      )}

      <div className="poster-hover">
        <div className="poster-actions">
          <button
            className="poster-btn poster-btn-play"
            aria-label="Putar"
            onClick={stopAnd(() => onPlay?.(movie))}
          >
            <Play size={18} fill="currentColor" />
          </button>

          <button
            className={`poster-btn${isSaved ? " is-saved" : ""}`}
            aria-label="Daftar Saya"
            onClick={stopAnd(handleToggleMyList)}
          >
            <Check size={18} />
          </button>

          <button
            className="poster-btn"
            aria-label="Lihat detail"
            onClick={stopAnd(() => onOpenDetail?.(movie))}
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <h3 className="poster-title">{movie.title}</h3>

        <div className="poster-meta">
          <span className="age-rating">{movie.age}</span>

          {isSeries && (
            <span className="poster-episode">
              {episodesCount > 0 ? `${episodesCount} Episode` : "Series"}
            </span>
          )}

          <span className="poster-rating">
            <Star size={12} fill="currentColor" />
            {movie.rating}
          </span>
        </div>

        <div className="poster-genres">
          {(movie.genres || []).slice(0, 3).map((genre) => (
            <span key={genre}>{genre}</span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default PosterCard;
