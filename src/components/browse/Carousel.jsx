import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PosterCard from "./PosterCard";

function Carousel({ title, movies, variant = "portrait", episodeCount, onPlay, onOpenDetail }) {
  const gridRef = useRef(null);

  const scrollMovies = (direction) => {
    if (!gridRef.current) return;

    const scrollAmount = variant === "landscape" ? 350 : 300;

    gridRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  // Baris tanpa isi disembunyikan supaya tidak ada judul tanpa film
  if (!movies.length) return null;

  return (
    <section className="browse-section">
      <h2 className="section-title">{title}</h2>

      <div className="movie-slider">
        <button
          className="slider-arrow slider-arrow-left"
          onClick={() => scrollMovies("left")}
          aria-label="Sebelumnya"
        >
          <ChevronLeft />
        </button>

        <div className={`movie-grid browse-grid ${variant}`} ref={gridRef}>
          {movies.map((movie) => (
            <PosterCard
              key={movie.id}
              movie={movie}
              episodesCount={episodeCount?.[String(movie.id)] || 0}
              onPlay={onPlay}
              onOpenDetail={onOpenDetail}
            />
          ))}
        </div>

        <button
          className="slider-arrow slider-arrow-right"
          onClick={() => scrollMovies("right")}
          aria-label="Berikutnya"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
}

export default Carousel;
