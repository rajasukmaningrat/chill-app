import { Link, useNavigate } from "react-router-dom";

import logo from "../../assets/icons/logo.png";
import pp from "../../assets/icons/pp.png";

import { User, Star, LogOut, ChevronDown } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <span className="icon-logo">
          <img src={logo} alt="Logo chill" />
        </span>

        <nav className="nav-menu">
          <Link to="/series" className="active">
            Series
          </Link>

          <Link to="/film">
            Film
          </Link>

          <Link to="/my-list">
            Daftar Saya
          </Link>
        </nav>
      </div>

      <div className="profile-dropdown">
        <input
          type="checkbox"
          id="toggle-menu"
          className="hidden-checkbox"
        />

        <label
          htmlFor="toggle-menu"
          className="profile-trigger"
        >
          <img
            src={pp}
            alt="Profil"
            className="profile-pic"
          />

          <ChevronDown className="profile-arrow" />
        </label>

        <div className="dropdown-content">
          <Link to="#" className="menu-item">
            <User className="menu-icon" />
            <span>Profile Saya</span>
          </Link>

          <Link to="#" className="menu-item">
            <Star className="menu-icon" />
            <span>Ubah Premium</span>
          </Link>

          <button
            type="button"
            className="menu-item"
            onClick={handleLogout}
          >
            <LogOut className="menu-icon" />
            <span>Keluar</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
