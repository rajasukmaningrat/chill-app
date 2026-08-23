import { useRef } from "react";
import { Play, Check, ChevronDown, ChevronLeft, ChevronRight, Star, Circle } from "lucide-react";
import shazam from "../../assets/images/mobile/shazamM.png";
import tomorrow from "../../assets/images/mobile/tomorrowM.png";
import happines from "../../assets/images/mobile/happinesM.png";
import littleMermaid from "../../assets/images/mobile/littlemermaidM.png";
import blueLock from "../../assets/images/mobile/bluelockM.png";

function Music() {
  const movieGridRef = useRef(null);

  const scrollMovies = (direction) => {
    if (!movieGridRef.current) return;

    const scrollAmount = 300;

    movieGridRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };

  return (
    <section className="movie-section">
      <h2 className="section-title">Trending Terkini</h2>

      <div className="movie-slider">
        <button className="slider-arrow slider-arrow-left" onClick={() => scrollMovies("left")} aria-label="Film sebelumnya"><ChevronLeft /></button>

        <div className="movie-grid portrait" ref={movieGridRef}>
          <div className="movie-card">
            <img src={shazam} alt="Shazam" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Shazam!</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.4/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Fantasy</span>
                <Circle size={4} fill="currentColor" />
                <span>Comedy</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={tomorrow} alt="The Tomorrow War" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>The Tomorrow War</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.5/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Sains & Fiksi</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={happines} alt="Happiness" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Happiness</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.6/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">16+</span>
                <span>Series</span>
              </div>

              <div className="movie-genres">
                <span>Drama</span>
                <Circle size={4} fill="currentColor" />
                <span>Thriller</span>
                <Circle size={4} fill="currentColor" />
                <span>Action</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={littleMermaid} alt="The Little Mermaid" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>The Little Mermaid</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.3/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Fantasy</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
                <Circle size={4} fill="currentColor" />
                <span>Family</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={blueLock} alt="Blue Lock" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Blue Lock</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.7/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Series</span>
              </div>

              <div className="movie-genres">
                <span>Anime</span>
                <Circle size={4} fill="currentColor" />
                <span>Sport</span>
                <Circle size={4} fill="currentColor" />
                <span>Drama</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={blueLock} alt="Blue Lock" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Blue Lock</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.7/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Series</span>
              </div>

              <div className="movie-genres">
                <span>Anime</span>
                <Circle size={4} fill="currentColor" />
                <span>Sport</span>
                <Circle size={4} fill="currentColor" />
                <span>Drama</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={shazam} alt="Shazam" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Shazam!</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.4/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Fantasy</span>
                <Circle size={4} fill="currentColor" />
                <span>Comedy</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={shazam} alt="Shazam" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Shazam!</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.4/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Fantasy</span>
                <Circle size={4} fill="currentColor" />
                <span>Comedy</span>
              </div>
            </div>
          </div>
        </div>

        <button className="slider-arrow slider-arrow-right" onClick={() => scrollMovies("right")} aria-label="Film berikutnya"><ChevronRight /></button>
      </div>
    </section>
  );
}

export default Music;