import { useNavigate } from "react-router-dom";
import { Crown, X } from "lucide-react";

import { PREMIUM_MODAL } from "../../constants/placeholderCopy";

function PremiumModal({ movie, onClose }) {
  const navigate = useNavigate();

  if (!movie) return null;

  // Figma 10.6: tombol utama langsung ke halaman Pilih Paket (Figma 13.1)
  const goToPackage = () => {
    onClose();
    navigate("/pilih-paket");
  };

  // Judul film tetap ditebalkan seperti desain, teksnya dari constants
  const [bodyBefore, bodyAfter] = PREMIUM_MODAL.body.split("{title}");

  return (
    <div className="modal-overlay premium-overlay" onClick={onClose}>
      <div
        className="premium-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="premium-close"
          onClick={onClose}
          aria-label={PREMIUM_MODAL.closeLabel}
        >
          <X size={18} />
        </button>

        <span className="premium-icon">
          <Crown size={30} />
        </span>

        <h2 className="premium-title">{PREMIUM_MODAL.title}</h2>

        <p className="premium-text">
          {bodyBefore}
          <strong>{movie.title}</strong>
          {bodyAfter}
        </p>

        <div className="premium-actions">
          <button className="btn-play premium-primary" onClick={goToPackage}>
            {PREMIUM_MODAL.primary}
          </button>

          <button className="premium-secondary" onClick={onClose}>
            {PREMIUM_MODAL.secondary}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PremiumModal;
