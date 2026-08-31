import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "../common/Card";

function Mood({ movies, onDeleteMovie, onEditMovie }) {
  const movieGridRef = useRef(null);

  const scrollMovies = (direction) => {
    if (!movieGridRef.current) return;
    const scrollAmount = 350;

    movieGridRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (!movies.length) return null;

  return (
    <section className="movie-section">
      <h2 className="section-title">Melanjutkan Tonton Film</h2>
      <div className="movie-slider">
        <button className="slider-arrow slider-arrow-left" onClick={() => scrollMovies("left")} aria-label="Film sebelumnya"><ChevronLeft /></button>

        <div className="movie-grid landscape" ref={movieGridRef}>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} onEdit={onEditMovie} onDelete={onDeleteMovie} />
          ))}
        </div>

        <button className="slider-arrow slider-arrow-right" onClick={() => scrollMovies("right")} aria-label="Film berikutnya"><ChevronRight /></button>
      </div>
    </section>
  );
}

export default Mood;
