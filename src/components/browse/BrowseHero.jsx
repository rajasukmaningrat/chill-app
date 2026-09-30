import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

import GenreDropdown from "./GenreDropdown";

function BrowseHero({ movie, genres, genre, onGenreChange, onPlay, onMore }) {
  const [isMuted, setIsMuted] = useState(false);

  if (!movie) return null;

  return (
    <section
      className="browse-hero"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,.8) 20%, transparent), url(${movie.image})`,
      }}
    >
      <div className="browse-hero-top">
        <GenreDropdown
          genres={genres}
          value={genre}
          onChange={onGenreChange}
        />
      </div>

      <div className="browse-hero-body">
        <h1 className="browse-hero-title">{movie.title}</h1>

        <p className="browse-hero-description">
          {movie.description ||
            "Deskripsi film ini belum tersedia di database."}
        </p>

        <div className="browse-hero-actions">
          {/* onPlay harus dapat movie-nya, bukan event klik */}
          <button className="btn-play" onClick={() => onPlay?.(movie)}>
            Mulai
          </button>

          <button className="btn-info" onClick={onMore}>
            Selengkapnya
          </button>

          <span className="age-rating">{movie.age}</span>
        </div>
      </div>

      <button
        className="browse-hero-sound"
        onClick={() => setIsMuted(!isMuted)}
        aria-label={isMuted ? "Hidupkan Suara" : "Matikan Suara"}
      >
        {isMuted ? (
          <VolumeX className="sound-icon" />
        ) : (
          <Volume2 className="sound-icon" />
        )}
      </button>
    </section>
  );
}

export default BrowseHero;
