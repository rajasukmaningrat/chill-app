import logo from "../../assets/icons/logo.png";

function Footer() {
    return (
    <footer className="footer">
    <div className="footer-container">
        <div className="footer-brand">
        <img src={logo} alt="CHILL" className="footer-logo" />
        <p className="footer-copyright">© 2026 Chill All Rights Reserved.</p>
        </div>

        <div className="footer-links">
        <h3 className="footer-title">Genre</h3>
        <div className="footer-link-grid">
            <a href="#" className="footer-link">Aksi</a>
            <a href="#" className="footer-link">Drama</a>
            <a href="#" className="footer-link">Komedi</a>
            <a href="#" className="footer-link">Sains & Alam</a>
            <a href="#" className="footer-link">Anak-Anak</a>
            <a href="#" className="footer-link">Fantasi Ilmiah & Fantasi</a>
            <a href="#" className="footer-link">Petualangan</a>
            <a href="#" className="footer-link">Thriller</a>
            <a href="#" className="footer-link">Anime</a>
            <a href="#" className="footer-link">Kejahatan</a>
        </div>
        </div>

        <div className="footer-help">
        <h3 className="footer-title">Bantuan</h3>
        <div className="footer-help-links">
            <a href="#" className="footer-help-link">FAQ</a>
            <a href="#" className="footer-help-link">Kontak Kami</a>
            <a href="#" className="footer-help-link">Privasi</a>
        </div>
        </div>
    </div>
    </footer>
    );
}

export default Footer;