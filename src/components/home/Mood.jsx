import { useRef } from "react";
import {Play, Check, Pencil, ChevronDown, ChevronLeft, ChevronRight, Star, Circle} from "lucide-react";

function Mood({movies, onDeleteMovie, onEditMovie}) {
  const movieGridRef = useRef(null);

  const scrollMovies = (direction) => {
    if (!movieGridRef.current) return;
    const scrollAmount = 350;

    movieGridRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <section className="movie-section">
      <h2 className="section-title">Melanjutkan Tonton Film</h2>
      <div className="movie-slider">
        <button className="slider-arrow slider-arrow-left" onClick={() => scrollMovies("left")} aria-label="Film sebelumnya"><ChevronLeft /></button>

        <div className="movie-grid landscape" ref={movieGridRef}>
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id}>
              <img src={movie.image} alt={movie.title} />

              <div className="movie-info">
                <div className="movie-actions">
                  <button className="play-button"><Play size={20} fill="currentColor" /></button>
                  <button className="check-button"><Check size={20} /></button>
                  <button className="edit-button" onClick={() => onEditMovie(movie)}><Pencil size={18} /></button>
                  <button className="more-button" onClick={() => onDeleteMovie(movie.id)}><ChevronDown size={20} /></button>
                </div>

                <div className="movie-title-row">
                  <h3>{movie.title}</h3>
                  <span className="movie-rating"><Star size={14} fill="currentColor" /> {movie.rating}</span>
                </div>

                <div className="movie-meta">
                  <span className="age-rating">{movie.age}</span>
                  <span>{movie.type}</span>
                </div>

                <div className="movie-genres">
                  {movie.genres.map((genre, index) => (
                    <span key={genre}>
                      {index > 0 && <Circle size={4} fill="currentColor" />}
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-arrow slider-arrow-right" onClick={() => scrollMovies("right")} aria-label="Film berikutnya"><ChevronRight /></button>
      </div>
    </section>
  );
}

export default Mood;