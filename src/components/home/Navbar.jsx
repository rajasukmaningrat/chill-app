import { Link } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import profile from "../../assets/icons/profile.png";
import pp from "../../assets/icons/pp.png";
import { User, Star, LogOut, ChevronDown } from "lucide-react";

function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <span className="icon-logo"> 
          <img src={logo} alt="Logo chill" />
        </span>

        <nav className="nav-menu">
          <Link to="/series" className="active">Series</Link>
          <Link to="/film">Film</Link>
          <Link to="/my-list">Daftar Saya</Link>
        </nav>
      </div>

      <div className="profile-dropdown">
        <input type="checkbox" id="toggle-menu" className="hidden-checkbox" />

        <label htmlFor="toggle-menu" className="profile-trigger">
          <img src={pp} alt="Profil" className="profile-pic" />
          <ChevronDown className="profile-arrow"/>
        </label>

        <div className="dropdown-content">
          <Link to="#" className="menu-item">
            <User className="menu-icon"/>
            <span>Profile Saya</span>
          </Link>

          <Link to="#" className="menu-item">
            <Star className="menu-icon"/>
            <span>Ubah Premium</span>
          </Link>

          <Link to="#" className="menu-item">
            <LogOut className="menu-icon"/>
            <span>Keluar</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;