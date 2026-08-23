import { useState } from "react";
import heroImage from "../../assets/images/desktop/dutyD.png";
import { Volume2, VolumeX } from "lucide-react";

function Hero() {
  const [isMuted, setIsMuted] = useState(false);

  const handleSound = () => {
    setIsMuted(!isMuted);
  };

  return (
    <section className="hero-section" style={{ backgroundImage: `linear-gradient(to right, rgba(0,0,0,.8) 20%, transparent),url(${heroImage})` }}>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1 className="hero-title">My Hero Academia</h1>

          <p className="hero-description">
            Kisah ini berfokus pada perjalanan Midoriya saat ia masuk ke SMA
            U.A., sebuah sekolah elit untuk melatih pahlawan masa depan.
            Bersama teman-temannya, ia belajar mengendalikan kekuatannya dan
            menghadapi League of Villains.
          </p>

          <div className="hero-buttons">
            <button className="btn-play">
              Mulai Menonton
            </button>

            <button className="btn-info">
              Selengkapnya
            </button>

            <span className="age-rating">
              18+
            </span>
          </div>
        </div>

        <button
          className="hero-sound"
          onClick={handleSound}
          aria-label={isMuted ? "Hidupkan Suara" : "Matikan Suara"}
        >
          {isMuted ? (
            <VolumeX className="sound-icon" />
          ) : (
            <Volume2 className="sound-icon" />
          )}
        </button>
      </div>
    </section>
  );
}

export default Hero;