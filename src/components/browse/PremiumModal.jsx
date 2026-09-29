import { useNavigate } from "react-router-dom";
import { Crown, X } from "lucide-react";

function PremiumModal({ movie, onClose }) {
  const navigate = useNavigate();

  if (!movie) return null;

  // Tombol utama langsung ke halaman Pilih Paket sesuai desain
  const goToPackage = () => {
    onClose();
    navigate("/pilih-paket");
  };

  return (
    <div className="modal-overlay premium-overlay" onClick={onClose}>
      <div
        className="premium-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="premium-close"
          onClick={onClose}
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        <span className="premium-icon">
          <Crown size={30} />
        </span>

        <h2 className="premium-title">Konten Premium</h2>

        <p className="premium-text">
          <strong>{movie.title}</strong> hanya bisa ditonton oleh pengguna
          Premium. Berlangganan dulu untuk menontonnya.
        </p>

        <div className="premium-actions">
          <button className="btn-play premium-primary" onClick={goToPackage}>
            Mulai Berlangganan
          </button>

          <button className="premium-secondary" onClick={onClose}>
            Nanti Saja
          </button>
        </div>
      </div>
    </div>
  );
}

export default PremiumModal;
