import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/icons/logo.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function LoginForm() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <section className="login-container">
      <div className="logo">
        <span className="logo-icon">
          <img src={logo} alt="logo" />
        </span>
      </div>
      <h2>Masuk</h2>
      <p className="subtitle">Selamat datang kembali!</p>

      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" placeholder="Masukan Username" value={userName} onChange={(e) => setUserName(e.target.value)} required />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input type={showPassword ? "text" : "password"} id="password" placeholder="Masukan Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <button type="button" className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>

        <div className="form-options">
          <p className="register-link">Belum punya akun?{" "}<Link to="/register">Daftar</Link></p>
          <Link to="#" className="forgot-password">Lupa Password?</Link>
        </div>

        <button type="submit" className="btn-login">Masuk</button>
      </form>
    </section>
  );
}

export default LoginForm;