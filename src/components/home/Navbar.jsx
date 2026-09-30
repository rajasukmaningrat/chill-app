import { useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import logo from "../../assets/icons/logo.png";
import pp from "../../assets/icons/pp.png";

import { User, Star, LogOut, ChevronDown, Menu } from "lucide-react";

import { useAuth } from "../../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const navToggle = useRef(null);

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // Menu mobile menutup sendiri begitu salah satu link diklik
  const closeMobileNav = () => {
    if (navToggle.current) {
      navToggle.current.checked = false;
    }
  };

  return (
    <header className="navbar">
      <div className="nav-left">
        <span className="icon-logo">
          <img src={logo} alt="Logo chill" />
        </span>

        <input
          type="checkbox"
          id="toggle-nav"
          className="hidden-checkbox"
          ref={navToggle}
        />

        <label
          htmlFor="toggle-nav"
          className="nav-burger"
          aria-label="Buka menu"
        >
          <Menu className="nav-burger-icon" size={22} />
        </label>

        <nav className="nav-menu" onClick={closeMobileNav}>
          <NavLink to="/home">Home</NavLink>

          <NavLink to="/series">Series</NavLink>

          <NavLink to="/film">Film</NavLink>

          <NavLink to="/my-list">Daftar Saya</NavLink>
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
          <Link to="/profil" className="menu-item">
            <User className="menu-icon" />
            <span>Profile Saya</span>
          </Link>

          <Link to="/pilih-paket" className="menu-item">
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
