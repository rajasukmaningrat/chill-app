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
          <h1 className="hero-title">Duty After School</h1>

          <p className="hero-description">
            Sebuah kisah tentang sekelompok siswa SMA yang direkrut Departemen
            Pertahanan untuk menyelidiki serangkaian insiden aneh yang terus
            berulang di garis depan. Mereka harus bertahan hidup sekaligus
            mengungkap misteri di balik semua kejadian tersebut.
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
