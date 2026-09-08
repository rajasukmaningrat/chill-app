import { useState } from "react";
import { Play, Check, Pencil, Trash2, Star, Circle } from "lucide-react";

function Card({ movie, onEdit, onDelete }) {
  const [isActive, setIsActive] = useState(false);
  console.log("CARD:", movie.id, movie.title, movie.image) 

  const stopAnd = (handler) => (e) => {
    e.stopPropagation();
    handler?.();
  };

  return (
    <div
      className={`movie-card${isActive ? " is-active" : ""}`}
      onClick={() => setIsActive((prev) => !prev)}
    >
      <img src={movie.image} alt={movie.title} />

      <div className="movie-info">
        <div className="movie-actions">
          <button className="play-button" aria-label="Putar" onClick={stopAnd()}>
            <Play size={20} fill="currentColor" />
          </button>

          <button className="check-button" aria-label="Daftar Saya" onClick={stopAnd()}>
            <Check size={20} />
          </button>

          {onEdit && (
            <button className="edit-button" onClick={stopAnd(() => onEdit(movie))} aria-label="Ubah">
              <Pencil size={18} />
            </button>
          )}

          {onDelete && (
            <button className="more-button" onClick={stopAnd(() => onDelete(movie))} aria-label="Hapus">
              <Trash2 size={18} />
            </button>
          )}
        </div>

        <div className="movie-title-row">
          <h3>{movie.title}</h3>
          <span className="movie-rating">
            <Star size={14} fill="currentColor" /> {movie.rating}
          </span>
        </div>

        <div className="movie-meta">
          <span className="age-rating">{movie.age}</span>
          <span>{movie.type}</span>
        </div>

        <div className="movie-genres">
          {(movie.genres || []).map((genre, index) => (
            <span className="movie-genre" key={genre}>
              {index > 0 && <span className="genre-divider">•</span>}
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Card;
