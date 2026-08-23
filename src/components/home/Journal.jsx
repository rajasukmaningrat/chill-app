import { useRef } from "react";
import movie1 from "../../assets/images/mobile/avatarM.png";
import movie2 from "../../assets/images/mobile/antmanM.png";
import movie3 from "../../assets/images/mobile/rioM.png";
import movie4 from "../../assets/images/mobile/shazamM.png";
import movie5 from "../../assets/images/mobile/fast10M.png";
import { Play, Check, ChevronDown, ChevronLeft, ChevronRight, Star, Circle } from "lucide-react";

function Journal() {
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
      <h2 className="section-title">Pilihan Untukmu</h2>

      <div className="movie-slider">
        <button className="slider-arrow slider-arrow-left" onClick={() => scrollMovies("left")} aria-label="Film sebelumnya"><ChevronLeft /></button>

        <div className="movie-grid portrait" ref={movieGridRef}>
          <div className="movie-card">
            <img src={movie1} alt="Movie 1" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Movie 1</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.5/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Drama</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={movie2} alt="Movie 2" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Movie 2</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.3/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Comedy</span>
                <Circle size={4} fill="currentColor" />
                <span>Fantasy</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={movie3} alt="Movie 3" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Movie 3</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.7/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Crime</span>
                <Circle size={4} fill="currentColor" />
                <span>Drama</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={movie4} alt="Movie 4" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Movie 4</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.6/5</span>
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
                <span>Action</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={movie5} alt="Movie 5" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Movie 5</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.4/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Comedy</span>
                <Circle size={4} fill="currentColor" />
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={movie5} alt="Movie 5" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Movie 6</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.5/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Drama</span>
                <Circle size={4} fill="currentColor" />
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Crime</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={movie5} alt="Movie 5" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Movie 7</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.2/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Fantasy</span>
                <Circle size={4} fill="currentColor" />
                <span>Drama</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={movie5} alt="Movie 5" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Movie 8</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.8/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
                <Circle size={4} fill="currentColor" />
                <span>Fantasy</span>
              </div>
            </div>
          </div>
        </div>

        <button className="slider-arrow slider-arrow-right" onClick={() => scrollMovies("right")} aria-label="Film berikutnya"><ChevronRight /></button>
      </div>
    </section>
  );
}

export default Journal;