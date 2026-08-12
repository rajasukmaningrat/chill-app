import { useRef } from "react";
import {Play, Check, ChevronDown, ChevronLeft, ChevronRight, Star, Circle} from "lucide-react";
import dontLookup from "../../assets/images/desktop/dontlookupD.png";
import batman from "../../assets/images/desktop/batmanD.png";
import blackAdam from "../../assets/images/desktop/blackadamD.png";
import avatar from "../../assets/images/desktop/avatarD.png";
import sonic from "../../assets/images/desktop/sonicD.png";

function Mood() {
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
        <div className="movie-card">
            <img src={dontLookup} alt="Don't Look Up" />
            <div className="movie-info">
            <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
            </div>
            <div className="movie-title-row">
                <h3>Don't Look Up</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.5/5</span>
            </div>
            <div className="movie-meta">
                <span className="age-rating">13+</span>
                <span>Movie</span>
            </div>
            <div className="movie-genres">
                <span>Komedi</span>
                <Circle size={4} fill="currentColor" />
                <span>Drama</span>
                <Circle size={4} fill="currentColor" />
                <span>Sains & Fiksi</span>
            </div>
            </div>
        </div>

        <div className="movie-card">
            <img src={batman} alt="The Batman" />
            <div className="movie-info">
            <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
            </div>
            <div className="movie-title-row">
                <h3>The Batman</h3>
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
                <span>Crime</span>
            </div>
            </div>
        </div>

        <div className="movie-card">
            <img src={blackAdam} alt="Black Adam" />
            <div className="movie-info">
            <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
            </div>
            <div className="movie-title-row">
                <h3>Black Adam</h3>
                <span className="movie-rating"><Star size={14} fill="currentColor" /> 4.3/5</span>
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
                <span>Adventure</span>
            </div>
            </div>
        </div>

        <div className="movie-card">
            <img src={avatar} alt="Avatar" />
            <div className="movie-info">
            <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
            </div>
            <div className="movie-title-row">
                <h3>Avatar</h3>
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
            <img src={sonic} alt="Sonic the Hedgehog" />
            <div className="movie-info">
            <div className="movie-actions">
                <button className="play-button"><Play size={20} fill="currentColor" /></button>
                <button className="check-button"><Check size={20} /></button>
                <button className="more-button"><ChevronDown size={20} /></button>
            </div>
            <div className="movie-title-row">
                <h3>Sonic the Hedgehog</h3>
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
        </div>
        <button className="slider-arrow slider-arrow-right" onClick={() => scrollMovies("right")} aria-label="Film berikutnya"><ChevronRight /></button>
    </div>
    </section>
    );
}

export default Mood;