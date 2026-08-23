import { useRef } from "react";
import { Play, Check, ChevronDown, ChevronLeft, ChevronRight, Star, Circle } from "lucide-react";
import guardian from "../../assets/images/mobile/guardianM.png";
import moralles from "../../assets/images/mobile/morallesM.png";
import rio from "../../assets/images/mobile/rioM.png";
import stuartLittle from "../../assets/images/mobile/stuartlittelM.png";
import megan from "../../assets/images/mobile/meganM.png";

function Sleep() {
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
      <h2 className="section-title">Rilis Terbaru</h2>

      <div className="movie-slider">
        <button className="slider-arrow slider-arrow-left" onClick={() => scrollMovies("left")} aria-label="Film sebelumnya"><ChevronLeft /></button>

        <div className="movie-grid portrait" ref={movieGridRef}>
          <div className="movie-card">
            <img src={guardian} alt="Guardians of the Galaxy" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Guardians of the Galaxy</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.7/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Comedy</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={moralles} alt="Spider-Man: Miles Morales" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Spider-Man: Miles Morales</h3>
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

          <div className="movie-card">
            <img src={rio} alt="Rio" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Rio</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.3/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">SU</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Animation</span>
                <Circle size={4} fill="currentColor" />
                <span>Comedy</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={stuartLittle} alt="Stuart Little" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Stuart Little</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.4/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">SU</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Family</span>
                <Circle size={4} fill="currentColor" />
                <span>Comedy</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={megan} alt="M3GAN" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>M3GAN</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.5/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">17+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Horror</span>
                <Circle size={4} fill="currentColor" />
                <span>Sci-Fi</span>
                <Circle size={4} fill="currentColor" />
                <span>Thriller</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={megan} alt="M3GAN" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>M3GAN</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.5/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">17+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Horror</span>
                <Circle size={4} fill="currentColor" />
                <span>Sci-Fi</span>
                <Circle size={4} fill="currentColor" />
                <span>Thriller</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={guardian} alt="Guardians of the Galaxy" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Guardians of the Galaxy</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.7/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Comedy</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>

          <div className="movie-card">
            <img src={guardian} alt="Guardians of the Galaxy" />
            <div className="movie-info">
              <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
              </div>

              <div className="movie-title-row">
                <h3>Guardians of the Galaxy</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.7/5</span>
              </div>

              <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
              </div>

              <div className="movie-genres">
                <span>Action</span>
                <Circle size={4} fill="currentColor" />
                <span>Comedy</span>
                <Circle size={4} fill="currentColor" />
                <span>Adventure</span>
              </div>
            </div>
          </div>
        </div>

        <button className="slider-arrow slider-arrow-right" onClick={() => scrollMovies("right")} aria-label="Film berikutnya"><ChevronRight /></button>
      </div>
    </section>
  );
}

export default Sleep;